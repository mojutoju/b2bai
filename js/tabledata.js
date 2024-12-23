const icpStepsConfig = [
    {
      label: "Requirements",
      content: "Setup your first ICP. Ideal Customer Profile (ICP) helps in finding leads and prospects suitable for your business. It is mandatory to setup the ICP if you want to use the SDR Agent. You can edit the ICP later.",
      actions: [
        { type: "button", text: "Next", action: "alert('Proceeding to next step')", class: "btn-primary" }
      ]
    },
    {
      label: "Enter your ICP",
      content: "Describe what you want to achieve through this ICP.",
      inputs: [
        { id: "icpInput", type: "text", placeholder: "Enter your goal", required: true }
      ],
      actions: [
        { type: "button", text: "Go Back", action: "alert('Going back to Requirements step')", class: "btn-secondary" },
        { type: "button", text: "Next", action: "alert('Proceeding to Industry step')", class: "btn-primary" }
      ]
    },
    {
      label: "Industry",
      content: "Select the industry and explain why they need your product.",
      inputs: [
        { id: "industrySelect", type: "select", options: ["Agriculture", "Automotive", "Aerospace", "Banking"], multiple: true, required: true },
        { id: "productReason", type: "textarea", placeholder: "Reason", required: true }
      ],
      actions: [
        { type: "button", text: "Go Back", action: "alert('Going back to ICP step')", class: "btn-secondary" },
        { type: "button", text: "Next", action: "alert('Proceeding to Why Now step')", class: "btn-primary" }
      ]
    }
  ];

  const tableBody = document.getElementById('table-body');

  icpStepsConfig.forEach(step => {
    const row = document.createElement('tr');

    // Create Label Column
    const labelCell = document.createElement('td');
    labelCell.textContent = step.label;
    row.appendChild(labelCell);

    // Create Content Column
    const contentCell = document.createElement('td');
    contentCell.textContent = step.content;
    row.appendChild(contentCell);

    // Create Inputs Column
    const inputsCell = document.createElement('td');
    if (step.inputs) {
      step.inputs.forEach(inputConfig => {
        let inputElement;

        switch (inputConfig.type) {
          case 'text':
            inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.placeholder = inputConfig.placeholder;
            inputElement.required = inputConfig.required;
            break;
          case 'textarea':
            inputElement = document.createElement('textarea');
            inputElement.placeholder = inputConfig.placeholder;
            inputElement.required = inputConfig.required;
            break;
          case 'select':
            inputElement = document.createElement('select');
            inputConfig.options.forEach(option => {
              const optionElement = document.createElement('option');
              optionElement.textContent = option;
              inputElement.appendChild(optionElement);
            });
            inputElement.multiple = inputConfig.multiple;
            inputElement.required = inputConfig.required;
            break;
        }

        const inputWrapper = document.createElement('div');
        inputWrapper.appendChild(inputElement);
        inputsCell.appendChild(inputWrapper);
      });
    }
    row.appendChild(inputsCell);

    // Create Actions Column
    const actionsCell = document.createElement('td');
    const actions = step.actions || [];
    actions.forEach(action => {
      const button = document.createElement('button');
      button.textContent = action.text;
      button.classList.add(action.class);
      button.onclick = function () {
        eval(action.action); // Execute the action function
      };
      actionsCell.appendChild(button);
    });
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });