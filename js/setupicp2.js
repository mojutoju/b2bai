// Define Company Sizes
const companySizes = [
    { label: "Small (1-50 employees)", range: [1, 50] },
    { label: "Medium (51-200 employees)", range: [51, 200] },
    { label: "Large (201-500 employees)", range: [201, 500] },
    { label: "Enterprise (501-1,000 employees)", range: [501, 1000] },
    { label: "Large Enterprise (1,001+ employees)", range: [1001, Infinity] } // Corrected range and closed parenthesis
  ];
  
  // Define Revenue Ranges
  const revenueRanges = [
    { label: "Under $1M annually", range: [0, 1000000] },
    { label: "$1M-$10M annually", range: [1000001, 10000000] },
    { label: "$10M-$50M annually", range: [10000001, 50000000] },
    { label: "$50M-$100M annually", range: [50000001, 100000000] },
    { label: "$100M-$500M annually", range: [100000001, 500000000] },
    { label: "$500M-$1B annually", range: [500000001, 1000000000] },
    { label: "$1B+ annually", range: [1000000001, Infinity] } // Corrected range
  ];
  
  // Define Locations
  const locations = [
    { label: "North America" },
    { label: "Europe" },
    { label: "Asia" },
    { label: "South America" },
    { label: "Africa" },
    { label: "Australia" },
    { label: "Global" }
  ];
  
  
  const sizesContainer = document.getElementById('sizesContainer');
  const revenueContainer = document.getElementById('revenueContainer');
  const locationsContainer = document.getElementById('locationsContainer');
  
  const sizeChips = document.getElementById('sizeChips');
  const revenueChips = document.getElementById('revenueChips');
  const locationChips = document.getElementById('locationChips');
  
  
  const selectedSizes = new Set();
  const selectedRevenues = new Set();
  const selectedLocations = new Set();
  
  
  // Populate Locations
  locations.forEach(location => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = location.label;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            selectedLocations.add(location.label);
            addChip(location.label, locationChips, selectedLocations);
        } else {
            selectedLocations.delete(location.label);
            removeChip(location.label, locationChips);
        }
    });
  
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(location.label));
    locationsContainer.appendChild(label);
  });
  
  
  
  // Populate Company Sizes
  companySizes.forEach(size => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = size.label;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            selectedSizes.add(size.label);
            addChip(size.label, sizeChips, selectedSizes);
        } else {
            selectedSizes.delete(size.label);
            removeChip(size.label, sizeChips);
        }
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(size.label));
    sizesContainer.appendChild(label);
  });
  
  // Populate Revenue Ranges
  revenueRanges.forEach(revenue => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = revenue.label;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            selectedRevenues.add(revenue.label);
            addChip(revenue.label, revenueChips, selectedRevenues);
        } else {
            selectedRevenues.delete(revenue.label);
            removeChip(revenue.label, revenueChips);
        }
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(revenue.label));
    revenueContainer.appendChild(label);
  });
  