/**
 * Interactive Certificates & Achievements Manager
 * Handles search, filters, animations, lightbox displays, zoom support, and original file render
 */

// 1. Certificates Database mapping to single-page PDF documents and PNG thumbnails
const CERTIFICATES_DATA = [
    {
        id: "cert-01",
        title: "Web Development Course Completion",
        org: "EdiGlobe",
        category: "Web Development",
        categoryKey: "web-development",
        year: 2025,
        credentialId: "EGCC0450",
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"],
        link: "https://github.com/Ganesh9247/Weather_Application",
        fileUrl: "certificates/page-1.pdf",
        thumbnailUrl: "certificates/page-1.png",
        description: "Comprehensive course completion certificate covering standard frontend systems, DOM API manipulation, and deployment pipelines."
    },
    {
        id: "cert-02",
        title: "Java Internship",
        org: "EdiGlobe",
        category: "Internship",
        categoryKey: "internship",
        year: 2025,
        credentialId: "EGICZ0354",
        skills: ["Java SE", "OOPs", "Multithreading", "JDBC", "SQL"],
        link: "https://github.com/Ganesh9247",
        fileUrl: "certificates/page-3.pdf",
        thumbnailUrl: "certificates/page-3.png",
        description: "Hands-on internship working on object-oriented application development, database connector adapters, and Java thread controllers."
    },
    {
        id: "cert-03",
        title: "Project Completion Certificate",
        org: "EdiGlobe",
        category: "Project Achievement",
        categoryKey: "project",
        year: 2025,
        credentialId: "EGPC0560",
        skills: ["Full Stack", "System Design", "Testing", "Deployment"],
        link: "https://github.com/Ganesh9247/ems_EmployeeManagementSystem_2026",
        fileUrl: "certificates/page-4.pdf",
        thumbnailUrl: "certificates/page-4.png",
        description: "Awarded for designing and delivering end-to-end applications mapping backends to client dashboards."
    },
    {
        id: "cert-04",
        title: "Cloud Engineering & DevOps Internship",
        org: "APSCHE + Datavalley",
        category: "Cloud & DevOps",
        categoryKey: "cloud-devops",
        year: 2024,
        credentialId: "AP-DV-CLD-2024-8172",
        skills: ["AWS", "EC2", "S3", "RDS", "VPC Security", "DevOps"],
        link: "https://track3dai.netlify.app/",
        fileUrl: "certificates/page-5.pdf",
        thumbnailUrl: "certificates/page-5.png",
        description: "Specialized government-backed cloud internship. Deployed computing nodes, scalable RDS databases, and static asset buckets on AWS."
    },
    {
        id: "cert-05",
        title: "Web Development Internship",
        org: "Octanet Services Pvt Ltd",
        category: "Internship",
        categoryKey: "internship",
        year: 2024,
        credentialId: "07-2024-44952",
        skills: ["HTML", "CSS", "JavaScript", "User Experience", "Bootstrap"],
        link: "https://reliable-daifuku-2bed8b.netlify.app/",
        fileUrl: "certificates/page-6.pdf",
        thumbnailUrl: "certificates/page-6.png",
        description: "Frontend-focused internship developing responsive website layouts, interactive modules, and browser user experiences."
    },
    {
        id: "cert-06",
        title: "Full Stack Development Internship",
        org: "APSCHE + Blackbuck Engineers",
        category: "Full Stack",
        categoryKey: "full-stack",
        year: 2024,
        credentialId: "BBAPSCHDEIIDT2024PART003431",
        skills: ["React.js", "Node.js", "Express", "REST APIs", "MySQL"],
        link: "https://github.com/Ganesh9247",
        fileUrl: "certificates/page-7.pdf",
        thumbnailUrl: "certificates/page-7.png",
        description: "Full-stack project building. Integrated React.js dashboards with server architectures and database schemas."
    },
    {
        id: "cert-07",
        title: "Data Science & Machine Learning Internship",
        org: "APSCHE + ExcelR",
        category: "AI / Machine Learning",
        categoryKey: "ai-ml",
        year: 2024,
        credentialId: "EXCELR-83288",
        skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Data Viz"],
        link: "https://github.com/Ganesh9247",
        fileUrl: "certificates/page-8.pdf",
        thumbnailUrl: "certificates/page-8.png",
        description: "Data analysis traineeship covering data Wrangling, exploratory data analysis, and predictive model fitting."
    },
    {
        id: "cert-08",
        title: "TCS iON Interview Skills",
        org: "Tata Consultancy Services",
        category: "Soft Skills",
        categoryKey: "soft-skills",
        year: 2024,
        credentialId: "66789-26822740-1016",
        skills: ["Communication", "Interview Prep", "Resume Building", "Business Etiquette"],
        link: "https://www.tcsion.com/",
        fileUrl: "certificates/page-9.pdf",
        thumbnailUrl: "certificates/page-9.png",
        description: "Accredited workshop on corporate communications, mock interview sessions, and behavioral professional patterns."
    },
    {
        id: "cert-09",
        title: "Full Stack Java Internship",
        org: "APSCHE + ExcelR",
        category: "Full Stack Java",
        categoryKey: "fullstack-java",
        year: 2025,
        credentialId: "EXCELR-W-195653",
        skills: ["Java SE", "Spring Boot", "Hibernate", "JPA", "MySQL", "React"],
        link: "https://github.com/Ganesh9247/ems_EmployeeManagementSystem_2026",
        fileUrl: "certificates/page-10.pdf",
        thumbnailUrl: "certificates/page-10.png",
        description: "State-sponsored enterprise Java development pipeline, linking Spring Boot APIs with interactive client applications."
    },
    {
        id: "cert-10",
        title: "MERN Stack Workshop",
        org: "Codegnan",
        category: "MERN Stack",
        categoryKey: "mern-stack",
        year: 2026,
        credentialId: "CG_MERN Stack _May_1675",
        skills: ["MongoDB", "Express.js", "React.js", "Node.js", "JSON Tokens"],
        link: "https://github.com/Ganesh9247",
        fileUrl: "certificates/page-11.pdf",
        thumbnailUrl: "certificates/page-11.png",
        description: "Advanced hands-on workshop focused on building real-time databases and secured router links in node environments."
    },
    {
        id: "cert-11",
        title: "Artificial Intelligence Workshop",
        org: "Airbaclabs",
        category: "Artificial Intelligence",
        categoryKey: "artificial-intelligence",
        year: 2022,
        credentialId: "ABL-AI-2022-7711",
        skills: ["AI Foundations", "Machine Learning", "Neural Nets", "Python"],
        link: "https://github.com/Ganesh9247",
        fileUrl: "certificates/ACE-Scanner.pdf",
        thumbnailUrl: "certificates/ACE-Scanner.png",
        description: "Introductory workshop covering artificial intelligence architectures, training models, and basic machine learning formulas."
    },
    {
        id: "cert-12",
        title: "Hackathon Participation",
        org: "Codegnan",
        category: "Hackathon",
        categoryKey: "hackathon",
        year: 2025,
        credentialId: "CGN-HACK-2025-404",
        skills: ["Agile Development", "Rapid Prototyping", "Teamwork", "Problem Solving"],
        link: "https://github.com/Ganesh9247",
        fileUrl: "certificates/Hackathon_codegnan_Certificate.pdf",
        thumbnailUrl: "certificates/Hackathon_codegnan_Certificate.png",
        description: "Active hackathon code sprinter. Designed and pitched functional prototypes under strict time limits with team members."
    },
    {
        id: "cert-13",
        title: "Java Full Stack Training Completion",
        org: "Codegnan IT Solutions",
        category: "Full Stack Java",
        categoryKey: "fullstack-java",
        year: 2025,
        credentialId: "CGN-DIP-FSJ-2025-08",
        skills: ["Java", "MySQL", "JSP", "Servlets", "Spring", "Spring Boot", "Hibernate", "HTML", "CSS", "JavaScript", "AWS"],
        link: "https://github.com/Ganesh9247",
        fileUrl: "certificates/page-12.pdf",
        thumbnailUrl: "certificates/page-12.png",
        description: "Professional Diploma course in Java Full Stack technologies. Formed enterprise-grade systems with robust backends and AWS nodes."
    }
];

// 2. Initializer on Load
document.addEventListener("DOMContentLoaded", () => {
    initCertificatesSection();
    generateParticles();
});

function initCertificatesSection() {
    const grid = document.getElementById("certsGrid");
    const searchInput = document.getElementById("certsSearch");
    const categorySelect = document.getElementById("certsCategory");
    const yearSelect = document.getElementById("certsYear");
    const sortSelect = document.getElementById("certsSort");
    
    // Lightbox Binds
    const lightbox = document.getElementById("certLightbox");
    const lightboxClose = document.getElementById("certLightboxClose");
    const lightboxFullscreen = document.getElementById("certLightboxFullscreen");
    
    if (!grid) return;

    // A. Bind Filters listeners
    searchInput.addEventListener("input", triggerFilterPipeline);
    categorySelect.addEventListener("change", triggerFilterPipeline);
    yearSelect.addEventListener("change", triggerFilterPipeline);
    sortSelect.addEventListener("change", triggerFilterPipeline);

    // B. Lightbox control events
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxFullscreen.addEventListener("click", toggleLightboxFullscreen);
    
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // C. Trigger initial render
    executeRender(CERTIFICATES_DATA);
    animateStatsCounters();

    // D. Filter Pipeline Wrapper
    function triggerFilterPipeline() {
        // Show loading skeleton simulation
        showLoadingSkeleton();

        setTimeout(() => {
            const query = searchInput.value.trim().toLowerCase();
            const category = categorySelect.value;
            const year = yearSelect.value;
            const sort = sortSelect.value;

            let filtered = CERTIFICATES_DATA.filter(item => {
                // Search check
                const matchSearch = item.title.toLowerCase().includes(query) || 
                                    item.org.toLowerCase().includes(query) || 
                                    item.skills.some(skill => skill.toLowerCase().includes(query));
                
                // Category check
                const matchCategory = (category === "all") || (item.categoryKey === category);
                
                // Year check
                const matchYear = (year === "all") || (item.year.toString() === year);

                return matchSearch && matchCategory && matchYear;
            });

            // Sorting
            if (sort === "newest") {
                filtered.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
            } else {
                filtered.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
            }

            executeRender(filtered);
        }, 300);
    }
}

// Helper to check if file exists on server
async function checkFileExists(url) {
    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    } catch (err) {
        return false;
    }
}

// 3. Render function
function executeRender(list) {
    const grid = document.getElementById("certsGrid");
    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="certs-empty-state">
                <i data-lucide="search-slash" style="width: 48px; height: 48px; color: var(--text-muted);"></i>
                <h3>No Certificates Found</h3>
                <p>Try clearing your filters or adjusting search phrases.</p>
            </div>
        `;
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
        return;
    }

    list.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "cert-premium-card";
        card.setAttribute("data-id", item.id);
        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";

        // Category icon lookup
        let categoryIcon = "award";
        if (item.categoryKey.includes("internship")) categoryIcon = "briefcase";
        if (item.categoryKey.includes("cloud")) categoryIcon = "cloud";
        if (item.categoryKey.includes("fullstack") || item.categoryKey.includes("web")) categoryIcon = "code";
        if (item.categoryKey.includes("ai") || item.categoryKey.includes("ml")) categoryIcon = "cpu";
        if (item.categoryKey.includes("hackathon")) categoryIcon = "trophy";
        if (item.categoryKey.includes("workshop") || item.categoryKey.includes("mern")) categoryIcon = "terminal";

        // Generate skills HTML capsules
        const skillsHtml = item.skills.slice(0, 3).map(skill => `<span class="cert-card-skill-tag">${skill}</span>`).join("");
        const skillsOverflow = item.skills.length > 3 ? `<span class="cert-card-skill-tag">+${item.skills.length - 3}</span>` : "";
        
        card.innerHTML = `
            <div class="cert-card-category-tag">
                <i data-lucide="${categoryIcon}" style="width: 13px; height: 13px;"></i>
                <span>${item.category}</span>
            </div>
            
            <div class="cert-card-preview">
                <div class="cert-card-preview-mesh"></div>
                <!-- Render original PNG thumbnail directly, fallback to empty layout if missing -->
                <img src="${item.thumbnailUrl}" alt="${item.title}" class="cert-img-preview" loading="lazy" onerror="handleImageError(this)">
                <div class="cert-card-fallback-preview" style="display:none;">
                    <i data-lucide="file-text" style="width: 32px; height: 32px; color: var(--primary);"></i>
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; margin-top: 6px;">Original Document</span>
                </div>
            </div>
            
            <div class="cert-card-body">
                <h4 class="cert-card-title">${item.title}</h4>
                
                <div class="cert-card-meta-row">
                    <span class="cert-card-org">
                        <span class="cert-card-org-logo">${item.org.charAt(0)}</span>
                        ${item.org}
                    </span>
                    <span class="cert-card-date">${item.year}</span>
                </div>
                
                <div class="cert-card-skills">
                    ${skillsHtml}
                    ${skillsOverflow}
                </div>
                
                <div class="cert-card-actions">
                    <button class="cert-btn-view btn-view-details" title="View Details & Download">
                        <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                        <span>View Details</span>
                    </button>
                    <button class="cert-btn-view btn-view-original" style="flex-grow: 1;" title="Open Original Uploaded File">
                        <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
                        <span>View Original</span>
                    </button>
                    <button class="cert-btn-download btn-view-download" title="Download PDF Certificate">
                        <i data-lucide="download" style="width: 15px; height: 15px;"></i>
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);

        // Bind interactive event listeners in JS to avoid inline scope blockages
        const viewDetailsBtn = card.querySelector(".btn-view-details");
        viewDetailsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openCertLightbox(item.id);
        });

        const viewOriginalBtn = card.querySelector(".btn-view-original");
        viewOriginalBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const exists = await checkFileExists(item.fileUrl);
            if (exists) {
                window.open(item.fileUrl, "_blank");
            } else {
                if (typeof showToast === "function") {
                    showToast(`Original file not found: Please place '${item.fileUrl.split('/').pop()}' in certificates/`, "warning");
                } else {
                    alert(`Original file not found: Please place '${item.fileUrl.split('/').pop()}' in certificates/`);
                }
            }
        });

        const downloadBtn = card.querySelector(".btn-view-download");
        downloadBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const exists = await checkFileExists(item.fileUrl);
            if (exists) {
                downloadSingleCertPDF(item.id);
            } else {
                // If original file is not found, fallback to compiled landscape PDF!
                if (typeof showToast === "function") {
                    showToast("Original file not found. Compiling fallback PDF document...", "warning");
                }
                executeFallbackPDFDownload(item);
            }
        });

        // Bind interactive mouse gradient movement
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });

        // Trigger staggered reveal
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 80);
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

// Fallback error handler for missing image files
function handleImageError(imgElement) {
    imgElement.style.display = "none";
    if (imgElement.nextElementSibling) {
        imgElement.nextElementSibling.style.display = "flex";
    }
}
window.handleImageError = handleImageError;

// 4. Loading skeleton simulation
function showLoadingSkeleton() {
    const grid = document.getElementById("certsGrid");
    grid.innerHTML = "";
    
    for (let i = 0; i < 3; i++) {
        const skeleton = document.createElement("div");
        skeleton.className = "cert-skeleton-card";
        skeleton.innerHTML = `
            <div class="skeleton-anim skeleton-preview"></div>
            <div class="skeleton-anim skeleton-title" style="margin-top: 10px;"></div>
            <div class="skeleton-anim skeleton-meta"></div>
            <div class="skeleton-tags" style="margin-top: 10px;">
                <div class="skeleton-anim skeleton-tag-item"></div>
                <div class="skeleton-anim skeleton-tag-item"></div>
                <div class="skeleton-anim skeleton-tag-item"></div>
            </div>
            <div class="skeleton-anim skeleton-btn" style="margin-top: auto;"></div>
        `;
        grid.appendChild(skeleton);
    }
}

// 5. Stat Counter Animations
function animateStatsCounters() {
    // Computations
    const total = CERTIFICATES_DATA.length;
    const internships = CERTIFICATES_DATA.filter(c => c.categoryKey.includes("internship") || c.title.toLowerCase().includes("intern")).length;
    const workshops = CERTIFICATES_DATA.filter(c => c.categoryKey.includes("workshop") || c.title.toLowerCase().includes("workshop")).length;
    const hackathons = CERTIFICATES_DATA.filter(c => c.categoryKey.includes("hackathon")).length;

    runCountUp("statTotal", total, 1500);
    runCountUp("statInterns", internships, 1500);
    runCountUp("statWorkshops", workshops, 1500);
    runCountUp("statHackathons", hackathons, 1500);
}

function runCountUp(elementId, target, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
        start += 1;
        element.textContent = start;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, stepTime || 50);
}

// 6. Lightbox modal operations with custom image zoom or native PDF iframe rendering
let activeCert = null;
let currentZoom = 1;

function openCertLightbox(id) {
    const cert = CERTIFICATES_DATA.find(c => c.id === id);
    if (!cert) return;
    
    activeCert = cert;
    const overlay = document.getElementById("certLightbox");
    
    // Set text elements
    document.getElementById("lightboxCategory").textContent = cert.category;
    document.getElementById("lightboxTitle").textContent = cert.title;
    document.getElementById("lightboxOrg").textContent = cert.org;
    document.getElementById("lightboxYear").textContent = cert.year;
    document.getElementById("lightboxCred").textContent = cert.credentialId;
    document.getElementById("lightboxDesc").textContent = cert.description;

    // Set skills capsules
    const skillsWrapper = document.getElementById("lightboxSkills");
    skillsWrapper.innerHTML = cert.skills.map(skill => `<span class="cert-info-skill-capsule">${skill}</span>`).join("");

    // Set preview mockup panel (Image Zoom or PDF IFrame Viewer)
    const mockupPanel = document.querySelector(".cert-lightbox-mockup-panel");
    mockupPanel.innerHTML = "";
    
    const isPdf = cert.fileUrl.toLowerCase().endsWith(".pdf");
    currentZoom = 1;

    // First, check if the file actually exists
    checkFileExists(cert.fileUrl).then(exists => {
        if (!exists) {
            // Render beautiful warning fallback if file is missing
            mockupPanel.innerHTML = `
                <div class="cert-card-fallback-preview" style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 10px;">
                    <i data-lucide="file-warning" style="width: 48px; height: 48px; color: #f59e0b;"></i>
                    <span style="font-size: 0.88rem; color: #f59e0b; font-weight: 700; text-transform: uppercase; letter-spacing:0.05em;">Original Document Not Uploaded</span>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); max-width: 80%; text-align: center; line-height: 1.4;">Please copy your original file '<strong>${cert.fileUrl.split('/').pop()}</strong>' into the folder: <br><code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.7rem; margin-top: 4px; display:inline-block;">certificates/</code></span>
                </div>
            `;
            if (typeof lucide !== "undefined") lucide.createIcons();
            return;
        }

        if (isPdf) {
            mockupPanel.innerHTML = `
                <iframe src="${cert.fileUrl}" width="100%" height="100%" style="border: none; border-radius: 8px; background: #ffffff;"></iframe>
            `;
        } else {
            mockupPanel.innerHTML = `
                <div class="lightbox-image-zoom-container" style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                    <img id="lightboxZoomImage" src="${cert.fileUrl}" alt="${cert.title}" style="max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); transform-origin: center;" onerror="handleLightboxImageError(this)" />
                    <div class="zoom-controls" style="position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; background: rgba(0,0,0,0.65); padding: 6px 12px; border-radius: 20px; z-index: 5; border: 1px solid rgba(255,255,255,0.08);">
                        <button onclick="zoomImage(1.2)" style="background: none; border: none; color: #fff; cursor: pointer; padding: 4px;" title="Zoom In"><i data-lucide="zoom-in" style="width: 16px; height: 16px;"></i></button>
                        <button onclick="zoomImage(0.8)" style="background: none; border: none; color: #fff; cursor: pointer; padding: 4px;" title="Zoom Out"><i data-lucide="zoom-out" style="width: 16px; height: 16px;"></i></button>
                        <button onclick="resetZoomImage()" style="background: none; border: none; color: #fff; cursor: pointer; padding: 4px;" title="Reset Scale"><i data-lucide="rotate-ccw" style="width: 16px; height: 16px;"></i></button>
                    </div>
                </div>
            `;
            if (typeof lucide !== "undefined") lucide.createIcons();
        }
    });

    // Set view original link dynamically
    const viewLinkBtn = document.getElementById("lightboxViewLink");
    if (viewLinkBtn) {
        // Clone to remove previous event listeners
        const newBtn = viewLinkBtn.cloneNode(true);
        viewLinkBtn.parentNode.replaceChild(newBtn, viewLinkBtn);

        newBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const exists = await checkFileExists(cert.fileUrl);
            if (exists) {
                window.open(cert.fileUrl, "_blank");
            } else {
                if (typeof showToast === "function") {
                    showToast(`Original file not found: Please place '${cert.fileUrl.split('/').pop()}' in certificates/`, "warning");
                } else {
                    alert(`Original file not found: Please place '${cert.fileUrl.split('/').pop()}' in certificates/`);
                }
            }
        });
    }

    // Reset Fullscreen
    overlay.classList.remove("fullscreen");
    
    // Activate overlay
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // lock page scroll
    
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

// Zoom handlers for image lightbox preview
function zoomImage(factor) {
    const img = document.getElementById("lightboxZoomImage");
    if (!img) return;
    currentZoom = Math.min(Math.max(currentZoom * factor, 0.5), 3);
    img.style.transform = `scale(${currentZoom})`;
}

// Reset zoom
function resetZoomImage() {
    const img = document.getElementById("lightboxZoomImage");
    if (!img) return;
    currentZoom = 1;
    img.style.transform = `scale(1)`;
}

function handleLightboxImageError(imgElement) {
    imgElement.style.display = "none";
    const controls = imgElement.nextElementSibling;
    if (controls) controls.style.display = "none";
    const fallback = imgElement.parentElement ? imgElement.parentElement.querySelector(".cert-card-fallback-preview") : null;
    if (fallback) fallback.style.display = "flex";
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

window.zoomImage = zoomImage;
window.resetZoomImage = resetZoomImage;
window.handleLightboxImageError = handleLightboxImageError;

function closeLightbox() {
    const overlay = document.getElementById("certLightbox");
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // unlock page scroll
    activeCert = null;
}

function toggleLightboxFullscreen() {
    const overlay = document.getElementById("certLightbox");
    overlay.classList.toggle("fullscreen");
}

// 7. Dynamic PDF generation and downloads using jsPDF (Fallback compiler)
function downloadSingleCertPDF(id) {
    const cert = CERTIFICATES_DATA.find(c => c.id === id);
    if (!cert) return;
    triggerFileDownload(cert);
}

function downloadActiveCertPDF() {
    if (activeCert) {
        triggerFileDownload(activeCert);
    }
}

async function triggerFileDownload(cert) {
    const exists = await checkFileExists(cert.fileUrl);
    if (exists) {
        const downloadAnchor = document.createElement("a");
        downloadAnchor.href = cert.fileUrl;
        const fileExt = cert.fileUrl.split('.').pop();
        downloadAnchor.download = `${cert.title.replace(/\s+/g, '_')}_Original.${fileExt}`;
        downloadAnchor.target = "_blank";
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
    } else {
        if (typeof showToast === "function") {
            showToast("Original document not found. Compiling fallback PDF document...", "warning");
        }
        executeFallbackPDFDownload(cert);
    }
}

function executeFallbackPDFDownload(cert) {
    // Redundant now that all PDF segments are explicitly partitioned, but preserved for schema stability
    executeFallbackPDFDownload_core(cert);
}

function executeFallbackPDFDownload_core(cert) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });

    // A. Outer Border Styling
    doc.setDrawColor(14, 165, 233);
    doc.setLineWidth(1.2);
    doc.rect(8, 8, 281, 194);

    doc.setDrawColor(139, 92, 246);
    doc.setLineWidth(0.4);
    doc.rect(10, 10, 277, 190);

    // Decorative inner thin lines
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.1);
    doc.rect(12, 12, 273, 186);

    // B. Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(14, 165, 233);
    doc.text(cert.org.toUpperCase(), 148, 26, { align: "center" });

    doc.setFontSize(26);
    doc.setTextColor(15, 23, 42);
    doc.text("CERTIFICATE OF ACHIEVEMENT", 148, 44, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("THIS CERTIFICATE IS PROUDLY CONFERRED UPON", 148, 64, { align: "center" });

    // C. Student Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(15, 23, 42);
    doc.text("Ganesh Prasad Chillapalli", 148, 82, { align: "center" });

    // Divider bar
    doc.setDrawColor(14, 165, 233);
    doc.setLineWidth(0.8);
    doc.line(70, 88, 227, 88);

    // D. Program details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    
    let descriptionText = `for the successful completion of the specialized ${cert.title} program in the ${cert.category} track, issued in the year ${cert.year}.`;
    if (cert.skills && cert.skills.length > 0) {
        descriptionText += ` Demonstrating practical competence in: ${cert.skills.join(', ')}.`;
    }
    
    const splitLines = doc.splitTextToSize(descriptionText, 210);
    doc.text(splitLines, 148, 102, { align: "center" });

    // E. Corporate Signatures & Seals
    // Left Sign
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.line(40, 155, 100, 155);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("AUTHORIZED REPRESENTATIVE", 70, 160, { align: "center" });
    
    doc.setFont("times", "italic");
    doc.setFontSize(14);
    doc.setTextColor(14, 165, 233);
    doc.text(cert.org, 70, 150, { align: "center" });

    // Right Sign
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.line(197, 155, 257, 155);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("ACADEMIC REGISTRAR", 227, 160, { align: "center" });
    
    doc.setFont("times", "italic");
    doc.setFontSize(14);
    doc.setTextColor(139, 92, 246);
    doc.text("G. Prasad", 227, 150, { align: "center" });

    // Golden Seal
    doc.setDrawColor(245, 158, 11);
    doc.setFillColor(251, 191, 36);
    doc.setLineWidth(1);
    doc.circle(148, 145, 12, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(217, 119, 6);
    doc.text("OFFICIAL SEAL", 148, 146, { align: "center" });

    // F. Credential Footnotes
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Credential ID: ${cert.credentialId}`, 148, 178, { align: "center" });
    doc.text(`Verified at: ganesh-portfolio.dev/verify/${cert.id}`, 148, 183, { align: "center" });

    // G. Trigger download anchor
    const fileBase = cert.title.replace(/[^a-zA-Z0-9]/g, "_");
    doc.save(`Ganesh_Chillapalli_${fileBase}_Fallback.pdf`);
}

// 8. Generate background floating particles
function generateParticles() {
    const section = document.getElementById("certifications");
    if (!section) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        particle.className = "cert-particle";
        
        // Random layout
        const left = Math.random() * 100;
        const size = Math.random() * 5 + 2;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        
        particle.style.left = `${left}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        section.appendChild(particle);
    }
}

// 9. Explicitly expose functions to the window object to prevent scope blockage for older inline attributes
window.openCertLightbox = openCertLightbox;
window.closeLightbox = closeLightbox;
window.toggleLightboxFullscreen = toggleLightboxFullscreen;
window.downloadSingleCertPDF = downloadSingleCertPDF;
window.downloadActiveCertPDF = downloadActiveCertPDF;
