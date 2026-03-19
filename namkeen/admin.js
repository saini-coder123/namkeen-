const adminToast = document.getElementById('adminToast');

function showAdminToast(message) {
  if (!adminToast) return;
  adminToast.textContent = message;
  adminToast.classList.add('show');
  window.clearTimeout(adminToast._timer);
  adminToast._timer = window.setTimeout(() => adminToast.classList.remove('show'), 2600);
}

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    showAdminToast('Unable to load products.');
    return [];
  }
}

function createRow(product) {
  const row = document.createElement('div');
  row.className = 'admin-row';

  row.innerHTML = `
    <div class="admin-row__col admin-row__id">${product.id}</div>
    <div class="admin-row__col">
      <input type="text" class="admin-input" data-field="en" value="${product.name.en || ''}" />
    </div>
    <div class="admin-row__col">
      <input type="text" class="admin-input" data-field="hi" value="${product.name.hi || ''}" />
    </div>
    <div class="admin-row__col">
      <input type="text" class="admin-input" data-field="gu" value="${product.name.gu || ''}" />
    </div>
    <div class="admin-row__col">
      <input type="number" class="admin-input" data-field="price" value="${product.price}" min="1" />
    </div>
    <div class="admin-row__col">
      <input type="text" class="admin-input" data-field="unit" value="${product.unit || ''}" />
    </div>
    <div class="admin-row__col">
      <input type="text" class="admin-input" data-field="image" value="${product.image || ''}" />
    </div>
    <div class="admin-row__col admin-row__actions">
      <button class="btn btn--secondary btn--small" data-action="save">Save</button>
    </div>
  `;

  const saveButton = row.querySelector('[data-action="save"]');
  saveButton.addEventListener('click', async () => {
    const updated = {
      id: product.id,
      name: {
        en: row.querySelector('[data-field="en"]').value.trim(),
        hi: row.querySelector('[data-field="hi"]').value.trim(),
        gu: row.querySelector('[data-field="gu"]').value.trim(),
      },
      price: Number(row.querySelector('[data-field="price"]').value),
      unit: row.querySelector('[data-field="unit"]').value.trim(),
      image: row.querySelector('[data-field="image"]').value.trim(),
    };

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error();
      showAdminToast('Saved successfully.');
    } catch (error) {
      showAdminToast('Unable to save changes.');
    }
  });

  return row;
}

async function refreshProducts() {
  const products = await fetchProducts();
  const table = document.getElementById('productTable');
  if (!table) return;
  table.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'admin-row admin-row--header';
  header.innerHTML = `
    <div class="admin-row__col admin-row__id">ID</div>
    <div class="admin-row__col">Name (EN)</div>
    <div class="admin-row__col">Name (HI)</div>
    <div class="admin-row__col">Name (GU)</div>
    <div class="admin-row__col">Price</div>
    <div class="admin-row__col">Unit</div>
    <div class="admin-row__col">Image URL</div>
    <div class="admin-row__col">Action</div>
  `;
  table.appendChild(header);

  products.forEach((product) => {
    table.appendChild(createRow(product));
  });
}

async function initAdmin() {
  const form = document.getElementById('productForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameEn = document.getElementById('newNameEn').value.trim();
    const nameHi = document.getElementById('newNameHi').value.trim();
    const nameGu = document.getElementById('newNameGu').value.trim();
    const price = Number(document.getElementById('newPrice').value);
    const unit = document.getElementById('newUnit').value.trim();
    const image = document.getElementById('newImage').value.trim();

    if (!nameEn || !price) {
      showAdminToast('Please enter at least a name and price.');
      return;
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: { en: nameEn, hi: nameHi, gu: nameGu },
          price,
          unit,
          image,
        }),
      });

      if (!res.ok) throw new Error();
      showAdminToast('New product added.');
      form.reset();
      await refreshProducts();
    } catch {
      showAdminToast('Unable to add product.');
    }
  });

  await refreshProducts();
}

window.addEventListener('DOMContentLoaded', initAdmin);
