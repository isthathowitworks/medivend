document.addEventListener('DOMContentLoaded', function() {
    // Login logic
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'Admin' && password === 'password') {
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            } else {
                errorMessage.textContent = 'Incorrect username or password.';
            }
        });
    }

    // Inventory logic
    

    // Additional logic for alerts and sales log
    const lowStockList = document.getElementById('lowStockList');
    const expiringSoonList = document.getElementById('expiringSoonList');

    if (medicineTable) {
        const rows = medicineTable.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const stock = parseInt(cells[1].textContent);
            const expirationDate = new Date(cells[2].textContent);
            const today = new Date();

            // Check for low stock
            if (stock <= 5) {
                const listItem = document.createElement('li');
                listItem.textContent = `${cells[0].textContent} - Low Stock`;
                listItem.style.color = 'red';
                lowStockList.appendChild(listItem);
            }

            // Check for expiring soon
            const timeDiff = expirationDate - today;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            if (daysDiff <= 30) {
                const listItem = document.createElement('li');
                listItem.textContent = `${cells[0].textContent} - Expiring Soon`;
                listItem.style.color = 'orange';
                expiringSoonList.appendChild(listItem);
            }
        }
    }

});

// modal
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay'); // Ensure overlay element exists

    // Logic for delete confirmation modal
    const deleteButton = document.getElementById('deleteButton');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelDelete = document.getElementById('cancelDelete');

    function openModal() {
        confirmationModal.style.display = 'block';
        overlay.style.display = 'block'; // Show overlay
    }

    function closeModal() {
        confirmationModal.style.display = 'none';
        overlay.style.display = 'none'; // Hide overlay
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', openModal);
    }

    if (confirmDelete) {
        confirmDelete.addEventListener('click', function() {
            // Logic to delete the item
            closeModal();
            alert('Item deleted successfully.');
        });
    }

    if (cancelDelete) {
        cancelDelete.addEventListener('click', closeModal);
    }

    // Logic for second confirm changes modal
    const confirmButton1 = document.getElementById('confirmButton1');
    const confirmChangesModal1 = document.getElementById('confirmChangesModal1');
    const confirmChangesYes1 = document.getElementById('confirmChangesYes1');
    const confirmChangesNo1 = document.getElementById('confirmChangesNo1');

    function openConfirmChangesModal1() {
        confirmChangesModal1.style.display = 'block';
        overlay.style.display = 'block'; // Show overlay
    }

    function closeConfirmChangesModal1() {
        confirmChangesModal1.style.display = 'none';
        overlay.style.display = 'none'; // Hide overlay
    }

    if (confirmButton1) {
        confirmButton1.addEventListener('click', openConfirmChangesModal1);
    }

    if (confirmChangesYes1) {
        confirmChangesYes1.addEventListener('click', function() {
            // Logic to confirm changes
            closeConfirmChangesModal1();
            alert('Changes confirmed successfully.');
        });
    }

    if (confirmChangesNo1) {
        confirmChangesNo1.addEventListener('click', closeConfirmChangesModal1);
    }

    

});

// sidebar
document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function () {
            sidebar.classList.remove('active');
        });
    }

    document.addEventListener('click', function (event) {
        if (
            sidebar.classList.contains('active') &&
            !sidebar.contains(event.target) &&
            !sidebarToggle.contains(event.target)
        ) {
            sidebar.classList.remove('active');
        }
    });
});


// inventory and sales log table
document.addEventListener('DOMContentLoaded', function() {
    const salesLogTable = document.getElementById('salesLogTable');
    const salesTbody = salesLogTable ? salesLogTable.querySelector('tbody') : null;
    const salesSearchBar = document.getElementById('salessearchBar');
    
    if (salesTbody) {
        // Sales log sample data
        const salesData = [
            { name: 'Biogesic', qty: 3, date: '2025-05-04', time: '10:30 AM', price: 30 },
            { name: 'Dolfenal', qty: 1, date: '2025-05-04', time: '11:15 AM', price: 12 },
            { name: 'Advil', qty: 2, date: '2025-05-04', time: '12:00 PM', price: 30 },
            { name: 'Alaxan', qty: 4, date: '2025-05-04', time: '01:30 PM', price: 60 },
            { name: 'Neozep', qty: 5, date: '2025-05-04', time: '02:45 PM', price: 50 },
            { name: 'Bioflu', qty: 3, date: '2025-05-04', time: '03:30 PM', price: 30 },
            { name: 'Tuseran Forte', qty: 2, date: '2025-05-05', time: '09:00 AM', price: 24 },
            { name: 'Solmux', qty: 1, date: '2025-05-05', time: '09:45 AM', price: 10 },
            { name: 'Cetirizine', qty: 4, date: '2025-05-05', time: '10:15 AM', price: 32 },
            { name: 'Diatabs', qty: 3, date: '2025-05-05', time: '11:00 AM', price: 24 },
            { name: 'Kremil-S', qty: 2, date: '2025-05-05', time: '12:30 PM', price: 10 },
            { name: 'Buscopan', qty: 1, date: '2025-05-05', time: '01:00 PM', price: 10 }
        ];
    
        // Clear existing rows
        salesTbody.innerHTML = '';
    
        // Populate the sales log table
        salesData.forEach(sale => {
            const newRow = salesTbody.insertRow();
            newRow.innerHTML = `
                <td>${sale.name}</td>
                <td>${sale.qty}</td>
                <td>${sale.date}</td>
                <td>${sale.time}</td>
                <td>₱${sale.price}</td>
                <td>
                    <!-- Action buttons can go here if needed -->
                </td>
            `;
        });
    
        // Search functionality for sales log
        if (salesSearchBar) {
            salesSearchBar.addEventListener('input', function () {
                const filter = salesSearchBar.value.toLowerCase();
                const rows = salesTbody.getElementsByTagName('tr');
                let hasResults = false;
    
                // Remove any existing "No results found" row
                const existingNoResultsRow = salesTbody.querySelector('tr.no-results');
                if (existingNoResultsRow) {
                    existingNoResultsRow.remove();
                }
    
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].classList.contains('no-results')) continue;
                    const cells = rows[i].getElementsByTagName('td');
                    // Combine all cell text for flexible searching
                    const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
                    if (rowText.includes(filter)) {
                        rows[i].style.display = '';
                        hasResults = true;
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
    
                if (!hasResults) {
                    const noResultsRow = document.createElement('tr');
                    noResultsRow.classList.add('no-results');
                    noResultsRow.innerHTML = `
                        <td colspan="6" style="text-align: center; height: 60px; font-style: italic; color: gray;">
                            No results found
                        </td>
                    `;
                    salesTbody.appendChild(noResultsRow);
                }
            });
        }
        salesTbody.innerHTML = '';

        salesData.forEach(sale => {
            const newRow = salesTbody.insertRow();
            newRow.innerHTML = `
                <td>${sale.name}</td>
                <td>${sale.qty}</td>
                <td>${sale.date}</td>
                <td>${sale.time}</td>
                <td>₱${sale.price}</td>
                <td>
            <a href="#" class="delete-sale">
                <img src="deleteicon.jpg" alt="Delete" style="width:20px;height:20px;">
            </a>                
            </td>
            `;
        });
    }

    const medicineTable = document.getElementById('medicineTable').getElementsByTagName('tbody')[0];
    const searchBar = document.getElementById('searchBar');
    
    // Sample medicines data
    const sampleMedicines = [
        { name: 'Biogesic', stock: 10, expiration: '2023-12-01', price: 10 },
        { name: 'Dolfenal', stock: 8, expiration: '2023-11-15', price: 12 },
        { name: 'Advil', stock: 15, expiration: '2024-01-10', price: 15 },
        { name: 'Alaxan', stock: 5, expiration: '2023-10-20', price: 15 },
        { name: 'Neozep', stock: 20, expiration: '2023-12-05', price: 10 },
        { name: 'Bioflu', stock: 25, expiration: '2023-11-30', price: 10 },
        { name: 'Tuseran Forte', stock: 4, expiration: '2023-10-25', price: 12 },
        { name: 'Solmux', stock: 12, expiration: '2023-12-15', price: 10 },
        { name: 'Cetirizine', stock: 3, expiration: '2023-11-01', price: 8 },
        { name: 'Diatabs', stock: 7, expiration: '2023-11-20', price: 8 },
        { name: 'Kremil-S', stock: 6, expiration: '2023-10-30', price: 5 },
        { name: 'Buscopan', stock: 9, expiration: '2023-12-10', price: 10 }
    ];

    // Clear existing rows to prevent duplication
    medicineTable.innerHTML = '';

    // Populate the medicine table with sample data
    sampleMedicines.forEach(medicine => {
        const newRow = medicineTable.insertRow();
        newRow.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.stock}</td>
            <td>${medicine.expiration}</td>
            <td>₱${medicine.price}</td>
            <td>
                <a href="editmedicine.html"><img src="editicon.jpg" alt="Edit" style="width:30px;height:30px;"></a>
            </td>
        `;
    });

    // Search functionality
    
    searchBar.addEventListener('input', function () {
        const filter = searchBar.value.toLowerCase();
        const rows = medicineTable.getElementsByTagName('tr');
        let hasResults = false;
    
        // First, remove any existing "No results found" row
        const existingNoResultsRow = medicineTable.querySelector('tr.no-results');
        if (existingNoResultsRow) {
            existingNoResultsRow.remove();
        }
    
        // Loop through table rows
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const medicineName = cells[0]?.textContent.toLowerCase() || '';
            if (medicineName.includes(filter)) {
                rows[i].style.display = '';
                hasResults = true;
            } else {
                rows[i].style.display = 'none';
            }
        }
    
        // If no results found, insert the message row
        if (!hasResults) {
            const noResultsRow = document.createElement('tr');
            noResultsRow.classList.add('no-results'); // For easy reference/removal
            noResultsRow.innerHTML = `
                <td colspan="5" style="text-align: center; height: 60px; font-style: italic; color: gray;">
                    No results found
                </td>
            `;
            medicineTable.appendChild(noResultsRow);
        }
        
    });

});


document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay'); // Ensure overlay element exists
    // modal para sa sales log kasi hindi gumagana yung function kapag nireuse
    // Logic for delete confirmation modal 2 (for sales_log.html)
    const confirmationModal2 = document.getElementById('confirmationModal2');
    const confirmDelete2 = document.getElementById('confirmDelete2');
    const cancelDelete2 = document.getElementById('cancelDelete2');
    const salesLogTable = document.getElementById('salesLogTable');
    const salesTbody = salesLogTable ? salesLogTable.querySelector('tbody') : null;

    function openModal2() {
        confirmationModal2.style.display = 'block';
        overlay.style.display = 'block'; // Show overlay
    }

    function closeModal2() {
        confirmationModal2.style.display = 'none';
        overlay.style.display = 'none'; // Hide overlay
    }

    // Use event delegation for delete-sale clicks
    if (salesTbody) {
        salesTbody.addEventListener('click', function(event) {
            const deleteLink = event.target.closest('.delete-sale');
            if (deleteLink) {
                event.preventDefault();
                openModal2();
            }
        });
    }

    if (confirmDelete2) {
        confirmDelete2.addEventListener('click', function() {
            closeModal2();
            alert('Item deleted successfully.');
            // Add actual delete logic here if needed
        });
    }

    if (cancelDelete2) {
        cancelDelete2.addEventListener('click', closeModal2);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dashboardData = {
        sales: [
            { medicineName: "Biogesic", quantity: 3, time: "10:30 AM", amount: 30.00 },
            { medicineName: "Dolfenal", quantity: 2, time: "11:15 AM", amount: 24.00 },
            { medicineName: "Alaxan", quantity: 4, time: "01:30 PM", amount: 60.00 },
            { medicineName: "Neozep", quantity: 5, time: "02:45 PM", amount: 50.00 },
            { medicineName: "Bioflu", quantity: 3, time: "03:30 PM", amount: 30.00 }
        ],
        machineStatus: {
            temperature: "22°C",
            coinBalance: 345.00,
            remainingMedicines: 120
        },
        alerts: [
            { medicine: "Biogesic", remaining: 3 },
            { medicine: "Alaxan", remaining: 2 }
        ]
    };

    // Function to populate sales table
    function populateSalesTable() {
        const tableBody = document.getElementById('salesTableBody');
        let totalSales = 0;

        tableBody.innerHTML = '';
        dashboardData.sales.forEach(sale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sale.medicineName}</td>
                <td>${sale.quantity}</td>
                <td>${sale.time}</td>
                <td>₱${sale.amount.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
            totalSales += sale.amount;
        });

        document.getElementById('totalSales').innerHTML = `<strong>₱${totalSales.toFixed(2)}</strong>`;
    }

    // Function to populate machine status
    function populateMachineStatus() {
        const machineStatusTable = document.getElementById('machineStatusTable').getElementsByTagName('tbody')[0];
        const status = dashboardData.machineStatus;

        machineStatusTable.rows[0].cells[1].textContent = status.temperature;
        machineStatusTable.rows[1].cells[1].textContent = `₱${status.coinBalance.toFixed(2)}`;
        machineStatusTable.rows[2].cells[1].textContent = status.remainingMedicines;
    }

    // Function to populate alerts
    function populateAlerts() {
        const alertsTable = document.getElementById('alertsTable').getElementsByTagName('tbody')[0];
        alertsTable.innerHTML = '';

        dashboardData.alerts.forEach(alert => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${alert.medicine}</td>
                <td>${alert.remaining}</td>
            `;
            row.style.color = alert.remaining <= 3 ? 'red': 'red';
            alertsTable.appendChild(row);
        });
    }

    // Initialize dashboard when page loads
    window.onload = function() {
        populateSalesTable();
        populateMachineStatus();
        populateAlerts();
    };
});