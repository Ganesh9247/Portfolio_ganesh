/**
 * Main Application Logic - Public Portfolio
 */

// Default Profile Data populated from Ganesh's resume
const DEFAULT_PROFILE = {
    name: "GANESH PRASAD CHILLAPALLI",
    role: "Java Full Stack Developer",
    email: "Chillapallirajababu620@gmail.com",
    phone: "7013350830",
    location: "Mangalagiri, Andhra Pradesh, India",
    linkedin: "https://www.linkedin.com/in/ganesh-chillapalli",
    github: "https://github.com/Ganesh9247",
    summary: "Aspiring Java Full Stack Developer with basic foundational knowledge in Java, Spring Boot, HTML, CSS, and React. Recently completed hands-on training and academic projects focused on building responsive web applications and RESTful APIs. Quick learner with a passion for clean code, problem solving, and collaborative development in agile environments.",
    aboutStats: {
        gpa: "8.0",
        projects: "3+",
        certificates: "6",
        experience: "Trainee"
    }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadProfileData();
    initNavbarScroll();
    initMobileMenu();
    initSkillBars();
    initCertFilters();
    initContactForm();
    initResumeDownload();
    trackPageView();
});

/* ==========================================================================
   THEME MANAGER
   ========================================================================== */
function initTheme() {
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark-mode";
    const body = document.body;
    
    // Apply saved theme
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(savedTheme);

    // Update toggle icons
    updateThemeIcons(savedTheme);

    // Handle Theme Switch Action
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = body.classList.contains("dark-mode") ? "dark-mode" : "light-mode";
            const newTheme = currentTheme === "dark-mode" ? "light-mode" : "dark-mode";
            
            body.classList.remove(currentTheme);
            body.classList.add(newTheme);
            localStorage.setItem("portfolio_theme", newTheme);
            updateThemeIcons(newTheme);
        });
    }
}

function updateThemeIcons(theme) {
    const icon = document.querySelector("#theme-toggle span");
    if (icon) {
        icon.textContent = theme === "dark-mode" ? "☀️" : "🌙";
    }
}

/* ==========================================================================
   PROFILE STATE SYNCHRONIZER
   ========================================================================== */
function loadProfileData() {
    let profile = localStorage.getItem("portfolio_profile");
    if (!profile) {
        profile = JSON.stringify(DEFAULT_PROFILE);
        localStorage.setItem("portfolio_profile", profile);
    }
    const data = JSON.parse(profile);

    // Dynamic replacement in DOM elements with [data-field] attribute
    document.querySelectorAll("[data-field]").forEach(element => {
        const field = element.getAttribute("data-field");
        if (data[field]) {
            if (element.tagName === "A" && field === "email") {
                element.href = `mailto:${data[field]}`;
                element.textContent = data[field];
            } else if (element.tagName === "A" && field === "phone") {
                element.href = `tel:${data[field]}`;
                element.textContent = data[field];
            } else if (element.tagName === "A" && (field === "linkedin" || field === "github")) {
                element.href = data[field];
            } else {
                element.textContent = data[field];
            }
        }
    });

    // Load stats in about section
    if (data.aboutStats) {
        for (const [statKey, statVal] of Object.entries(data.aboutStats)) {
            const el = document.getElementById(`stat-${statKey}`);
            if (el) el.textContent = statVal;
        }
    }
}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function initNavbarScroll() {
    const headerNav = document.querySelector(".header-nav");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        // Sticky Header effect
        if (scrollY > 50) {
            headerNav.classList.add("scrolled");
        } else {
            headerNav.classList.remove("scrolled");
        }

        // Active section indicator
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            
            // Toggle hamburger icon animation
            const spans = menuToggle.querySelectorAll("span");
            if (navMenu.classList.contains("active")) {
                spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
            } else {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const spans = menuToggle.querySelectorAll("span");
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove("active");
                const spans = menuToggle.querySelectorAll("span");
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });
    }
}

/* ==========================================================================
   SKILLS LEVEL PROGRESS ANIMATION
   ========================================================================== */
function initSkillBars() {
    const skillsSection = document.getElementById("skills");
    const progressBars = document.querySelectorAll(".skill-progress-bar");

    if (skillsSection && progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const level = bar.getAttribute("data-level");
                        bar.style.width = level;
                    });
                    // Unobserve after animating once
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(skillsSection);
    }
}

/* ==========================================================================
   CERTIFICATES SEARCH FILTER
   ========================================================================== */
function initCertFilters() {
    const filterButtons = document.querySelectorAll(".skill-tab-btn");
    const certCards = document.querySelectorAll(".cert-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Toggle active state
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            certCards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    card.parentElement.style.display = "block";
                } else {
                    card.parentElement.style.display = "none";
                }
            });
        });
    });
}

/* ==========================================================================
   CONTACT FORM SUBMISSIONS (SAVE TO LOCAL STORAGE INBOX)
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const subject = document.getElementById("contactSubject").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            if (!name || !email || !subject || !message) {
                showToast("Please fill in all fields", "danger");
                return;
            }

            // Create message object
            const newMessage = {
                id: 'msg_' + Date.now(),
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString(),
                unread: true
            };

            // Retrieve current inbox
            let inbox = [];
            try {
                inbox = JSON.parse(localStorage.getItem("portfolio_inbox") || "[]");
            } catch(e) {
                inbox = [];
            }

            // Add new message
            inbox.unshift(newMessage);
            localStorage.setItem("portfolio_inbox", JSON.stringify(inbox));

            // Increment mock contact count
            let stats = getStats();
            stats.contacts = (stats.contacts || 0) + 1;
            saveStats(stats);

            // UI feedback
            showToast("Message sent! Ganesh will get back to you shortly.", "success");
            contactForm.reset();
        });
    }
}

/* ==========================================================================
   RESUME DOWNLOAD SYSTEM
   ========================================================================== */
function initResumeDownload() {
    const downloadBtns = document.querySelectorAll(".download-resume-btn");

    downloadBtns.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();

            btn.style.opacity = "0.7";
            btn.innerHTML = `<span>⏳ Processing...</span>`;

            try {
                // Attempt to fetch custom uploaded resume from IndexedDB (globally available via db.js)
                if (typeof getResume === "function") {
                    const customResume = await getResume();

                    if (customResume && customResume.data) {
                        const fileBlob = customResume.data;
                        const fileName = customResume.name;
                        
                        // Create download link
                        const downloadUrl = URL.createObjectURL(fileBlob);
                        const downloadAnchor = document.createElement("a");
                        downloadAnchor.href = downloadUrl;
                        downloadAnchor.download = fileName;
                        
                        document.body.appendChild(downloadAnchor);
                        downloadAnchor.click();
                        
                        document.body.removeChild(downloadAnchor);
                        URL.revokeObjectURL(downloadUrl);

                        incrementDownloadCounter();
                        showToast("Downloading resume...", "success");
                        resetDownloadButton(btn);
                        return;
                    }
                }
            } catch (err) {
                console.warn("IndexedDB fetch failed, falling back to dynamically generated resume.", err);
            }

            // Fallback: Dynamically generate an elegant printable Text-based resume file
            generateAndDownloadTextResume();
            incrementDownloadCounter();
            showToast("Downloading generated resume...", "success");
            resetDownloadButton(btn);
        });
    });
}

function resetDownloadButton(btn) {
    btn.style.opacity = "1";
    btn.innerHTML = `<span>📄 Download Resume</span>`;
}

function incrementDownloadCounter() {
    let stats = getStats();
    stats.downloads = (stats.downloads || 0) + 1;
    saveStats(stats);
}

/**
 * Creates a clean, detailed text representation of Ganesh's resume as a download fallback.
 */
function generateAndDownloadTextResume() {
    const profile = JSON.parse(localStorage.getItem("portfolio_profile") || JSON.stringify(DEFAULT_PROFILE));
    
    const resumeText = `====================================================================
GANESH PRASAD CHILLAPALLI - Java Full Stack Developer
====================================================================
Contact Info:
📧 Email: ${profile.email}
📞 Phone: ${profile.phone}
📍 Location: ${profile.location}
🔗 LinkedIn: ${profile.linkedin}
🔗 GitHub: ${profile.github}

--------------------------------------------------------------------
SUMMARY
--------------------------------------------------------------------
${profile.summary}

--------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------
* Bachelors of Technology (CSE) | CGPA: 8.0/10 | Period: 2021-2025
  MVR College of Engineering and Technology, Paritala, AP
  
* Board of Intermediate Education (MPC) | CGPA: 82.6% | Period: 2019-2021
  Narayana Junior College, Mangalagiri, AP

* Board of Secondary Education | CGPA: 9.2/10 | Year: 2018-2019
  Narayana English Medium School, Mangalagiri, AP

--------------------------------------------------------------------
SKILLS MATRIX
--------------------------------------------------------------------
* Languages: Java, HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React.js, Node.js, Express.js, C, Python
* Databases: MySQL, MongoDB, PostgreSQL
* Frameworks: Spring Boot, Spring Data JPA, Spring Security, Hibernate, Spring MVC, Node.js, Next.js, Redux
* APIs: RESTful APIs, SOAP, GraphQL, Postman API Testing
* Version Control: Git, GitHub
* Cloud & Deployment: AWS, Vercel, Netlify, Render

--------------------------------------------------------------------
PROFESSIONAL EXPERIENCE & INTERNSHIPS
--------------------------------------------------------------------
* Trainee - Java Full Stack | Codegnan, Vijayawada
* Intern - Cloud & DevOps Engineer | Data Valley, Vijayawada
* Intern - Web Development & Full Stack (Remote) | International Institute of Digital Technologies (IIDT_Black Buck)
  
  Details & Accomplishments:
  - Designed and developed enterprise backend services using Java, Spring Boot following MVC architecture.
  - Built robust JSON REST APIs and integrated SQL databases with optimized queries.
  - Implemented client features using React.js frontend structures.
  - Applied OOP principles and clean-code practices within Agile workflows.

--------------------------------------------------------------------
KEY COMPLETED PROJECTS
--------------------------------------------------------------------
1. A 3D Model Generator for Construction Designs
   - Tech: React.js, Node.js, MySQL
   - Devised api-driven system for real-time visualization and analytics of construction data.
   - Demo Link: https://track3dai.netlify.app/
   - GitHub: https://github.com/Ganesh9247/track3dai

2. Employee Management System (EMS)
   - Tech: Java, Spring Boot, REST API, Maven, MySQL, Git, Postman
   - Built layered MVC (Controller-Service-Repository) structure, testing CRUD actions completely with Postman.
   - GitHub: https://github.com/Ganesh9247/ems_EmployeeManagementSystem_2026

3. Toyota Clone Website
   - Tech: HTML, CSS, MySQL
   - Created clean, highly responsive layout mimicking Toyota's page hierarchy.
   - Demo Link: https://toyota-com-ten.vercel.app/

--------------------------------------------------------------------
CERTIFICATIONS
--------------------------------------------------------------------
* Codegnan: Java Full Stack Trainee Certificate
* ExcelR: Data Science and Machine Learning Certificate
* Technologies: Python Developer Certificate
* Airbaclabs: Artificial Intelligence Training
* Data Valley: AWS Cloud Computing & DevOps Technology

====================================================================
Generated via Ganesh Prasad's Live Developer Dashboard Portfolio
====================================================================`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = "Ganesh_Prasad_Chillapalli_Resume.txt";
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(blobUrl);
}

/* ==========================================================================
   ANALYTICS SYSTEM (MOCKING DATABASE BEHAVIOURS)
   ========================================================================== */
function getStats() {
    let stats = { views: 120, downloads: 42, contacts: 5 };
    try {
        const savedStats = localStorage.getItem("portfolio_analytics");
        if (savedStats) stats = JSON.parse(savedStats);
    } catch(e) {
        console.warn("Could not load stats, using defaults");
    }
    return stats;
}

function saveStats(stats) {
    localStorage.setItem("portfolio_analytics", JSON.stringify(stats));
}

function trackPageView() {
    let stats = getStats();
    stats.views = (stats.views || 0) + 1;
    saveStats(stats);
}

/* ==========================================================================
   TOAST FLOATING NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = "success") {
    let toast = document.getElementById("toast");
    if (!toast) {
        // Create dynamically if it doesn't exist
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
