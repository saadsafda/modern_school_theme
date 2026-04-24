/**
 * Modern School Theme — Education Dashboard
 */
frappe.provide("modern_school_theme");

(function() {
    const NAV = [
        { label:"Overview", icon:"grid" },
        { label:"People", icon:"users", items:[
            {l:"Students",dt:"Student",d:"Manage student records"},
            {l:"Instructors",dt:"Instructor",d:"Faculty management"},
            {l:"Guardians",dt:"Guardian",d:"Parent/guardian info"},
            {l:"Student Groups",dt:"Student Group",d:"Class groups"},
        ]},
        { label:"Academics", icon:"book", items:[
            {l:"Programs",dt:"Program",d:"Academic programs"},
            {l:"Courses",dt:"Course",d:"Course catalog"},
            {l:"Topics",dt:"Topic",d:"Course topics"},
            {l:"Rooms",dt:"Room",d:"Classrooms & labs"},
        ]},
        { label:"Admission", icon:"user-plus", items:[
            {l:"Student Applicants",dt:"Student Applicant",d:"Applications"},
            {l:"Student Admission",dt:"Student Admission",d:"Admission cycles"},
            {l:"Program Enrollment",dt:"Program Enrollment",d:"Enrollments"},
            {l:"Course Enrollment",dt:"Course Enrollment",d:"Course signups"},
        ]},
        { label:"Fees", icon:"dollar", items:[
            {l:"Fees",dt:"Fees",d:"Fee collection"},
            {l:"Fee Structure",dt:"Fee Structure",d:"Fee templates"},
            {l:"Fee Category",dt:"Fee Category",d:"Fee types"},
            {l:"Fee Schedule",dt:"Fee Schedule",d:"Bulk fee creation"},
        ]},
        { label:"Attendance", icon:"check", items:[
            {l:"Student Attendance",dt:"Student Attendance",d:"Mark attendance"},
            {l:"Leave Applications",dt:"Student Leave Application",d:"Leave requests"},
            {l:"Attendance Tool",dt:"Student Attendance Tool",d:"Bulk attendance"},
        ]},
        { label:"Assessment", icon:"file", items:[
            {l:"Assessment Plan",dt:"Assessment Plan",d:"Plan assessments"},
            {l:"Assessment Result",dt:"Assessment Result",d:"View results"},
            {l:"Assessment Criteria",dt:"Assessment Criteria",d:"Criteria setup"},
            {l:"Result Tool",dt:"Assessment Result Tool",d:"Bulk results"},
        ]},
        { label:"Schedule", icon:"calendar", items:[
            {l:"Course Schedule",dt:"Course Schedule",d:"View schedules"},
            {l:"Scheduling Tool",dt:"Course Scheduling Tool",d:"Create schedules"},
        ]},
        { label:"Settings", icon:"settings", items:[
            {l:"Education Settings",dt:"Education Settings",d:"Module config"},
            {l:"Student Category",dt:"Student Category",d:"Categories"},
            {l:"Grading Scale",dt:"Grading Scale",d:"Grade scales"},
            {l:"Academic Term",dt:"Academic Term",d:"Terms"},
            {l:"Academic Year",dt:"Academic Year",d:"Years"},
        ]},
    ];

    function get_icon(name) {
        const icons = {
            grid: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
            users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
            book: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
            "user-plus": '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
            dollar: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
            check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            file: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
            calendar: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
            settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
            arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
        };
        return icons[name] || '';
    }

    function is_education_workspace() {
        const route = frappe.get_route();
        return route && route[0] === "Workspaces" && route[1] === "Education";
    }

    function inject() {
        if (!is_education_workspace()) return;
        if (document.getElementById("mst-dash")) return;

        const $main = $("[data-page-route='Workspaces'] .layout-main-section");
        if (!$main.length) return;

        // Hide original content & Frappe sidebar + page head
        $main.children().hide();
        $("[data-page-route='Workspaces'] .layout-side-section").hide();
        $("[data-page-route='Workspaces'] .page-head").hide();
        // Make main section full width
        $("[data-page-route='Workspaces'] .layout-main-section-wrapper").css("max-width", "100%");

        // Create dashboard
        const el = document.createElement("div");
        el.id = "mst-dash";
        el.style.cssText = "display:flex;min-height:calc(100vh - 110px);border-radius:14px;overflow:hidden;background:#fff;border:1px solid #E2E8F0;";
        el.innerHTML = build_sidebar() + '<div id="mst-body" style="flex:1;padding:28px 32px;overflow-y:auto;background:#F8FAFC;"></div>';
        $main[0].prepend(el);

        bind();
        show_section("Overview");
    }

    function build_sidebar() {
        let html = '<div style="width:230px;min-width:230px;background:#fff;border-right:1px solid #E2E8F0;display:flex;flex-direction:column;">';

        // Header
        html += '<div style="padding:20px 16px 16px;border-bottom:1px solid #F1F5F9;">';
        html += '<div style="display:flex;align-items:center;gap:10px;">';
        html += '<div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4F46E5,#7C3AED);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(79,70,229,0.3);">';
        html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg></div>';
        html += '<div><div style="font-family:Manrope,sans-serif;font-size:15px;font-weight:800;color:#0F172A;">Education</div>';
        html += '<div style="font-size:11px;color:#94A3B8;font-weight:500;">Management</div></div>';
        html += '</div></div>';

        // Nav
        html += '<div style="flex:1;padding:8px;overflow-y:auto;">';
        NAV.forEach(g => {
            const active = g.label === "Overview";
            html += `<div class="mst-nav" data-section="${g.label}" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:${active?600:500};margin-bottom:2px;color:${active?'#4F46E5':'#64748B'};background:${active?'#EEF2FF':'transparent'};transition:all .15s ease;">`;
            html += `<span style="display:flex;width:20px;height:20px;align-items:center;justify-content:center;">${get_icon(g.icon)}</span>`;
            html += `<span>${g.label}</span></div>`;
        });
        html += '</div>';

        // Footer
        html += '<div style="padding:8px;border-top:1px solid #F1F5F9;">';
        html += '<div id="mst-back" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:12px;color:#94A3B8;transition:all .15s ease;">';
        html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
        html += '<span>Default View</span></div></div>';

        html += '</div>';
        return html;
    }

    function bind() {
        // Nav clicks
        $(document).on("click", ".mst-nav", function() {
            $(".mst-nav").each(function() {
                this.style.background = "transparent";
                this.style.color = "#64748B";
                this.style.fontWeight = "500";
            });
            this.style.background = "#EEF2FF";
            this.style.color = "#4F46E5";
            this.style.fontWeight = "600";
            show_section($(this).data("section"));
        });

        // Nav hover
        $(document).on("mouseenter", ".mst-nav", function() {
            if (this.style.background !== "rgb(238, 242, 255)") {
                this.style.background = "#F8FAFC";
            }
        }).on("mouseleave", ".mst-nav", function() {
            if (this.style.color !== "rgb(79, 70, 229)") {
                this.style.background = "transparent";
            }
        });

        // Back button
        $(document).on("click", "#mst-back", function() {
            $("#mst-dash").remove();
            $("[data-page-route='Workspaces'] .layout-main-section").children().show();
            $("[data-page-route='Workspaces'] .layout-side-section").show();
            $("[data-page-route='Workspaces'] .page-head").show();
            $("[data-page-route='Workspaces'] .layout-main-section-wrapper").css("max-width", "");
        });
    }

    function show_section(label) {
        const $body = $("#mst-body");
        if (!$body.length) return;

        if (label === "Overview") {
            render_overview($body);
        } else {
            const g = NAV.find(n => n.label === label);
            if (g) render_section($body, g);
        }
    }

    function render_overview($body) {
        let h = '';

        // Title
        h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">';
        h += '<div><h2 style="font-family:Manrope,sans-serif;font-size:22px;font-weight:800;color:#0F172A;margin:0;">Overview</h2>';
        h += '<p style="font-size:13px;color:#94A3B8;margin:4px 0 0;">Your education management dashboard</p></div>';
        h += '<button class="btn btn-sm" onclick="frappe.set_route(\'Form\',\'Student\',\'new\')" style="background:linear-gradient(135deg,#4F46E5,#3730A3);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:600;box-shadow:0 2px 8px rgba(79,70,229,0.25);display:flex;align-items:center;gap:6px;">';
        h += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Student</button></div>';

        // Stat cards
        const stats = [
            {dt:"Student", label:"Total Students", color:"#4F46E5", bg:"#EEF2FF", icon:"users"},
            {dt:"Instructor", label:"Instructors", color:"#059669", bg:"#ECFDF5", icon:"book"},
            {dt:"Program", label:"Programs", color:"#7C3AED", bg:"#F5F3FF", icon:"book"},
            {dt:"Course", label:"Courses", color:"#D97706", bg:"#FFFBEB", icon:"file"},
        ];

        h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-bottom:28px;">';
        stats.forEach(s => {
            h += `<div onclick="frappe.set_route('List','${s.dt}')" style="background:#fff;border:1px solid #E2E8F0;border-radius:14px;padding:18px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:all .2s ease;">`;
            h += `<div style="width:44px;height:44px;border-radius:12px;background:${s.bg};color:${s.color};display:flex;align-items:center;justify-content:center;">${get_icon(s.icon)}</div>`;
            h += `<div><div class="mst-count" data-dt="${s.dt}" style="font-family:Manrope,sans-serif;font-size:24px;font-weight:800;color:#0F172A;line-height:1;">—</div>`;
            h += `<div style="font-size:12px;color:#94A3B8;font-weight:500;margin-top:2px;">${s.label}</div></div></div>`;
        });
        h += '</div>';

        // Quick access
        h += '<div style="font-family:Manrope,sans-serif;font-size:14px;font-weight:700;color:#0F172A;margin-bottom:14px;">Quick Access</div>';
        h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;margin-bottom:28px;">';
        NAV.filter(g => g.label !== "Overview").forEach(g => {
            h += `<div class="mst-qnav" data-section="${g.label}" style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:#fff;border:1px solid #E2E8F0;border-radius:12px;cursor:pointer;transition:all .2s ease;">`;
            h += `<div style="width:36px;height:36px;border-radius:10px;background:#F1F5F9;display:flex;align-items:center;justify-content:center;color:#64748B;">${get_icon(g.icon)}</div>`;
            h += `<div style="flex:1;"><div style="font-size:13px;font-weight:600;color:#1E293B;">${g.label}</div>`;
            h += `<div style="font-size:11px;color:#94A3B8;">${(g.items||[]).length} items</div></div>`;
            h += `${get_icon('arrow')}</div>`;
        });
        h += '</div>';

        // Recent
        h += '<div style="font-family:Manrope,sans-serif;font-size:14px;font-weight:700;color:#0F172A;margin-bottom:14px;">Recent Students</div>';
        h += '<div id="mst-recent" style="background:#fff;border:1px solid #E2E8F0;border-radius:14px;overflow:hidden;">';
        h += '<div style="padding:32px;text-align:center;color:#94A3B8;font-size:13px;">Loading...</div></div>';

        $body.html(h);

        // Quick nav clicks
        $body.find(".mst-qnav").on("click", function() {
            $(`.mst-nav[data-section="${$(this).data("section")}"]`).click();
        });

        // Load counts
        ["Student","Instructor","Program","Course"].forEach(dt => {
            frappe.xcall("frappe.client.get_count",{doctype:dt}).then(c => {
                $(`.mst-count[data-dt="${dt}"]`).text(c||0);
            }).catch(()=>{});
        });

        // Load recent
        frappe.xcall("frappe.client.get_list",{
            doctype:"Student",fields:["name","student_name","creation"],
            order_by:"creation desc",limit_page_length:5
        }).then(data => {
            if (!data||!data.length) {
                $("#mst-recent").html('<div style="padding:32px;text-align:center;color:#94A3B8;">No students found</div>');
                return;
            }
            let rh = '';
            data.forEach(d => {
                const init = (d.student_name||"S")[0].toUpperCase();
                rh += `<div onclick="frappe.set_route('Form','Student','${d.name}')" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #F1F5F9;cursor:pointer;transition:background .15s ease;">`;
                rh += `<div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#EEF2FF,#C7D2FE);color:#4F46E5;font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:center;">${init}</div>`;
                rh += `<div style="flex:1;"><div style="font-size:13px;font-weight:600;color:#1E293B;">${d.student_name||d.name}</div>`;
                rh += `<div style="font-size:11px;color:#94A3B8;">${frappe.datetime.prettyDate(d.creation)}</div></div>`;
                rh += `${get_icon('arrow')}</div>`;
            });
            $("#mst-recent").html(rh);
        }).catch(()=>{});
    }

    function render_section($body, group) {
        let h = '';
        h += `<div style="margin-bottom:24px;"><h2 style="font-family:Manrope,sans-serif;font-size:22px;font-weight:800;color:#0F172A;margin:0;">${group.label}</h2>`;
        h += `<p style="font-size:13px;color:#94A3B8;margin:4px 0 0;">Manage ${group.label.toLowerCase()} related records</p></div>`;

        h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;">';
        (group.items||[]).forEach(item => {
            h += `<div class="mst-card" data-dt="${item.dt}" style="background:#fff;border:1px solid #E2E8F0;border-radius:14px;padding:20px;cursor:pointer;transition:all .25s ease;display:flex;flex-direction:column;justify-content:space-between;min-height:120px;">`;
            h += `<div><div style="font-family:Manrope,sans-serif;font-size:15px;font-weight:700;color:#0F172A;margin-bottom:4px;">${item.l}</div>`;
            h += `<div style="font-size:12px;color:#94A3B8;">${item.d}</div></div>`;
            h += `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:1px solid #F1F5F9;">`;
            h += `<span class="mst-cnt" data-cdt="${item.dt}" style="font-size:12px;color:#64748B;font-weight:500;">—</span>`;
            h += `<span style="font-size:12px;color:#4F46E5;font-weight:600;display:flex;align-items:center;gap:4px;">View All ${get_icon('arrow')}</span>`;
            h += `</div></div>`;
        });
        h += '</div>';

        $body.html(h);

        // Card clicks
        $body.find(".mst-card").on("click", function() {
            frappe.set_route("List", $(this).data("dt"));
        });

        // Load counts
        (group.items||[]).forEach(item => {
            frappe.xcall("frappe.client.get_count",{doctype:item.dt}).then(c => {
                $(`.mst-cnt[data-cdt="${item.dt}"]`).text((c||0) + " records");
            }).catch(()=>{});
        });
    }

    // Hook into page changes
    $(document).on("page-change", function() {
        // Restore sidebar if navigating away from Education
        if (!is_education_workspace()) {
            $("[data-page-route='Workspaces'] .layout-side-section").show();
            $("[data-page-route='Workspaces'] .page-head").show();
            $("[data-page-route='Workspaces'] .layout-main-section-wrapper").css("max-width", "");
        }
        setTimeout(inject, 400);
    });

    // Initial load
    frappe.after_ajax(function() {
        setTimeout(inject, 600);
    });
})();
