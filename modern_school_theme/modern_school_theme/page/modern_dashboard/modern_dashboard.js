frappe.pages['modern-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Dashboard',
        single_column: true
    });

    // Load HTML Template
    $(frappe.render_template("modern_dashboard", {})).appendTo(page.main);
    
    // Bind Events
    $('#btn-view-all-fees').on('click', function() {
        frappe.set_route('List', 'Fees');
    });

    // Fetch Data
    frappe.call({
        method: "modern_school_theme.modern_school_theme.page.modern_dashboard.modern_dashboard.get_dashboard_data",
        callback: function(r) {
            if(r.message) {
                let data = r.message;
                
                // Update Stats
                $('#stat-students').text(data.total_students);
                $('#stat-programs').text(data.total_programs);
                $('#stat-courses').text(data.total_courses);

                // Render Table
                let tbody = $('#invoices-table-body');
                tbody.empty();

                if(data.recent_invoices.length > 0) {
                    data.recent_invoices.forEach(inv => {
                        let amount = frappe.format(inv.grand_total, {fieldtype: 'Currency'});
                        let outstanding = frappe.format(inv.outstanding_amount, {fieldtype: 'Currency'});
                        let status_badge = inv.outstanding_amount > 0 
                            ? `<span class="status-badge status-unpaid">Unpaid</span>` 
                            : `<span class="status-badge status-paid">Paid</span>`;
                        
                        let row = `
                            <tr>
                                <td><a href="/app/fees/${inv.name}" style="font-weight: 700; color: #191c1e; text-decoration: none;">${inv.name}</a></td>
                                <td>${frappe.datetime.str_to_user(inv.posting_date)}</td>
                                <td>${inv.student_name || inv.student}</td>
                                <td style="font-weight: 600;">${amount}</td>
                                <td>${status_badge}</td>
                            </tr>
                        `;
                        tbody.append(row);
                    });
                } else {
                    tbody.append('<tr><td colspan="5" class="text-center text-muted">No recent invoices found.</td></tr>');
                }
            }
        }
    });
};
