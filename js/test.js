 /** Utility Function to Add Chips */
 function addChip(value, container, selectedSet, inputField, dropdownMenu) {
    // Prevent duplicates
    if (selectedSet.has(value)) return;

    // Add chip to selected set
    selectedSet.add(value);

    // Create chip
    const chip = document.createElement("div");
    chip.classList.add("chip");
    chip.textContent = value;

    // Add close button to chip
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => {
      container.removeChild(chip);
      selectedSet.delete(value);
    });

    chip.appendChild(closeBtn);
    container.appendChild(chip);

    // Clear input field and hide dropdown
    inputField.value = "";
    dropdownMenu.classList.remove("show");
  }


    function addChip(value, container, selectedSet, inputField, dropdownMenu) {
      if (selectedSet.has(value)) return; // Prevent duplicates
      selectedSet.add(value);

      const chip = document.createElement("div");
      chip.classList.add("chip");
      chip.textContent = value;

      const closeBtn = document.createElement("span");
      closeBtn.classList.add("close-btn");
      closeBtn.innerHTML = "&times;";
      closeBtn.addEventListener("click", () => {
        container.removeChild(chip);
        selectedSet.delete(value);
      });

      chip.appendChild(closeBtn);
      container.appendChild(chip);

      inputField.value = "";
      dropdownMenu.classList.remove("show");
    }

    /** Pain Points Data */
    const painPoints = [
      "High Operational Costs",
      "Low Productivity",
      "Employee Turnover",
      "Market Competition"
    ];

    /** Pain Points Multiselect Logic */
    const painPointsInput = document.getElementById("pain-points-input");
    const painPointsDropdownMenu = document.getElementById("pain-points-dropdown-menu");
    const painPointsChipsContainer = document.getElementById("pain-points-chips-container");
    const selectedPainPoints = new Set();

    // Populate Dropdown
    painPoints.forEach(point => {
      const listItem = document.createElement("li");
      listItem.classList.add("dropdown-item");
      listItem.textContent = point;
      listItem.dataset.value = point;
      painPointsDropdownMenu.appendChild(listItem);
    });

    // Handle Search
    painPointsInput.addEventListener("input", () => {
      const query = painPointsInput.value.toLowerCase();
      const items = painPointsDropdownMenu.querySelectorAll(".dropdown-item");

      let anyMatch = false;
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.style.display = "";
          anyMatch = true;
        } else {
          item.style.display = "none";
        }
      });

      painPointsDropdownMenu.classList.toggle("show", query.length > 0 && anyMatch);
    });

    // Handle Selection
    painPointsDropdownMenu.addEventListener("click", event => {
      const target = event.target;
      if (target.classList.contains("dropdown-item")) {
        const value = target.dataset.value;
        addChip(value, painPointsChipsContainer, selectedPainPoints, painPointsInput, painPointsDropdownMenu);
      }
    });

     /** Data Sets */
     const countryToCities = {
      "United States": ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"],
      "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
      "United Kingdom": ["London", "Manchester", "Edinburgh", "Birmingham", "Glasgow"],
      "India": ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
      "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    };

    const countries = Object.keys(countryToCities);

    /** Country Multiselect Logic */
    const countryInput = document.getElementById("country-input");
    const countryDropdownMenu = document.getElementById("country-dropdown-menu");
    const countryChipsContainer = document.getElementById("country-chips-container");
    const selectedCountries = new Set();

    countries.forEach(country => {
      const listItem = document.createElement("li");
      listItem.classList.add("dropdown-item");
      listItem.textContent = country;
      listItem.dataset.value = country;
      countryDropdownMenu.appendChild(listItem);
    });

    countryInput.addEventListener("input", () => {
      const query = countryInput.value.toLowerCase();
      const items = countryDropdownMenu.querySelectorAll(".dropdown-item");

      let anyMatch = false;
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.style.display = "";
          anyMatch = true;
        } else {
          item.style.display = "none";
        }
      });

      countryDropdownMenu.classList.toggle("show", query.length > 0 && anyMatch);
    });

    countryDropdownMenu.addEventListener("click", event => {
      const target = event.target;
      if (target.classList.contains("dropdown-item")) {
        const value = target.dataset.value;
        addChip(value, countryChipsContainer, selectedCountries, countryInput, countryDropdownMenu);
        populateCityDropdown(); // Populate cities when countries are selected
      }
    });

    /** Populate City Dropdown */
    function populateCityDropdown() {
      const cityDropdownMenu = document.getElementById("city-dropdown-menu");
      const cityInput = document.getElementById("city-input");

      cityDropdownMenu.innerHTML = ""; // Clear existing cities
      let citiesToShow = [];

      selectedCountries.forEach(country => {
        citiesToShow = citiesToShow.concat(countryToCities[country] || []);
      });

      citiesToShow.forEach(city => {
        const listItem = document.createElement("li");
        listItem.classList.add("dropdown-item");
        listItem.textContent = city;
        listItem.dataset.value = city;
        cityDropdownMenu.appendChild(listItem);
      });

      cityInput.disabled = citiesToShow.length === 0;
    }

    /** City Multiselect Logic */
    const cityInput = document.getElementById("city-input");
    const cityDropdownMenu = document.getElementById("city-dropdown-menu");
    const cityChipsContainer = document.getElementById("city-chips-container");
    const selectedCities = new Set();

    cityInput.addEventListener("input", () => {
      const query = cityInput.value.toLowerCase();
      const items = cityDropdownMenu.querySelectorAll(".dropdown-item");

      let anyMatch = false;
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.style.display = "";
          anyMatch = true;
        } else {
          item.style.display = "none";
        }
      });

      cityDropdownMenu.classList.toggle("show", query.length > 0 && anyMatch);
    });

    cityDropdownMenu.addEventListener("click", event => {
      const target = event.target;
      if (target.classList.contains("dropdown-item")) {
        const value = target.dataset.value;
        addChip(value, cityChipsContainer, selectedCities, cityInput, cityDropdownMenu);
      }
    });

    /** Employee Count Multiselect */
    const employeeCounts = ["1-50", "51-100", "101-500", "More than 501"];
    const employeeInput = document.getElementById("employee-count-input");
    const employeeDropdownMenu = document.getElementById("employee-count-menu");
    const employeeChipsContainer = document.getElementById("employee-chips-container");
    const selectedEmployeeCounts = new Set();

    employeeCounts.forEach(count => {
      const listItem = document.createElement("li");
      listItem.classList.add("dropdown-item");
      listItem.textContent = count;
      listItem.dataset.value = count;
      employeeDropdownMenu.appendChild(listItem);
    });

    employeeInput.addEventListener("input", () => {
      const query = employeeInput.value.toLowerCase();
      const items = employeeDropdownMenu.querySelectorAll(".dropdown-item");

      let anyMatch = false;
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.style.display = "";
          anyMatch = true;
        } else {
          item.style.display = "none";
        }
      });

      employeeDropdownMenu.classList.toggle("show", query.length > 0 && anyMatch);
    });

    employeeDropdownMenu.addEventListener("click", event => {
      const target = event.target;
      if (target.classList.contains("dropdown-item")) {
        const value = target.dataset.value;
        addChip(value, employeeChipsContainer, selectedEmployeeCounts, employeeInput, employeeDropdownMenu);
      }
    });

    /** Department Count Multiselect */
    const departmentCounts = ["1-10", "11-50", "51-100"];
    const departmentInput = document.getElementById("department-count-input");
    const departmentDropdownMenu = document.getElementById("department-count-menu");
    const departmentChipsContainer = document.getElementById("department-chips-container");
    const selectedDepartmentCounts = new Set();

    departmentCounts.forEach(count => {
      const listItem = document.createElement("li");
      listItem.classList.add("dropdown-item");
      listItem.textContent = count;
      listItem.dataset.value = count;
      departmentDropdownMenu.appendChild(listItem);
    });

    departmentInput.addEventListener("input", () => {
      const query = departmentInput.value.toLowerCase();
      const items = departmentDropdownMenu.querySelectorAll(".dropdown-item");

      let anyMatch = false;
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.style.display = "";
          anyMatch = true;
        } else {
          item.style.display = "none";
        }
      });

      departmentDropdownMenu.classList.toggle("show", query.length > 0 && anyMatch);
    });

    departmentDropdownMenu.addEventListener("click", event => {
      const target = event.target;
      if (target.classList.contains("dropdown-item")) {
        const value = target.dataset.value;
        addChip(value, departmentChipsContainer, selectedDepartmentCounts, departmentInput, departmentDropdownMenu);
      }
    });

  /** Industry Multiselect Logic */
  const industries = [
    "Agriculture", "Automotive", "Aerospace", "Banking", "Biotechnology",
    "Chemicals", "Construction", "Consumer Goods", "Defense", "Education",
    "Energy", "Entertainment", "Financial Services", "Food and Beverage",
    "Government", "Healthcare", "Hospitality", "Information Technology",
    "Insurance", "Legal Services", "Logistics", "Manufacturing", "Media",
    "Mining", "Nonprofit", "Pharmaceuticals", "Real Estate", "Retail",
    "Technology", "Telecommunications", "Textiles", "Transportation",
    "Travel and Tourism", "Utilities", "Waste Management", "Wholesale Trade"
  ];

  const industryInput = document.getElementById("industry-search");
  const industryDropdownMenu = document.getElementById("industry-dropdown-menu");
  const industryChipsContainer = document.getElementById("industry-chips");
  const selectedIndustries = new Set();

  industries.forEach(industry => {
    const listItem = document.createElement("li");
    listItem.classList.add("dropdown-item");
    listItem.textContent = industry;
    listItem.dataset.value = industry;
    industryDropdownMenu.appendChild(listItem);
  });

  industryInput.addEventListener("input", () => {
    const query = industryInput.value.toLowerCase();
    const items = industryDropdownMenu.querySelectorAll(".dropdown-item");

    let anyMatch = false;
    items.forEach(item => {
      if (item.textContent.toLowerCase().includes(query)) {
        item.style.display = "";
        anyMatch = true;
      } else {
        item.style.display = "none";
      }
    });

    industryDropdownMenu.classList.toggle("show", query.length > 0 && anyMatch);
  });

  industryDropdownMenu.addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains("dropdown-item")) {
      const industry = target.dataset.value;
      addChip(industry, industryChipsContainer, selectedIndustries, industryInput, industryDropdownMenu);
    }
  });

  /** Revenue Multiselect Logic */
  const revenueRanges = [
    "£0 - £50,000",
    "£50,001 - £500,000",
    "£500,001 - £1,000,000",
    "Above £1,000,000"
  ];

  const revenueInput = document.getElementById("revenue-search");
  const revenueDropdownMenu = document.getElementById("revenue-dropdown-menu");
  const revenueChipsContainer = document.getElementById("revenue-chips");
  const selectedRevenueRanges = new Set();

  revenueRanges.forEach(range => {
    const listItem = document.createElement("li");
    listItem.classList.add("dropdown-item");
    listItem.textContent = range;
    listItem.dataset.value = range;
    revenueDropdownMenu.appendChild(listItem);
  });

  revenueInput.addEventListener("input", () => {
    const query = revenueInput.value.toLowerCase();
    const items = revenueDropdownMenu.querySelectorAll(".dropdown-item");

    let anyMatch = false;
    items.forEach(item => {
      if (item.textContent.toLowerCase().includes(query)) {
        item.style.display = "";
        anyMatch = true;
      } else {
        item.style.display = "none";
      }
    });

    revenueDropdownMenu.classList.toggle("show", query.length > 0 && anyMatch);
  });

  revenueDropdownMenu.addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains("dropdown-item")) {
      const range = target.dataset.value;
      addChip(range, revenueChipsContainer, selectedRevenueRanges, revenueInput, revenueDropdownMenu);
    }
  });

  /** Close dropdown on outside click */
  document.addEventListener("click", (e) => {
    if (!industryDropdownMenu.contains(e.target) && e.target !== industryInput) {
      industryDropdownMenu.classList.remove("show");
    }
    if (!revenueDropdownMenu.contains(e.target) && e.target !== revenueInput) {
      revenueDropdownMenu.classList.remove("show");
    }
  });