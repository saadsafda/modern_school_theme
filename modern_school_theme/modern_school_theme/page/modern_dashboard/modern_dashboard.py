import frappe

@frappe.whitelist()
def get_dashboard_data():
    # Fetch real data for the dashboard
    total_students = frappe.db.count("Student")
    total_programs = frappe.db.count("Program")
    total_courses = frappe.db.count("Course")
    
    # Recent Invoices
    recent_invoices = frappe.get_all("Fees", 
        fields=["name", "posting_date", "grand_total", "outstanding_amount", "student", "student_name"],
        order_by="creation desc",
        limit=5
    )

    return {
        "total_students": total_students,
        "total_programs": total_programs,
        "total_courses": total_courses,
        "recent_invoices": recent_invoices
    }
