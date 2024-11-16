const dropdown = document.getElementById('collection-filter');
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');

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

function updateArrowStates() {
  prevArrow.style.opacity = dropdown.selectedIndex === 0 ? 0.5 : 1;
  prevArrow.style.pointerEvents = dropdown.selectedIndex === 0 ? 'none' : 'auto';

  nextArrow.style.opacity =
    dropdown.selectedIndex === dropdown.options.length - 1 ? 0.5 : 1;
  nextArrow.style.pointerEvents =
    dropdown.selectedIndex === dropdown.options.length - 1 ? 'none' : 'auto';
}

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

dropdown.addEventListener('change', function () {
  const selectedValue = this.value;
  if (selectedValue) {
    window.location.href = selectedValue;
  }
});

syncDropdownWithCurrentUrl();
