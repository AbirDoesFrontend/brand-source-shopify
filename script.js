const dropdown = document.getElementById('collection-filter');
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');
const vendorDropdown = document.getElementById('vendor-filter');
const productList = document.getElementById('product-list');
const currentMonth = productList.getAttribute('data-current-month');
const currentYear = productList.getAttribute('data-current-year');
const productItems = productList.querySelectorAll('.product-item');

// Sync collection dropdown with the current URL
function syncDropdownWithCurrentUrl() {
  const currentUrl = window.location.pathname;
  const options = Array.from(dropdown.options);

  options.forEach((option, index) => {
    if (option.value === currentUrl) {
      dropdown.selectedIndex = index;
    }
  });

  updateArrowStates();
}

// Update arrow states for collection navigation
function updateArrowStates() {
  prevArrow.style.opacity = dropdown.selectedIndex === 0 ? 0.5 : 1;
  prevArrow.style.pointerEvents = dropdown.selectedIndex === 0 ? 'none' : 'auto';

  nextArrow.style.opacity =
    dropdown.selectedIndex === dropdown.options.length - 1 ? 0.5 : 1;
  nextArrow.style.pointerEvents =
    dropdown.selectedIndex === dropdown.options.length - 1 ? 'none' : 'auto';
}

// Navigate collections using arrows
prevArrow.addEventListener('click', () => {
  if (dropdown.selectedIndex > 0) {
    dropdown.selectedIndex -= 1;
    window.location.href = dropdown.value;
  }
});

nextArrow.addEventListener('click', () => {
  if (dropdown.selectedIndex < dropdown.options.length - 1) {
    dropdown.selectedIndex += 1;
    window.location.href = dropdown.value;
  }
});

// Handle collection dropdown change
dropdown.addEventListener('change', function () {
  const selectedValue = this.value;
  if (selectedValue) {
    window.location.href = selectedValue;
  }
});

// Filter products by current month and year
function filterProducts() {
  let vendors = new Set();

  productItems.forEach((product) => {
    const tags = product.getAttribute('data-tags');
    const vendor = product.getAttribute('data-vendor');

    if (tags.includes(currentMonth) && tags.includes(currentYear)) {
      product.style.display = 'block';
      product.setAttribute('data-visible', 'true');
      vendors.add(vendor); // Add vendor for visible products
    } else {
      product.style.display = 'none';
      product.setAttribute('data-visible', 'false');
    }
  });

  // Update vendor dropdown based on visible products
  updateVendorDropdown([...vendors]);
}

// Update vendor dropdown options
function updateVendorDropdown(vendors) {
  vendorDropdown.innerHTML = `<option value="">Brands</option>`; // Reset dropdown
  vendors.forEach((vendor) => {
    const option = document.createElement('option');
    option.value = vendor;
    option.textContent = vendor;
    vendorDropdown.appendChild(option);
  });
}

// Handle vendor filter changes
vendorDropdown.addEventListener('change', function () {
  const selectedVendor = this.value;

  productItems.forEach((product) => {
    const isVisible = product.getAttribute('data-visible') === 'true';
    const vendor = product.getAttribute('data-vendor');

    if (isVisible && (!selectedVendor || vendor === selectedVendor)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  syncDropdownWithCurrentUrl();
  filterProducts(); // Filter products for the current month and year
});
