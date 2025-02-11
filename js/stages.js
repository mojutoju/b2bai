const stagesData = {
    "Startup": {
      substages: [
        { label: "Idea Stage", descriptions: ["Developing the business idea and concept", "Conducting initial market research", "Creating a business plan"] },
        { label: "Development Stage", descriptions: ["Building a prototype or minimum viable product (MVP)", "Testing the product with early users", "Refining the product based on feedback"] },
        { label: "Launch Stage", descriptions: ["Officially launching the product or service", "Acquiring the first set of customers", "Establishing initial brand presence"] }
      ]
    },
    "Seed": {
      substages: [
        { label: "Validation", descriptions: ["Validating the product-market fit", "Gathering customer feedback and testimonials", "Securing seed funding from angel investors or early-stage VCs"] },
        { label: "Early Traction", descriptions: ["Achieving initial sales and revenue", "Building a small but dedicated customer base", "Starting to scale marketing and sales efforts"] }
      ]
    },
    "Growth": {
      substages: [
        { label: "Scaling", descriptions: ["Expanding the team and operations", "Increasing production capacity", "Scaling marketing and sales to reach a larger audience"] },
        { label: "Market Penetration", descriptions: ["Deepening market presence in existing markets", "Increasing market share", "Enhancing product features and offerings"] },
        { label: "Series B to Series D Funding", descriptions: ["Securing Series B funding to scale the business", "Securing Series C funding for further expansion", "Securing Series D funding for strategic growth initiatives"] }
      ]
    },
    "Expansion": {
      substages: [
        { label: "Diversification", descriptions: ["Expanding into new product categories or services", "Exploring new revenue streams", "Investing in research and development for innovation"] },
        { label: "Global Expansion", descriptions: ["Establishing a presence in international markets", "Adapting products and marketing strategies for different regions", "Managing global operations and logistics"] },
        { label: "Acquisition", descriptions: ["Acquiring other companies to enhance capabilities or market position", "Integrating acquired businesses and technologies", "Leveraging synergies to drive growth"] }
      ]
    },
    "Maturity": {
      substages: [
        { label: "Optimization", descriptions: ["Optimizing operations for efficiency and cost-effectiveness", "Enhancing customer retention and loyalty", "Focusing on profitability and sustainable growth"] },
        { label: "Innovation", descriptions: ["Continuously innovating to stay competitive", "Investing in new technologies and processes", "Exploring new business models"] },
        { label: "Market Leadership", descriptions: ["Maintaining a strong market position", "Defending against competitors", "Reinforcing brand reputation and customer trust"] }
      ]
    },
    "Decline or Renewal": {
      substages: [
        { label: "Renewal", descriptions: ["Innovating and adapting to changing market conditions", "Revitalizing product offerings and business strategies", "Re-engaging with customers and stakeholders"] },
        { label: "Managed Decline", descriptions: ["Managing a controlled decline in operations", "Reducing costs and optimizing remaining resources", "Exploring exit strategies or divestitures"] }
      ]
    }
  };
  
  document.querySelectorAll('.stage-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', handleStageChange);
  });
  
  function handleStageChange() {
    const selectedStages = Array.from(document.querySelectorAll('.stage-checkbox:checked'))
      .map(checkbox => checkbox.getAttribute('data-stage'));
  
    updateChips(selectedStages, 'stage');
    showSubstageOptions(selectedStages);
  }
  
  function updateChips(selectedItems, type) {
    const chipContainer = type === 'stage' ? document.getElementById('stage-chips') : document.getElementById('substage-chips');
    chipContainer.innerHTML = '';
  
    selectedItems.forEach(item => {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.textContent = item;
  
      const removeIcon = document.createElement('span');
      removeIcon.className = 'chip-remove';
      removeIcon.textContent = '×';
      removeIcon.onclick = () => {
        const checkbox = document.querySelector(`input[data-stage="${item}"], input[id="${item}"]`);
        if (checkbox) checkbox.checked = false;
        chip.remove();
        showSubstageOptions(getSelectedStages()); // Update substage options when chip is removed
      };
  
      chip.appendChild(removeIcon);
      chipContainer.appendChild(chip);
    });
  }
  
  function showSubstageOptions(selectedStages) {
    const substageContainer = document.getElementById('substage-options');
    substageContainer.innerHTML = '';
  
    selectedStages.forEach(stage => {
      const stageData = stagesData[stage];
      if (stageData) {
        stageData.substages.forEach(substage => {
          const substageDiv = document.createElement('div');
          substageDiv.className = 'checkbox-group';
  
          const substageLabel = document.createElement('label');
          substageLabel.innerHTML = `<input type="checkbox" class="substage-checkbox" data-stage="${stage}" data-substage="${substage.label}"> ${substage.label}`;
          
          substageDiv.appendChild(substageLabel);
          substageDiv.addEventListener('change', () => handleSubstageChange(substage.label, substage.descriptions));
          substageContainer.appendChild(substageDiv);
        });
      }
    });
  }
  
  function handleSubstageChange(substageLabel, descriptions) {
    const selectedSubstages = Array.from(document.querySelectorAll('.substage-checkbox:checked'))
      .map(checkbox => checkbox.getAttribute('data-substage'));
  
    updateChips(selectedSubstages, 'substage');
    showDescriptionOptions(selectedSubstages, descriptions);
  }
  
  function showDescriptionOptions(selectedSubstages, descriptions) {
    const descriptionContainer = document.getElementById('description-options');
    descriptionContainer.innerHTML = ''; // Clear previous descriptions
  
    selectedSubstages.forEach(substage => {
      const substageData = stagesData[getSelectedStages()[0]]?.substages.find(s => s.label === substage);
      if (substageData) {
        substageData.descriptions.forEach(description => {
          const descriptionDiv = document.createElement('div');
          descriptionDiv.className = 'checkbox-group';
  
          const descriptionLabel = document.createElement('label');
          descriptionLabel.innerHTML = `<input type="checkbox" class="description-checkbox" data-substage="${substage}" data-description="${description}"> ${description}`;
          descriptionDiv.appendChild(descriptionLabel);
  
          descriptionContainer.appendChild(descriptionDiv);
        });
      }
    });
  }
  