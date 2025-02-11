document.addEventListener("DOMContentLoaded", () => {
  // Handle location selection and display of location_reason textarea
  const locationCheckboxes = document.querySelectorAll("#locations-checkbox-container input[type='checkbox']");
  const locationReasonField = document.getElementById("location-reason-field");

  locationCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
          const anySelected = Array.from(locationCheckboxes).some(cb => cb.checked);
          locationReasonField.style.display = anySelected ? "block" : "none";
      });
  });

  // Handle value proposition checkboxes and dynamic textareas
  const vpCheckboxes = document.querySelectorAll("#value-propositions-options-group input[type='checkbox']");
  const vpDetailsContainer = document.getElementById("value-propositions-details-container");

  vpCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
          const isSelected = checkbox.checked;
          const vpType = checkbox.value;

          if (isSelected) {
              const textarea = document.createElement("textarea");
              textarea.className = "form-control mt-2";
              textarea.setAttribute("data-vp-type", vpType);
              textarea.placeholder = `Enter details for ${vpType}...`;
              vpDetailsContainer.appendChild(textarea);
              vpDetailsContainer.classList.remove("hidden");
          } else {
              const textarea = vpDetailsContainer.querySelector(`textarea[data-vp-type='${vpType}']`);
              if (textarea) {
                  textarea.remove();
              }
          }

          // Hide container if no checkboxes are selected
          const anySelected = Array.from(vpCheckboxes).some(cb => cb.checked);
          if (!anySelected) vpDetailsContainer.classList.add("hidden");
      });
  });
});




document.addEventListener("DOMContentLoaded", () => {
    const checkboxContainers = document.querySelectorAll(".checkbox-container");

    // Function to update each category's selected options display
    const updateSelectedOptions = (categoryContainer, selectedValues) => {
        categoryContainer.innerHTML = ""; // Clear the container
        if (selectedValues.size === 0) {
            categoryContainer.innerHTML = "<em>No options selected</em>";
        } else {
            selectedValues.forEach(value => {
                const chip = document.createElement("span");
                chip.textContent = value;
                chip.className = "badge bg-primary m-1";

                // Add a close button to the chip
                const closeButton = document.createElement("button");
                closeButton.textContent = "×";
                closeButton.className = "btn-close btn-close-white ms-2";
                closeButton.style.fontSize = "0.8rem";
                closeButton.style.padding = "0";

                closeButton.addEventListener("click", () => {
                    selectedValues.delete(value);
                    const checkbox = document.querySelector(`input[type='checkbox'][value='${value}']`);
                    if (checkbox) checkbox.checked = false;
                    updateSelectedOptions(categoryContainer, selectedValues);
                });

                chip.appendChild(closeButton);
                categoryContainer.appendChild(chip);
            });
        }
    };

    // Add change event listener to each checkbox container
    checkboxContainers.forEach(container => {
        const checkboxes = container.querySelectorAll("input[type='checkbox']");
        const selectedOptionsContainer = container.nextElementSibling; // The corresponding selected field
        const selectedValues = new Set();

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                const value = checkbox.value;
                if (checkbox.checked) {
                    selectedValues.add(value);
                } else {
                    selectedValues.delete(value);
                }
                updateSelectedOptions(selectedOptionsContainer, selectedValues);
            });
        });

        // Initialize with no options selected for this category
        updateSelectedOptions(selectedOptionsContainer, selectedValues);
    });
});

const stageData = {
  "Startup Stage": {
    type: "startup_stage",
    level: [
      "Conceptualization",
      "Initial development"
    ],
    substages: {
      "Idea Stage": [
        "Developing the business idea and concept",
        "Conducting initial market research",
        "Creating a business plan"
      ],
      "Development Stage": [
        "Building a prototype or minimum viable product (MVP)",
        "Testing the product with early users",
        "Refining the product based on feedback"
      ],
      "Launch Stage": [
        "Officially launching the product or service",
        "Acquiring the first set of customers",
        "Establishing initial brand presence"
      ]
    }
  },
  "Seed Stage": {
    type: "seed_stage",
    level: [
      "Validation of market fit",
      "Initial funding and traction"
    ],
    substages: {
      "Validation Stage": [
        "Validating the product-market fit",
        "Gathering customer feedback and testimonials",
        "Securing seed funding from angel investors or early-stage VCs"
      ],
      "Early Traction Stage": [
        "Achieving initial sales and revenue",
        "Building a small but dedicated customer base",
        "Starting to scale marketing and sales efforts"
      ]
    }
  },
  "Growth Stage": {
    type: "growth_stage",
    level: [
      "Series B to Series D funding"
    ],
    substages: {
      "Scaling Stage": [
        "Expanding the team and operations",
        "Increasing production capacity",
        "Scaling marketing and sales to reach a larger audience"
      ],
      "Market Penetration Stage": [
        "Deepening market presence in existing markets",
        "Increasing market share",
        "Enhancing product features and offerings"
      ],
      "Series B to Series D Funding": [
        "Securing Series B funding to scale the business",
        "Securing Series C funding for further expansion",
        "Securing Series D funding for strategic growth initiatives"
      ]
    }
  },
  "Expansion Stage": {
    type: "expansion_stage",
    level: [
      "Market diversification",
      "Global presence"
    ],
    substages: {
      "Diversification Stage": [
        "Expanding into new product categories or services",
        "Exploring new revenue streams",
        "Investing in research and development for innovation"
      ],
      "Global Expansion Stage": [
        "Establishing a presence in international markets",
        "Adapting products and marketing strategies for different regions",
        "Managing global operations and logistics"
      ],
      "Acquisition Stage": [
        "Acquiring other companies to enhance capabilities or market position",
        "Integrating acquired businesses and technologies",
        "Leveraging synergies to drive growth"
      ]
    }
  },
  "Maturity Stage": {
    type: "maturity_stage",
    level: [
      "Market leadership",
      "Optimization"
    ],
    substages: {
      "Optimization Stage": [
        "Optimizing operations for efficiency and cost-effectiveness",
        "Enhancing customer retention and loyalty",
        "Focusing on profitability and sustainable growth"
      ],
      "Innovation Stage": [
        "Continuously innovating to stay competitive",
        "Investing in new technologies and processes",
        "Exploring new business models"
      ],
      "Market Leadership Stage": [
        "Maintaining a strong market position",
        "Defending against competitors",
        "Reinforcing brand reputation and customer trust"
      ]
    }
  },
  "Decline or Renewal Stage": {
    type: "decline_or_renewal_stage",
    level: [
      "Turnaround or exit strategy",
      "Sustainable restructuring"
    ],
    substages: {
      "Renewal Stage": [
        "Innovating and adapting to changing market conditions",
        "Revitalizing product offerings and business strategies",
        "Re-engaging with customers and stakeholders"
      ],
      "Managed Decline Stage": [
        "Managing a controlled decline in operations",
        "Reducing costs and optimizing remaining resources",
        "Exploring exit strategies or divestitures"
      ]
    }
  }
};

  // Selected stages, substages, and descriptions
  let selectedStages = [];
  let selectedSubstages = [];
  let selectedDescriptions = [];
  
  // Elements
  const stageOptions = document.getElementById("stage-options");
  const substageContainer = document.getElementById("substage-container");
  const substageOptions = document.getElementById("substage-options");
  const descriptionContainer = document.getElementById("description-container");
  const descriptionOptions = document.getElementById("description-options");
  const selectedStageChips = document.getElementById("selected-stage-chips");
  const selectedSubstageChips = document.getElementById("selected-substage-chips");
  const selectedDescriptionChips = document.getElementById("selected-description-chips");
  
  // Render stages
  stageOptions.addEventListener("change", (e) => {
    const stage = e.target.value;
  
    if (e.target.checked) {
      selectedStages.push(stage);
    } else {
      selectedStages = selectedStages.filter((s) => s !== stage);
      selectedSubstages = selectedSubstages.filter(
        (substage) => !Object.keys(stageData[stage].substages).includes(substage)
      );
      selectedDescriptions = selectedDescriptions.filter(
        (desc) =>
          !Object.values(stageData[stage].substages)
            .flat()
            .includes(desc)
      );
    }
  
    renderStages();
    renderSubstages();
    renderDescriptions();
  });
  

  function renderStages() {
    stageOptions.innerHTML = "";

    Object.keys(stageData).forEach((stage) => {
        const checkbox = document.createElement("label");
        checkbox.innerHTML = `<input type="checkbox" value="${stage}" ${
            selectedStages.includes(stage) ? "checked" : ""
        }> ${stage}`;
        stageOptions.appendChild(checkbox);

        checkbox.querySelector("input").addEventListener("change", (e) => {
            if (e.target.checked) {
                // Add stage to selectedStages
                selectedStages.push(stage);
            } else {
                // Remove the stage
                selectedStages = selectedStages.filter((s) => s !== stage);

                // Remove all substages and descriptions tied to this stage
                const substagesToRemove = Object.keys(stageData[stage].substages);
                substagesToRemove.forEach((substage) => {
                    selectedSubstages = selectedSubstages.filter((s) => s !== substage);

                    const descriptionsToRemove = stageData[stage].substages[substage];
                    selectedDescriptions = selectedDescriptions.filter(
                        (desc) => !descriptionsToRemove.includes(desc)
                    );
                });
            }
            renderStages();
            renderSubstages();
            renderDescriptions();
        });
    });

    renderStageChips();
}


function renderSubstages() {
    if (selectedStages.length > 0) {
        substageContainer.classList.remove("hidden");
        substageOptions.innerHTML = "";

        selectedStages.forEach((stage) => {
            const substages = stageData[stage].substages;

            Object.keys(substages).forEach((substage) => {
                const checkbox = document.createElement("label");
                checkbox.innerHTML = `<input type="checkbox" value="${substage}" ${
                    selectedSubstages.includes(substage) ? "checked" : ""
                }> ${substage}`;
                substageOptions.appendChild(checkbox);

                checkbox.querySelector("input").addEventListener("change", (e) => {
                    if (e.target.checked) {
                        // Add substage to selectedSubstages
                        selectedSubstages.push(substage);
                    } else {
                        // Remove the substage
                        selectedSubstages = selectedSubstages.filter((s) => s !== substage);

                        // Remove descriptions tied to the deselected substage
                        const descriptionsToRemove = stageData[stage].substages[substage];
                        selectedDescriptions = selectedDescriptions.filter(
                            (desc) => !descriptionsToRemove.includes(desc)
                        );
                    }
                    renderSubstages();
                    renderDescriptions();
                });
            });
        });
    } else {
        // If no stages are selected, hide the substage container and clear substages
        substageContainer.classList.add("hidden");
        substageOptions.innerHTML = "";
        selectedSubstages = []; // Clear all substages
    }

    renderSubstageChips();
}


function renderDescriptions() {
    if (selectedSubstages.length > 0) {
        descriptionContainer.classList.remove("hidden");
        descriptionOptions.innerHTML = "";

        selectedSubstages.forEach((substage) => {
            const stage = selectedStages.find((stage) =>
                Object.keys(stageData[stage].substages).includes(substage)
            );
            const descriptions = stageData[stage].substages[substage];

            descriptions.forEach((description) => {
                const checkbox = document.createElement("label");
                checkbox.innerHTML = `<input type="checkbox" value="${description}" ${
                    selectedDescriptions.includes(description) ? "checked" : ""
                }> ${description}`;
                descriptionOptions.appendChild(checkbox);

                checkbox.querySelector("input").addEventListener("change", (e) => {
                    if (e.target.checked) {
                        selectedDescriptions.push(description);
                    } else {
                        selectedDescriptions = selectedDescriptions.filter(
                            (d) => d !== description
                        );
                    }
                    renderDescriptions();
                });
            });
        });
    } else {
        // If no substages are selected, hide the description container and clear descriptions
        descriptionContainer.classList.add("hidden");
        descriptionOptions.innerHTML = "";
        selectedDescriptions = []; // Clear all descriptions
    }

    renderDescriptionChips();
}

  
  // Render chips
  function renderStages() {
    selectedStageChips.innerHTML = "";
    selectedStages.forEach((stage) => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.innerHTML = `${stage} <span>&times;</span>`;
      chip.querySelector("span").addEventListener("click", () => {
        const checkbox = stageOptions.querySelector(`input[value="${stage}"]`);
        checkbox.checked = false;
        selectedStages = selectedStages.filter((s) => s !== stage);
        renderStages();
        renderSubstages();
        renderDescriptions();
      });
      selectedStageChips.appendChild(chip);
    });
  }
  
  function renderSubstageChips() {
    selectedSubstageChips.innerHTML = "";
    selectedSubstages.forEach((substage) => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.innerHTML = `${substage} <span>&times;</span>`;
      chip.querySelector("span").addEventListener("click", () => {
        const checkbox = substageOptions.querySelector(`input[value="${substage}"]`);
        checkbox.checked = false;
        selectedSubstages = selectedSubstages.filter((s) => s !== substage);
        renderSubstages();
        renderDescriptions();
      });
      selectedSubstageChips.appendChild(chip);
    });
  }
  
  function renderDescriptionChips() {
    selectedDescriptionChips.innerHTML = "";
    selectedDescriptions.forEach((description) => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.innerHTML = `${description} <span>&times;</span>`;
      chip.querySelector("span").addEventListener("click", () => {
        const checkbox = descriptionOptions.querySelector(
          `input[value="${description}"]`
        );
        checkbox.checked = false;
        selectedDescriptions = selectedDescriptions.filter((d) => d !== description);
        renderDescriptions();
      });
      selectedDescriptionChips.appendChild(chip);
    });
  }
  
    // Data Structure for Categories, Titles, and Responsibilities
    const categoryData = {
        "Executive Level": {
            titles: [
                "Chief Executive Officer (CEO)",
                "Chief Financial Officer (CFO)",
                "Chief Operating Officer (COO)",
                "Chief Technology Officer (CTO)",
                "Chief Information Officer (CIO)",
                "Chief Marketing Officer (CMO)",
                "Chief Revenue Officer (CRO)",
                "Chief Product Officer (CPO)",
                "Chief Medical Officer (CMO)",
                "Chief Scientific Officer (CSO)"
            ],
            responsibilities: [
                "Setting overall company strategy and vision",
                "Overseeing financial performance and budgeting",
                "Managing company operations and resources",
                "Leading technology and innovation initiatives",
                "Ensuring information security and IT infrastructure",
                "Driving marketing and revenue growth strategies",
                "Overseeing product development and lifecycle",
                "Ensuring regulatory compliance and clinical oversight"
            ]
        },
        "Senior Management": {
            titles: [
                "Vice President (VP) of Sales",
                "VP of Marketing",
                "VP of Engineering",
                "VP of Product",
                "VP of Operations",
                "VP of Human Resources",
                "VP of Research and Development",
                "VP of Clinical Operations"
            ],
            responsibilities: [
                "Implementing executive policies and strategies",
                "Managing departmental budgets and resources",
                "Leading teams and overseeing departmental operations",
                "Driving sales and marketing campaigns",
                "Overseeing engineering and product development",
                "Managing human resources and talent acquisition",
                "Ensuring compliance with industry regulations",
                "Overseeing clinical trial operations and research"
            ]
        },
        "Middle Management": {
            titles: [
                "Director of Sales",
                "Director of Marketing",
                "Director of Engineering",
                "Director of Product Management",
                "Director of IT",
                "Director of Operations",
                "Director of Human Resources",
                "Director of Clinical Research"
            ],
            responsibilities: [
                "Managing day-to-day operations of their teams",
                "Executing departmental strategies and initiatives",
                "Reporting on team performance and progress",
                "Coordinating cross-functional projects",
                "Ensuring team adherence to company policies",
                "Managing team budgets and resources",
                "Overseeing project timelines and deliverables",
                "Ensuring quality and compliance in clinical research"
            ]
        },
        "Department Heads": {
            titles: [
                "Head of Sales",
                "Head of Marketing",
                "Head of Engineering",
                "Head of Product",
                "Head of IT",
                "Head of Operations",
                "Head of Human Resources",
                "Head of Clinical Trials"
            ],
            responsibilities: [
                "Leading specific departmental functions",
                "Managing departmental staff and resources",
                "Developing and implementing departmental strategies",
                "Overseeing departmental projects and initiatives",
                "Ensuring departmental compliance with regulations",
                "Managing departmental budgets and financials",
                "Reporting on departmental performance",
                "Driving innovation and improvements within the department"
            ]
        }
    };

    let selectedCategories = [];
    let selectedTitles = [];
    let selectedResponsibilities = [];

    // DOM Elements
    const execLevel = document.getElementById("exec-level");
    const seniorManagement = document.getElementById("senior-management");
    const middleManagement = document.getElementById("middle-management");
    const departmentHeads = document.getElementById("department-heads");

    const titleContainer = document.getElementById("title-container");
    const titleOptions = document.getElementById("title-options");
    const responsibilityContainer = document.getElementById("responsibility-container");
    const responsibilityOptions = document.getElementById("responsibility-options");

    const selectedTitlesContainer = document.getElementById("selected-titles");
    const selectedResponsibilitiesContainer = document.getElementById("selected-responsibilities");

    // Handle Category Selection
    [execLevel, seniorManagement, middleManagement, departmentHeads].forEach(element => {
        element.addEventListener("change", handleCategorySelection);
    });

    function handleCategorySelection() {
        selectedCategories = [];
        if (execLevel.checked) selectedCategories.push("Executive Level");
        if (seniorManagement.checked) selectedCategories.push("Senior Management");
        if (middleManagement.checked) selectedCategories.push("Middle Management");
        if (departmentHeads.checked) selectedCategories.push("Department Heads");

        renderTitlesAndResponsibilities();
    }

    // Render Titles and Responsibilities
    function renderTitlesAndResponsibilities() {
        titleContainer.classList.toggle("hidden", selectedCategories.length === 0);
        responsibilityContainer.classList.toggle("hidden", selectedCategories.length === 0);

        titleOptions.innerHTML = '';
        responsibilityOptions.innerHTML = '';

        selectedCategories.forEach(category => {
            const categoryDataObj = categoryData[category];
            if (categoryDataObj) {
                // Render Titles
                categoryDataObj.titles.forEach(title => {
                    const checkbox = document.createElement("label");
                    checkbox.innerHTML = `<input type="checkbox" class="title-checkbox"> ${title}`;
                    titleOptions.appendChild(checkbox);
                    checkbox.querySelector("input").addEventListener("change", (e) => {
                        toggleSelection(e, "title", title);
                    });
                });

                // Render Responsibilities
                categoryDataObj.responsibilities.forEach(responsibility => {
                    const checkbox = document.createElement("label");
                    checkbox.innerHTML = `<input type="checkbox" class="responsibility-checkbox"> ${responsibility}`;
                    responsibilityOptions.appendChild(checkbox);
                    checkbox.querySelector("input").addEventListener("change", (e) => {
                        toggleSelection(e, "responsibility", responsibility);
                    });
                });
            }
        });
    }

    // Handle Item Selection for Titles and Responsibilities
    function toggleSelection(event, type, item) {
        if (event.target.checked) {
            if (type === "title" && !selectedTitles.includes(item)) {
                selectedTitles.push(item);  // Add item if not already selected
            } else if (type === "responsibility" && !selectedResponsibilities.includes(item)) {
                selectedResponsibilities.push(item);  // Add item if not already selected
            }
        } else {
            if (type === "title") {
                selectedTitles = selectedTitles.filter(t => t !== item);
            } else if (type === "responsibility") {
                selectedResponsibilities = selectedResponsibilities.filter(r => r !== item);
            }
        }
        renderChips();
    }

    // Render Chips for Titles and Responsibilities
    function renderChips() {
        selectedTitlesContainer.innerHTML = '';
        selectedResponsibilitiesContainer.innerHTML = '';

        // Render Chips for Titles
        selectedTitles.forEach(title => {
            const chip = document.createElement("div");
            chip.classList.add("chip");
            chip.innerHTML = `${title}<span class="close-btn" onclick="removeItem('title', '${title}')">&times;</span>`;
            selectedTitlesContainer.appendChild(chip);
        });

        // Render Chips for Responsibilities
        selectedResponsibilities.forEach(responsibility => {
            const chip = document.createElement("div");
            chip.classList.add("chip");
            chip.innerHTML = `${responsibility}<span class="close-btn" onclick="removeItem('responsibility', '${responsibility}')">&times;</span>`;
            selectedResponsibilitiesContainer.appendChild(chip);
        });
    }

    // Remove Item from Chips and Deselect Checkbox
    function removeItem(type, item) {
        if (type === "title") {
            selectedTitles = selectedTitles.filter(t => t !== item);
            deselectCheckbox("title", item);
        } else if (type === "responsibility") {
            selectedResponsibilities = selectedResponsibilities.filter(r => r !== item);
            deselectCheckbox("responsibility", item);
        }
        renderChips();
    }

    // Deselect the checkbox when a chip is removed
    function deselectCheckbox(type, item) {
        const checkboxes = type === "title" ? document.querySelectorAll(".title-checkbox") : document.querySelectorAll(".responsibility-checkbox");
        checkboxes.forEach(checkbox => {
            if (checkbox.nextElementSibling.innerText === item) {
                checkbox.checked = false;
            }
        });
    }


    document.addEventListener("DOMContentLoaded", () => {

      // PainPoints Data
      const painpointsData = {
          "Regulatory Compliance": [
              "Navigating complex regulatory requirements",
              "Ensuring compliance with industry standards",
              "Managing audits and inspections",
              "Keeping up with changing regulations",
          ],
          "Data Management": [
              "Handling large volumes of data efficiently",
              "Ensuring data security and privacy",
              "Integrating data from multiple sources",
              "Managing data storage and retrieval",
          ],
          "Efficiency": [
              "Reducing manual processes and increasing automation",
              "Streamlining workflows and operations",
              "Improving productivity and reducing downtime",
              "Managing resources effectively",
          ],
          "Integration": [
              "Integrating various software tools and platforms",
              "Ensuring seamless data flow between systems",
              "Managing compatibility issues",
              "Reducing integration costs and complexity",
          ],
          "Innovation": [
              "Developing new products and services",
              "Staying ahead of competitors with cutting-edge technology",
              "Encouraging a culture of innovation within the organization",
          ],
          "Cost Management": [
              "Controlling operational costs",
              "Managing budget constraints",
              "Reducing expenses without sacrificing quality",
              "Optimizing resource allocation",
          ],
          "Customer Satisfaction": [
              "Enhancing user experience",
              "Meeting customer expectations",
              "Managing customer feedback and complaints",
              "Ensuring high levels of customer support",
          ],
          "Security": [
              "Protecting sensitive information from breaches",
              "Ensuring cybersecurity measures are up to date",
              "Managing access control and authentication",
              "Responding to security incidents and threats",
          ],
          "Scalability": [
              "Scaling technology infrastructure to support growth",
              "Managing increased demand without compromising performance",
              "Ensuring systems can handle peak loads",
              "Expanding operations into new markets",
          ],
      };
  
      // Elements
      const painpointsCheckboxGroup = document.getElementById("painpoints-checkbox-group");
      const painpointsChipsWrapper = document.getElementById("painpoints-chips-wrapper");
      const painpointsInfoContainer = document.getElementById("painpoints-info-container");
      const painpointsInfoChipsWrapper = document.getElementById("painpoints-info-chips-wrapper");
  
      // Function to render chips
      function renderChips(items, container, checkboxes, updateFunction) {
          container.innerHTML = "";
          items.forEach((item) => {
              const chip = document.createElement("div");
              chip.className = "chip";
              chip.textContent = item;
  
              const closeBtn = document.createElement("span");
              closeBtn.textContent = "x";
              closeBtn.addEventListener("click", () => {
                  // Deselect the corresponding checkbox
                  const checkbox = Array.from(checkboxes).find((cb) => cb.value === item);
                  if (checkbox) {
                      checkbox.checked = false;
                      updateFunction();
                  }
              });
  
              chip.appendChild(closeBtn);
              container.appendChild(chip);
          });
      }
  
      // Function to update selected painpoints
      function updatePainpoints() {
          const selectedPainpoints = Array.from(
              painpointsCheckboxGroup.querySelectorAll("input[type='checkbox']")
          )
              .filter((checkbox) => checkbox.checked)
              .map((checkbox) => checkbox.value);
  
          renderChips(
              selectedPainpoints,
              painpointsChipsWrapper,
              painpointsCheckboxGroup.querySelectorAll("input[type='checkbox']"),
              updatePainpoints
          );
          renderPainpointsInfo(selectedPainpoints);
      }
  
      // Function to render detailed painpoints
      function renderPainpointsInfo(selectedPainpoints) {
          painpointsInfoContainer.innerHTML = "";
          painpointsInfoChipsWrapper.innerHTML = "";
  
          if (selectedPainpoints.length > 0) {
              painpointsInfoContainer.classList.remove("hidden");
  
              selectedPainpoints.forEach((painpoint) => {
                  const detailsDiv = document.createElement("div");
                  detailsDiv.innerHTML = `<strong>${painpoint}:</strong><br>`;
                  const detailsList = painpointsData[painpoint].map((detail) => {
                      return `
                          <label>
                            <input type="checkbox" value="${detail}" data-parent="${painpoint}" onclick="updateDetailChips('${detail}', this)"> ${detail}
                          </label>
                      `;
                  }).join("");
                  detailsDiv.innerHTML += `<div class="checkbox-group">${detailsList}</div>`;
                  painpointsInfoContainer.appendChild(detailsDiv);
              });
          } else {
              painpointsInfoContainer.classList.add("hidden");
          }
      }
  
      // Function to update details chips
      window.updateDetailChips = function (detail, checkbox) {
          const chips = Array.from(painpointsInfoChipsWrapper.children);
  
          if (checkbox.checked) {
              const chip = document.createElement("div");
              chip.className = "chip";
              chip.textContent = detail;
  
              const closeBtn = document.createElement("span");
              closeBtn.textContent = "x";
              closeBtn.addEventListener("click", () => {
                  // Deselect the corresponding checkbox
                  checkbox.checked = false;
                  updateDetailChips(detail, checkbox);
              });
  
              chip.appendChild(closeBtn);
              painpointsInfoChipsWrapper.appendChild(chip);
          } else {
              chips.forEach((chip) => {
                  if (chip.textContent.startsWith(detail)) chip.remove();
              });
          }
      };
  
      // Add event listeners to painpoints checkboxes
      painpointsCheckboxGroup
          .querySelectorAll("input[type='checkbox']")
          .forEach((checkbox) => checkbox.addEventListener("change", updatePainpoints));
  });



  
  document.addEventListener("DOMContentLoaded", () => {
    // Data for Goals and their Details
    const goalDetailsData = {
        "Regulatory Compliance": [
            "Ensuring all operations comply with industry regulations",
            "Passing audits and inspections without issues",
            "Staying updated with regulatory changes",
        ],
        "Data Security": [
            "Protecting sensitive data from breaches",
            "Implementing robust security measures",
            "Ensuring data privacy compliance",
        ],
        "Efficiency": [
            "Streamlining workflows",
            "Increasing productivity",
            "Improving resource allocation",
        ],
        "Scalability": [
            "Expanding infrastructure for growth",
            "Managing increased demand",
            "Entering new markets",
        ],
        "Innovation": [
            "Developing new products",
            "Staying ahead with cutting-edge tech",
            "Encouraging a culture of innovation",
        ],
        "Customer Satisfaction": [
            "Enhancing user experience",
            "Improving customer support",
            "Gathering actionable feedback",
        ],
        "Cost Reduction": [
            "Reducing operational costs",
            "Optimizing budget allocation",
            "Implementing cost-saving technologies",
        ],
        "Market Expansion": [
            "Entering new markets",
            "Expanding product lines",
            "Increasing brand presence",
        ],
        "Talent Acquisition and Retention": [
            "Attracting skilled professionals",
            "Reducing employee turnover",
            "Investing in training",
        ],
        "Sustainability": [
            "Implementing eco-friendly practices",
            "Reducing carbon footprint",
            "Achieving sustainability goals",
        ],
    };

    // Unique Elements for Goals Section
    const goalOptionsContainer = document.getElementById("goals-options-group");
    const goalSelectedChips = document.getElementById("goals-chips-container");
    const goalDetailsContainer = document.getElementById("goals-details-container");
    const goalDetailsChips = document.getElementById("goals-details-chips-container");

    // Render Chips for Selected Items
    function renderChips(items, chipContainer, checkboxes, updateFunction) {
        chipContainer.innerHTML = "";
        items.forEach((item) => {
            const chip = document.createElement("div");
            chip.className = "chip";
            chip.textContent = item;

            const closeButton = document.createElement("span");
            closeButton.textContent = "x";
            closeButton.addEventListener("click", () => {
                const relatedCheckbox = Array.from(checkboxes).find((cb) => cb.value === item);
                if (relatedCheckbox) {
                    relatedCheckbox.checked = false;
                    updateFunction();
                }
            });

            chip.appendChild(closeButton);
            chipContainer.appendChild(chip);
        });
    }

    // Update Selected Goals
    function updateSelectedGoals() {
        const selectedGoalItems = Array.from(goalOptionsContainer.querySelectorAll("input[type='checkbox']"))
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        renderChips(
            selectedGoalItems,
            goalSelectedChips,
            goalOptionsContainer.querySelectorAll("input[type='checkbox']"),
            updateSelectedGoals
        );

        renderGoalDetails(selectedGoalItems);
    }

    // Render Details for Selected Goals
    function renderGoalDetails(selectedGoalItems) {
        goalDetailsContainer.innerHTML = "";
        goalDetailsChips.innerHTML = "";

        if (selectedGoalItems.length > 0) {
            goalDetailsContainer.classList.remove("hidden");

            selectedGoalItems.forEach((goal) => {
                const detailsDiv = document.createElement("div");
                detailsDiv.innerHTML = `<strong>${goal}:</strong><br>`;

                const detailsList = goalDetailsData[goal]
                    .map(
                        (detail) =>
                            `<label><input type="checkbox" value="${detail}" onclick="updateGoalDetailsChips('${detail}', this)"> ${detail}</label>`
                    )
                    .join("");

                detailsDiv.innerHTML += `<div class="checkbox-group">${detailsList}</div>`;
                goalDetailsContainer.appendChild(detailsDiv);
            });
        } else {
            goalDetailsContainer.classList.add("hidden");
        }
    }

    // Update Detail Chips for Goals
    window.updateGoalDetailsChips = function (detail, checkbox) {
        if (checkbox.checked) {
            const chip = document.createElement("div");
            chip.className = "chip";
            chip.textContent = detail;

            const closeButton = document.createElement("span");
            closeButton.textContent = "x";
            closeButton.addEventListener("click", () => {
                checkbox.checked = false;
                updateGoalDetailsChips(detail, checkbox);
            });

            chip.appendChild(closeButton);
            goalDetailsChips.appendChild(chip);
        } else {
            Array.from(goalDetailsChips.children).forEach((chip) => {
                if (chip.textContent.startsWith(detail)) chip.remove();
            });
        }
    };

    // Add Event Listeners to Goal Checkboxes
    goalOptionsContainer
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => checkbox.addEventListener("change", updateSelectedGoals));
});


    document.addEventListener("DOMContentLoaded", () => {
      // Value Propositions Data
      const valuePropositionsData = {
        "Convenience": [
          "Your product or service makes it easy for customers to solve their challenges or complete tasks. This value proposition emphasizes simplicity and ease of use.",
          
        ],
        "Productivity": [
          "Focuses on helping customers increase their output or efficiency. This value proposition highlights how your product or service can save time or enhance performance.",
         
        ],
        "Experience": [
          "Emphasizes the superior customer experience your product or service offers. This can include exceptional customer service, user-friendly design, or a memorable brand experience.",
       
        ],
        "Identity": [
          "Focuses on status, lifestyle, or culture. This value proposition appeals to customers’ desire to express their identity or align with a particular community or brand image.",
         
        ],
        "Profitability": [
          "Highlights how your product or service helps customers save money or make more money. This value proposition is particularly appealing to businesses looking to improve their bottom line.",
        ],
        "Innovation": [
          "Emphasizes the cutting-edge technology or unique features of your product or service. This value proposition appeals to customers looking for the latest and most advanced solutions.",
        ],
        "Quality": [
          "Focuses on the superior quality or craftsmanship of your product or service.This value proposition appeals to customers who prioritize durability and excellence.",
        ],
        "Customization": [
          "Highlights the ability to tailor your product or service to meet individual customer needs. This value proposition appeals to customers looking for personalized solutions.",
        ],
        "Sustainability": [
          "Emphasizes the environmental or social benefits of your product or service. This value proposition appeals to customers who value sustainability and ethical practices.",
        ],
        "Reliability": [
          "Focuses on the dependability and consistency of your product or service. This value proposition appeals to customers who need a solution they can trust.",
        ],
      };
    
      // Elements
      const vpOptionsGroup = document.getElementById("value-propositions-options-group");
      const vpChipsContainer = document.getElementById("value-propositions-chips-container");
      const vpDetailsContainer = document.getElementById("value-propositions-details-container");
      const vpDetailsChipsContainer = document.getElementById("value-propositions-details-chips-container");
    
      // Function to render chips
      function renderChips(items, container, checkboxes, updateFunction) {
        container.innerHTML = "";
        items.forEach((item) => {
          const chip = document.createElement("div");
          chip.className = "chip";
          chip.textContent = item;
    
          const closeBtn = document.createElement("span");
          closeBtn.textContent = "x";
          closeBtn.addEventListener("click", () => {
            // Deselect the corresponding checkbox
            const checkbox = Array.from(checkboxes).find((cb) => cb.value === item);
            if (checkbox) {
              checkbox.checked = false;
              updateFunction();
            }
          });
    
          chip.appendChild(closeBtn);
          container.appendChild(chip);
        });
      }
    
      // Function to update value propositions selection
      function updateValuePropositions() {
        const selectedVps = Array.from(
          vpOptionsGroup.querySelectorAll("input[type='checkbox']")
        )
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);
    
        renderChips(
          selectedVps,
          vpChipsContainer,
          vpOptionsGroup.querySelectorAll("input[type='checkbox']"),
          updateValuePropositions
        );
        renderVpDetails(selectedVps);
      }
    
      // Function to render details based on selected value propositions
      function renderVpDetails(selectedVps) {
        vpDetailsContainer.innerHTML = "";
        vpDetailsChipsContainer.innerHTML = "";
    
        if (selectedVps.length > 0) {
          vpDetailsContainer.classList.remove("hidden");
    
          selectedVps.forEach((vp) => {
            const detailsDiv = document.createElement("div");
            detailsDiv.innerHTML = `<strong>${vp}:</strong><br>`;
            const detailsList = valuePropositionsData[vp].map((detail) => {
              return `
                <label>
                  <input type="checkbox" value="${detail}" onclick="updateDetailsChips('${detail}', this)"> ${detail}
                </label>
              `;
            }).join("");
            detailsDiv.innerHTML += `<div class="checkbox-group">${detailsList}</div>`;
            vpDetailsContainer.appendChild(detailsDiv);
          });
        } else {
          vpDetailsContainer.classList.add("hidden");
        }
      }
    
      // Function to update detail chips
      window.updateDetailsChips = function (detail, checkbox) {
        const chips = Array.from(vpDetailsChipsContainer.children);
    
        if (checkbox.checked) {
          const chip = document.createElement("div");
          chip.className = "chip";
          chip.textContent = detail;
    
          const closeBtn = document.createElement("span");
          closeBtn.textContent = "x";
          closeBtn.addEventListener("click", () => {
            // Deselect the corresponding checkbox
            checkbox.checked = false;
            updateDetailsChips(detail, checkbox);
          });
    
          chip.appendChild(closeBtn);
          vpDetailsChipsContainer.appendChild(chip);
        } else {
          chips.forEach((chip) => {
            if (chip.textContent.startsWith(detail)) chip.remove();
          });
        }
      };
    
      // Add event listeners to value propositions checkboxes
      vpOptionsGroup
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => checkbox.addEventListener("change", updateValuePropositions));
    });


    document.addEventListener("DOMContentLoaded", () => {
      const proofPointsInput = document.getElementById("proof-points-input");
      const proofPointsChipsContainer = document.getElementById("proof-points-chips-container");
      let proofPointsList = []; // Array to store entered proof points
    
      // Function to render chips for proof points
      function renderProofPointChips() {
        proofPointsChipsContainer.innerHTML = ""; // Clear the container
    
        proofPointsList.forEach((point, index) => {
            const chip = document.createElement("div");
            chip.className = "chip";
            chip.textContent = point;
    
            const closeBtn = document.createElement("span");
            closeBtn.textContent = "x";
            closeBtn.className = "close-btn"; // Add a class for styling
    
            closeBtn.addEventListener("click", () => {
                // Remove the proof point from the list and re-render
                proofPointsList.splice(index, 1);
                renderProofPointChips();
            });
    
            chip.appendChild(closeBtn);
            proofPointsChipsContainer.appendChild(chip);
        });
    }
    
    
      // Event listener for Enter key in the input field
      proofPointsInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const value = proofPointsInput.value.trim();
          if (value && !proofPointsList.includes(value)) {
            proofPointsList.push(value); // Add proof point to the list
            renderProofPointChips(); // Re-render the chips
            proofPointsInput.value = ""; // Clear the input
          }
        }
      });
    });
    
    
// Track the current step
const steps = document.querySelectorAll(".step");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
let currentStep = 0;


// Function to gather inputs from all steps
function gatherInputs() {
  const inputs = {
      introduction: document.querySelector("#step2 textarea").value.trim(),
      industries: [...document.querySelectorAll("#industries-checkbox-container input:checked")].map(cb => cb.value),
      companySizes: [...document.querySelectorAll("#company-sizes-checkbox-container input:checked")].map(cb => cb.value),
      revenues: [...document.querySelectorAll("#revenues-checkbox-container input:checked")].map(cb => cb.value),
      locations: [...document.querySelectorAll("#locations-checkbox-container input:checked")].map(cb => cb.value),
      stages: selectedStages,
      substages: selectedSubstages,
      descriptions: selectedDescriptions,
      categories: selectedCategories,
      titles: selectedTitles,
      responsibilities: selectedResponsibilities,
      painpoints: [...document.querySelectorAll("#painpoints-checkbox-group input:checked")].map(cb => cb.value),
      painpointsDetails: [...document.querySelectorAll("#painpoints-info-container input:checked")].map(cb => cb.value),
      goals: [...document.querySelectorAll("#goals-options-group input:checked")].map(cb => cb.value),
      goalsDetails: [...document.querySelectorAll("#goals-details-container input:checked")].map(cb => cb.value),
      valuePropositions: [...document.querySelectorAll("#value-propositions-options-group input:checked")].map(cb => cb.value),
      valuePropositionsDetails: [...document.querySelectorAll("#value-propositions-details-container input:checked")].map(cb => cb.value),
      proofPoints: [...document.querySelectorAll("#proof-points-chips-container .chip")].map(chip => chip.textContent.trim()),
  };

  return inputs;
}

function populateReview() {
  const inputs = gatherInputs();
  const reviewContent = document.getElementById("review-content");
  reviewContent.innerHTML = ""; // Clear previous content

  for (const [key, value] of Object.entries(inputs)) {
      const section = document.createElement("div");
      section.classList.add("review-section", "mb-3");

      const title = document.createElement("h6");
      title.textContent = key.replace(/([A-Z])/g, " $1"); // Convert camelCase to Title Case
      section.appendChild(title);

      const content = document.createElement("p");
      content.innerHTML = Array.isArray(value)
          ? value.map(item => `<li>${item}</li>`).join("") || "<em>None provided</em>"
          : value || "<em>None provided</em>";
      section.appendChild(content);

      reviewContent.appendChild(section);
  }
}

// Function to validate inputs before moving to Step 10
function validateInputs() {
  const inputs = gatherInputs();
  const validationErrors = [];

  Object.entries(inputs).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length === 0) {
          validationErrors.push(key.replace(/([A-Z])/g, " $1"));
      } else if (!Array.isArray(value) && !value.trim()) {
          validationErrors.push(key.replace(/([A-Z])/g, " $1"));
      }
  });

  if (validationErrors.length > 0) {
      const validationAlert = document.getElementById("validationAlert");
      validationAlert.classList.remove("d-none");
      validationAlert.textContent = `Please complete the following fields: ${validationErrors.join(", ")}`;
      console.error("Validation Errors:", validationErrors); // Debugging error log
      return false;
  }

  document.getElementById("validationAlert").classList.add("d-none");
  return true;
}


// Function to export data as JSON
function exportAsJson() {
  const inputs = gatherInputs();
  const blob = new Blob([JSON.stringify(inputs, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "icp_data.json";
  link.click();
}

// Function to handle form submission
function submitForm() {
    if (validateInputs()) {
        const submitAlert = document.getElementById("submitAlert");
        submitAlert.classList.remove("d-none");
        setTimeout(() => {
            submitAlert.classList.add("d-none");
        }, 3000);
    }
}

// Update step visibility
function updateSteps() {
    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    prevButton.disabled = currentStep === 0;
    nextButton.style.display = currentStep === steps.length - 1 ? "none" : "block";

    if (currentStep === steps.length - 1) {
        if (validateInputs()) {
            populateReview();
        } else {
            currentStep--;
            updateSteps();
        }
    }
}

// Navigation buttons functionality
nextButton.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateSteps();
    }
});

prevButton.addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        updateSteps();
    }
});

// Attach export and submit actions
document.getElementById("exportButton").addEventListener("click", exportAsJson);
document.getElementById("submitButton").addEventListener("click", submitForm);

// Initialize steps
updateSteps();


