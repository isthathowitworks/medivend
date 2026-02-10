// ===== Sidebar Elements =====
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("menuToggle");
const backdrop = document.getElementById("sidebarBackdrop");

function setupTableSearch({
    input,
    tbody,
    getSearchText,
    emptyRowClass,
    colspan
}) {
    if (!input || !tbody) return;

    input.addEventListener('input', function () {
        const filter = input.value.toLowerCase();
        const rows = tbody.getElementsByTagName('tr');

        // 🔄 RESET when empty
        if (filter === '') {
            tbody.querySelector('.no-results')?.remove();

            Array.from(rows).forEach(row => {
                if (!row.classList.contains(emptyRowClass)) {
                    row.style.display = '';
                }
            });
            return;
        }

        let hasResults = false;
        tbody.querySelector('.no-results')?.remove();

        Array.from(rows).forEach(row => {
            if (row.classList.contains(emptyRowClass)) return;

            const text = getSearchText(row).toLowerCase();

            if (text.includes(filter)) {
                row.style.display = '';
                hasResults = true;
            } else {
                row.style.display = 'none';
            }
        });

        if (!hasResults) {
            const noResultsRow = document.createElement('tr');
            noResultsRow.classList.add('no-results');
            noResultsRow.innerHTML = `
                <td colspan="${colspan}" class="fst-italic text-muted text-center">
                    No results found
                </td>
            `;
            tbody.appendChild(noResultsRow);
        }
    });
}

setupTableSearch({
    input: document.getElementById('searchMedicine'),
    tbody: document.getElementById('inventoryTableBody'),
    emptyRowClass: 'empty-state-inventorytable',
    colspan: 8,
    getSearchText: row => row.cells[1]?.textContent || ''
});

setupTableSearch({
    input: document.getElementById('searchSales'),
    tbody: document.getElementById('salesLogTableBody'),
    emptyRowClass: 'empty-state-saleslog',
    colspan: 6,
    getSearchText: row => row.textContent
});

// ===== Sidebar Controls =====
function openSidebar() {
  sidebar.classList.add("show");
  backdrop.classList.add("show");
  document.body.style.overflow = "hidden";
}

function openImagePreview(src) {
  document.getElementById("previewImage").src = src;

  new bootstrap.Modal(
    document.getElementById("imagePreviewModal")
  ).show();
}


function closeSidebar() {
  sidebar.classList.remove("show");
  backdrop.classList.remove("show");
  document.body.style.overflow = "";
}

function toggleSidebar() {
  sidebar.classList.contains("show") ? closeSidebar() : openSidebar();
}

toggle?.addEventListener("click", toggleSidebar);
backdrop?.addEventListener("click", closeSidebar);

// Auto-close on desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeSidebar();
});

// ===== Inventory Controller =====
const InventoryController = (() => {

  function setupImagePicker(scope = document) {
    const chooseBtn = scope.querySelector('[data-image-choose]');
    const fileInput = scope.querySelector('[data-image-input]');
    const fileNameField = scope.querySelector('[data-image-filename]');
    const preview = scope.querySelector('[data-image-preview]');

    if (!chooseBtn || !fileInput || !fileNameField) return;

    chooseBtn.onclick = () => fileInput.click();


    fileInput.addEventListener('change', () => {
      if (!fileInput.files.length) {
        fileNameField.value = 'No file chosen';
        preview.classList.add('d-none');
        return;
      }

      const file = fileInput.files[0];
      fileNameField.value = file.name;

      // live preview
      if (preview) {
        preview.src = URL.createObjectURL(file);
        preview.classList.remove('d-none');
      }
    });
  }


  let currentInventoryId = null;

  async function init() {
    console.log("InventoryController: init");
    await loadInventory();
    bindEvents();
  }

  async function loadInventory() {
    console.log("InventoryController: loadInventory");
    const data = await fetchInventoryData();
    renderInventoryTable(data);
  }

  function bindEvents() {
    const tbody = document.getElementById("inventoryTableBody");
    const addBtn = document.getElementById("addMedicineBtn");

    addBtn.addEventListener('click', () => {
      openAddMedicineModal();
    });

    tbody.addEventListener("click", (e) => {
      const editBtn = e.target.closest(".edit-btn");
      if (!editBtn) return;

      openEditMedicineModal(editBtn.dataset);
    });
  }


  function openEditMedicineModal(data) {
    const modalEl = document.getElementById('medicineModal');
    const modal = new bootstrap.Modal(modalEl);
    const form = document.getElementById('medicineForm');

    setupImagePicker(modalEl);

    currentInventoryId = data.inventoryId;

    // titles
    modalEl.querySelector('.add-title').classList.add('d-none');
    modalEl.querySelector('.edit-title').classList.remove('d-none');

    // buttons
    document.getElementById('saveBtn').classList.add('d-none');
    document.getElementById('updateBtn').classList.remove('d-none');
    document.getElementById('deleteBtn').classList.remove('d-none');

    // fill form
    form.inventory_id.value = data.inventoryId || '';
    form.medicine_id.value = data.medicineId || '';
    form.name.value = data.name || '';
    form.genericname.value = data.generic || '';
    form.strength.value = data.strength || '';
    form.quantity.value = data.quantity || '';
    form.price.value = data.price || '';
    form.expiration_date.value = data.expiration || '';

    // image preview
    const preview = form.querySelector('[data-image-preview]');
    const filename = form.querySelector('[data-image-filename]');
    const fileInput = form.querySelector('[data-image-input]');

    if (data.image) {
      preview.src = data.image;
      preview.classList.remove('d-none');
      filename.value = data.image.split('/').pop();
    } else {
      preview.classList.add('d-none');
      filename.value = 'No file chosen';
    }

    fileInput.value = '';

    modal.show();
  }

  function openAddMedicineModal() {
    const modalEl = document.getElementById('medicineModal');
    const modal = new bootstrap.Modal(modalEl);
    const form = document.getElementById('medicineForm');

    // reset state
    currentInventoryId = null;
    form.reset();

    // titles
    modalEl.querySelector('.add-title').classList.remove('d-none');
    modalEl.querySelector('.edit-title').classList.add('d-none');

    // buttons
    document.getElementById('saveBtn').classList.remove('d-none');
    document.getElementById('updateBtn').classList.add('d-none');
    document.getElementById('deleteBtn').classList.add('d-none');

    // image reset
    const preview = form.querySelector('[data-image-preview]');
    const filename = form.querySelector('[data-image-filename]');
    const fileInput = form.querySelector('[data-image-input]');

    preview.classList.add('d-none');
    preview.src = '';
    filename.value = 'No file chosen';
    fileInput.value = '';

    setupImagePicker(modalEl);

    modal.show();
  }

  return {
    init,
    loadInventory
  };

})();


// ===== View Controller =====
const views = {
  dashboard: {
    el: document.getElementById("dashboardcontentview"),
    onShow: loadDashboard
  },

  inventory: {
    el: document.getElementById("inventorycontentview"),
    onShow: InventoryController.init
  },

  sales: {
  el: document.getElementById("saleslogcontentview"),
  onShow: loadSales
  }
};

// ===== Dashboard Logic =====
function loadDashboard() {
  console.log("Dashboard shown → ready for fresh data");
}

async function loadSales() {
  console.log("Sales shown → loading sales data");
  const data = await fetchSalesLogData();
  renderSalesLogTable(data);
}


function setActiveNav(viewName) {
  document.querySelectorAll(".nav-link[data-view]").forEach(link => {
    link.classList.toggle("active", link.dataset.view === viewName);
  });
}

function hideAllViews() {
  Object.values(views).forEach(view => {
    view.el?.classList.add("d-none");
  });
}

function showView(viewName) {
  const view = views[viewName];
  if (!view?.el) return;

  hideAllViews();
  view.el.classList.remove("d-none");
  setActiveNav(viewName);
  view.onShow?.();
}


// ===== DOM Ready =====
document.addEventListener("DOMContentLoaded", () => {

  // View navigation
  document.querySelectorAll(".nav-link[data-view]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showView(link.dataset.view);
      closeSidebar();
    });
  });

  // Logout
  const logoutLink = document.querySelector(".nav-link.logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", e => {
      e.preventDefault();
      closeSidebar();
      showLogoutConfirm("../index.html");
    });
  }

  // Default view
  showView("dashboard");
});


