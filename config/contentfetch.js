console.log('contentfetch.js loaded');

async function fetchInventoryData() {
  const supabase = window.supabaseClient;

  const { data, error } = await supabase
    .from('inventory')
    .select(`
      inventory_id,
      quantity,
      medicines (
        medicine_id,
        name,
        genericname,
        strength,
        price,
        expiration_date,
        image_url
      )
    `)
    .order('inventory_id', { ascending: true });

    if (error) {
    console.error('Inventory fetch error:', error);
    return [];
    }

    return data;
}

function renderInventoryTable(items) {
  const tbody = document.getElementById('inventoryTableBody');
  tbody.innerHTML = '';

  if (!items || items.length === 0) {
    tbody.innerHTML = `
      <tr class="empty-state-inventorytable">
        <td colspan="8" class="fst-italic text-muted">No Medicine Found</td>
      </tr>
    `;
    return;
  }

  items.forEach(item => {
    const med = item.medicines;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img 
        src="${med.image_url || '../assets/placeholder.png'}"
        alt="${med.name}"
        style="width:40px;height:40px;object-fit:cover;border-radius:6px;cursor:pointer;"
        onclick="openImagePreview('${med.image_url || '../assets/placeholder.png'}')"
        >
      </td>
      <td>${med.name}</td>
      <td>${med.genericname || '—'}</td>
      <td>${med.strength || '—'}</td>
      <td>${item.quantity}</td>
      <td>${med.expiration_date || '—'}</td>
      <td>₱${Number(med.price).toFixed(2)}</td>
    <td>
        <button class="btn btn-sm btn-outline-primary edit-btn"title="Edit"
            data-image="${med.image_url || ''}"
            data-inventory-id="${item.inventory_id}"
            data-name="${med.name}"
            data-generic="${med.genericname || ''}"
            data-strength="${med.strength || ''}"
            data-quantity="${item.quantity}"
            data-price="${med.price}"
            data-expiration="${med.expiration_date || ''}"
            >
            <i class="bi bi-pencil-square"></i>
        </button>
    </td>
    `;

    tbody.appendChild(row);
  });
}

async function fetchSalesLogData() {
  const supabase = window.supabaseClient;

  const { data, error } = await supabase
    .from('transactions')
    .select(`
      transaction_id,
      quantity,
      amount_paid,
      transaction_date,
      transaction_time,
      medicines (
        medicine_id,
        name,
        price
      )
    `)
    .order('transaction_date', { ascending: false })
    .order('transaction_time', { ascending: false });

  if (error) {
    console.error('Sales log fetch error:', error);
    return [];
  }

  return data;
}

function renderSalesLogTable(items) {
  const tbody = document.getElementById('salesLogTableBody');
  tbody.innerHTML = '';

  if (!items || items.length === 0) {
    tbody.innerHTML = `
      <tr class="empty-state-saleslog">
        <td colspan="6" class="fst-italic text-muted">No Sales Found</td>
      </tr>
    `;
    return;
  }

  items.forEach(item => {
    const med = item.medicines;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${med?.name || '—'}</td>
      <td>${item.quantity}</td>
      <td>${item.transaction_date}</td>
      <td>${item.transaction_time}</td>
      <td>₱${Number(med?.price || 0).toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger delete-sale-btn" title="Delete data-transaction-id="${item.transaction_id}"">
        <i class="bi bi-trash"></i>
        
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

