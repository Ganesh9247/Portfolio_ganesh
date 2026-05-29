/**
 * Admin Dashboard Controller
 */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initSidebarNavigation();
    loadAnalytics();
    renderInbox();
    loadProfileEditor();
    initResumeUploader();
});

/* ==========================================================================
   THEME SYNCHRONIZER
   ========================================================================== */
function initTheme() {
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark-mode";
    const body = document.body;
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(savedTheme);

    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        // Sync indicator emoji
        themeToggleBtn.querySelector("span").textContent = savedTheme === "dark-mode" ? "☀️" : "🌙";
        
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = body.classList.contains("dark-mode") ? "dark-mode" : "light-mode";
            const newTheme = currentTheme === "dark-mode" ? "light-mode" : "dark-mode";
            
            body.classList.remove(currentTheme);
            body.classList.add(newTheme);
            localStorage.setItem("portfolio_theme", newTheme);
            themeToggleBtn.querySelector("span").textContent = newTheme === "dark-mode" ? "☀️" : "🌙";
        });
    }
}

/* ==========================================================================
   SIDEBAR & TAB SWITCHER
   ========================================================================== */
function initSidebarNavigation() {
    const sidebarItems = document.querySelectorAll(".sidebar-item[data-panel]");
    const panels = document.querySelectorAll(".dashboard-panel");

    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetPanelId = item.getAttribute("data-panel");

            // Toggle active sidebar item
            sidebarItems.forEach(sib => sib.classList.remove("active"));
            item.classList.add("active");

            // Toggle active content panel
            panels.forEach(panel => {
                panel.classList.remove("active");
                if (panel.id === `panel-${targetPanelId}`) {
                    panel.classList.add("active");
                }
            });

            // Specific tab initializations
            if (targetPanelId === "overview") {
                loadAnalytics();
            } else if (targetPanelId === "inbox") {
                renderInbox();
            } else if (targetPanelId === "uploader") {
                renderResumeStatus();
            }
        });
    });
}

/* ==========================================================================
   OVERVIEW & ANALYTICS WIDGETS
   ========================================================================== */
function loadAnalytics() {
    // Load Stats from storage
    let stats = { views: 120, downloads: 42, contacts: 5 };
    try {
        const savedStats = localStorage.getItem("portfolio_analytics");
        if (savedStats) stats = JSON.parse(savedStats);
    } catch(e) {
        console.warn("Using default stats");
    }

    // Bind values to DOM
    const viewsEl = document.getElementById("analytics-views");
    const downloadsEl = document.getElementById("analytics-downloads");
    const contactsEl = document.getElementById("analytics-contacts");
    
    if (viewsEl) viewsEl.textContent = stats.views;
    if (downloadsEl) downloadsEl.textContent = stats.downloads;
    if (contactsEl) contactsEl.textContent = stats.contacts;

    // Render Weekly CSS Bar Chart
    const chartContainer = document.getElementById("traffic-chart");
    if (chartContainer) {
        // Daily visitor count distributions
        const chartData = [
            { day: "Mon", count: Math.round(stats.views * 0.12) + 2 },
            { day: "Tue", count: Math.round(stats.views * 0.16) + 4 },
            { day: "Wed", count: Math.round(stats.views * 0.08) + 1 },
            { day: "Thu", count: Math.round(stats.views * 0.22) + 8 },
            { day: "Fri", count: Math.round(stats.views * 0.18) + 5 },
            { day: "Sat", count: Math.round(stats.views * 0.14) + 3 },
            { day: "Sun", count: Math.round(stats.views * 0.10) + 2 }
        ];

        // Find max element to compute proportional heights
        const maxVal = Math.max(...chartData.map(d => d.count), 1);
        chartContainer.innerHTML = ""; // Clear existing

        chartData.forEach(item => {
            const barWrapper = document.createElement("div");
            barWrapper.className = "chart-bar-wrapper";

            const percentHeight = (item.count / maxVal) * 100;
            
            barWrapper.innerHTML = `
                <div class="chart-bar" style="height: ${percentHeight}%;">
                    <div class="chart-bar-tooltip">${item.count} views</div>
                </div>
                <div class="chart-label">${item.day}</div>
            `;
            chartContainer.appendChild(barWrapper);
        });
    }
}

/* ==========================================================================
   RESUME EDITOR PANEL
   ========================================================================== */
const DEFAULT_PROFILE = {
    name: "GANESH PRASAD CHILLAPALLI",
    role: "Java Full Stack Developer",
    email: "Chillapallirajababu620@gmail.com",
    phone: "7013350830",
    location: "Mangalagiri, Andhra Pradesh, India",
    linkedin: "https://www.linkedin.com/in/ganesh-chillapalli",
    github: "https://github.com/Ganesh9247",
    summary: "Aspiring Java Full Stack Developer with basic foundational knowledge in Java, Spring Boot, HTML, CSS, and React. Recently completed hands-on training and academic projects focused on building responsive web applications and RESTful APIs. Quick learner with a passion for clean code, problem solving, and collaborative development in agile environments."
};

function loadProfileEditor() {
    let profile = localStorage.getItem("portfolio_profile");
    if (!profile) {
        profile = JSON.stringify(DEFAULT_PROFILE);
        localStorage.setItem("portfolio_profile", profile);
    }
    const data = JSON.parse(profile);

    // Sync Sidebar Display
    updateSidebarProfile(data.name, data.role);

    // Populate form fields
    const fields = ["name", "role", "email", "phone", "location", "linkedin", "github", "summary"];
    fields.forEach(field => {
        const input = document.getElementById(`edit-${field}`);
        if (input && data[field]) {
            input.value = data[field];
        }
    });

    // Handle Editor Form Save Action
    const editorForm = document.getElementById("profileEditorForm");
    if (editorForm) {
        editorForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const updatedData = { ...data };
            fields.forEach(field => {
                const input = document.getElementById(`edit-${field}`);
                if (input) {
                    updatedData[field] = input.value.trim();
                }
            });

            // Save back to storage
            localStorage.setItem("portfolio_profile", JSON.stringify(updatedData));
            
            // Sync Sidebar
            updateSidebarProfile(updatedData.name, updatedData.role);
            showToast("Profile details updated successfully!", "success");
        });
    }
}

function updateSidebarProfile(name, role) {
    const nameEl = document.querySelector(".sidebar-name");
    const roleEl = document.querySelector(".sidebar-role");
    const avatarEl = document.querySelector(".sidebar-avatar");

    if (nameEl) nameEl.textContent = name;
    if (roleEl) roleEl.textContent = role;
    if (avatarEl && name) {
        avatarEl.textContent = name.charAt(0).toUpperCase();
    }
}

/* ==========================================================================
   RESUME FILE UPLOADER (INDEXEDDB CONNECTED)
   ========================================================================== */
function initResumeUploader() {
    const uploadZone = document.getElementById("uploadZone");
    const fileInput = document.getElementById("resumeFileInput");

    if (uploadZone && fileInput) {
        // Trigger file input click
        uploadZone.addEventListener("click", () => {
            fileInput.click();
        });

        // Drag events
        uploadZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            uploadZone.classList.add("dragover");
        });

        uploadZone.addEventListener("dragleave", () => {
            uploadZone.classList.remove("dragover");
        });

        uploadZone.addEventListener("drop", (e) => {
            e.preventDefault();
            uploadZone.classList.remove("dragover");
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                processAndUploadFile(files[0]);
            }
        });

        // File select change
        fileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                processAndUploadFile(e.target.files[0]);
            }
        });
    }

    renderResumeStatus();
}

async function processAndUploadFile(file) {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    if (!allowedTypes.includes(file.type)) {
        showToast("Invalid format. Please upload PDF or DOC/DOCX files.", "danger");
        return;
    }

    // Limit to 4MB
    if (file.size > 4 * 1024 * 1024) {
        showToast("File size too large. Limit is 4MB.", "danger");
        return;
    }

    showToast("Processing resume upload...", "success");

    try {
        if (typeof saveResume === "function") {
            // Save file Blob directly inside IndexedDB (from db.js)
            await saveResume(file, file.name, file.type);
            showToast("Resume uploaded and stored successfully!", "success");
            renderResumeStatus();
        } else {
            showToast("Database system not loaded properly.", "danger");
        }
    } catch(e) {
        console.error(e);
        showToast("Upload failed: " + e, "danger");
    }
}

async function renderResumeStatus() {
    const container = document.getElementById("fileStatusContainer");
    if (!container) return;

    try {
        if (typeof getResume === "function") {
            const activeFile = await getResume();

            if (activeFile) {
                const sizeKb = Math.round(activeFile.data.size / 1024);
                const uploadDate = new Date(activeFile.uploadedAt).toLocaleDateString();

                container.innerHTML = `
                    <div class="file-status-card">
                        <div class="file-status-info">
                            <span class="file-status-icon">📄</span>
                            <div class="file-status-details">
                                <span class="file-status-name">${activeFile.name}</span>
                                <span class="file-status-size">${sizeKb} KB | Uploaded on ${uploadDate}</span>
                            </div>
                        </div>
                        <button class="inbox-btn inbox-btn-delete" id="deleteResumeBtn">Delete</button>
                    </div>
                `;

                // Wire up delete button
                const delBtn = document.getElementById("deleteResumeBtn");
                if (delBtn) {
                    delBtn.addEventListener("click", async () => {
                        if (confirm("Are you sure you want to delete your custom resume?")) {
                            await deleteResume();
                            showToast("Custom resume deleted. Fallback active.", "success");
                            renderResumeStatus();
                        }
                    });
                }
            } else {
                container.innerHTML = `
                    <div class="no-data-state">No custom resume uploaded. The system is serving the dynamic fallback resume file.</div>
                `;
            }
        }
    } catch (e) {
        container.innerHTML = `<div class="no-data-state" style="color: var(--danger);">Database system unavailable.</div>`;
    }
}

/* ==========================================================================
   CONTACT INBOX
   ========================================================================== */
function getInbox() {
    try {
        return JSON.parse(localStorage.getItem("portfolio_inbox") || "[]");
    } catch(e) {
        return [];
    }
}

function saveInbox(inbox) {
    localStorage.setItem("portfolio_inbox", JSON.stringify(inbox));
}

function renderInbox() {
    const tableBody = document.getElementById("inboxTableBody");
    if (!tableBody) return;

    const inbox = getInbox();

    if (inbox.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="no-data-state">No inquiries received yet. Submit messages via the contact form.</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = ""; // Clear existing

    inbox.forEach(msg => {
        const tr = document.createElement("tr");
        if (msg.unread) tr.className = "unread";

        const formattedDate = new Date(msg.timestamp).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        tr.innerHTML = `
            <td>
                <span class="status-badge ${msg.unread ? 'status-unread' : 'status-read'}">
                    ${msg.unread ? 'New' : 'Read'}
                </span>
            </td>
            <td>${msg.name}</td>
            <td>
                <div style="font-weight: 600; color: var(--text-primary);">${msg.subject}</div>
                <div class="message-preview">${msg.message}</div>
            </td>
            <td>${formattedDate}</td>
            <td>
                <div class="inbox-actions">
                    <button class="inbox-btn inbox-btn-read" data-view="${msg.id}">View</button>
                    <button class="inbox-btn inbox-btn-delete" data-delete="${msg.id}">Delete</button>
                </div>
            </td>
        `;

        tableBody.appendChild(tr);
    });

    // Wire up events
    tableBody.querySelectorAll("[data-view]").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-view");
            viewMessageDetails(id);
        });
    });

    tableBody.querySelectorAll("[data-delete]").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-delete");
            deleteMessage(id);
        });
    });
}

function viewMessageDetails(id) {
    const inbox = getInbox();
    const messageIndex = inbox.findIndex(m => m.id === id);

    if (messageIndex === -1) return;

    const msg = inbox[messageIndex];
    
    // Mark as Read
    if (msg.unread) {
        inbox[messageIndex].unread = false;
        saveInbox(inbox);
        renderInbox();
    }

    // Populate Modal Content
    const modalTitle = document.getElementById("messageModalTitle");
    const modalBody = document.getElementById("messageModalBody");

    if (modalTitle && modalBody) {
        modalTitle.textContent = `Inquiry: ${msg.subject}`;
        
        const dateStr = new Date(msg.timestamp).toLocaleString();
        
        modalBody.innerHTML = `
            <div class="message-modal-content">
                <div class="modal-meta-grid">
                    <div><strong>From:</strong> ${msg.name}</div>
                    <div><strong>Email:</strong> <a href="mailto:${msg.email}" style="color: var(--primary); font-weight: 500;">${msg.email}</a></div>
                    <div><strong>Received:</strong> ${dateStr}</div>
                </div>
                <div class="modal-message-body">${msg.message}</div>
                <div class="form-group" style="margin-top: 10px;">
                    <label for="replyText">Compose Reply:</label>
                    <textarea class="form-control" id="replyText" placeholder="Type your response to ${msg.name} here..."></textarea>
                </div>
            </div>
        `;

        // Open Modal
        const modal = document.getElementById("messageDetailModal");
        if (modal) {
            modal.classList.add("active");

            // Close Modal bindings
            const closeBtn = modal.querySelector(".modal-close");
            const cancelBtn = modal.querySelector("#closeModalBtn");
            const sendBtn = modal.querySelector("#sendReplyBtn");

            const closeModal = () => modal.classList.remove("active");
            closeBtn.onclick = closeModal;
            cancelBtn.onclick = closeModal;

            sendBtn.onclick = () => {
                const reply = document.getElementById("replyText").value.trim();
                if (!reply) {
                    showToast("Please enter a reply", "danger");
                    return;
                }
                
                // Trigger mail client or simulate sending
                showToast(`Reply drafted for ${msg.name}! Redirecting...`, "success");
                closeModal();
                setTimeout(() => {
                    window.location.href = `mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(reply)}`;
                }, 1000);
            };
        }
    }
}

function deleteMessage(id) {
    if (confirm("Are you sure you want to delete this message?")) {
        let inbox = getInbox();
        inbox = inbox.filter(msg => msg.id !== id);
        saveInbox(inbox);
        renderInbox();
        showToast("Message deleted successfully.", "success");
    }
}

/* ==========================================================================
   TOAST FLOATING NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = "success") {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.className = `toast show`;
    if (type === "danger") toast.style.borderLeftColor = "var(--danger)";
    else toast.style.borderLeftColor = "var(--success)";

    toast.innerHTML = `
        <span>${type === "success" ? "✅" : "⚠️"}</span>
        <span style="font-weight: 500;">${message}</span>
    `;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}
