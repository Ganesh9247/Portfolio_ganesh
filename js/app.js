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

            // Start sending sequence with visual loader
            const submitBtn = contactForm.querySelector(".submit-btn");
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>⏳ Sending...</span>`;

            // Prep JSON payload for FormSubmit AJAX Endpoint
            const payload = {
                name: name,
                email: email,
                _subject: `Portfolio Message: ${subject}`,
                message: message
            };

            // Retrieve profile data to fetch the active email target
            let profile = { email: "Chillapallirajababu620@gmail.com" };
            try {
                const storedProfile = localStorage.getItem("portfolio_profile");
                if (storedProfile) profile = JSON.parse(storedProfile);
            } catch (err) {
                console.warn("Could not read profile, using default email target.");
            }

            // Send API call directly to Google Email inbox via FormSubmit API
            fetch(`https://formsubmit.co/ajax/${profile.email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(res => {
                if (res.ok) {
                    showToast("Message sent directly to Ganesh's Gmail inbox!", "success");
                } else {
                    throw new Error("API responded with an error");
                }
            })
            .catch(err => {
                console.error("Direct mail API failed, falling back to local storage:", err);
                showToast("Message saved locally to your Admin Dashboard Inbox.", "warning");
            })
            .finally(() => {
                // Ensure message is ALWAYS logged in local storage to preserve Dashboard features
                const newMessage = {
                    id: 'msg_' + Date.now(),
                    name,
                    email,
                    subject,
                    message,
                    timestamp: new Date().toISOString(),
                    unread: true
                };

                let inbox = [];
                try {
                    inbox = JSON.parse(localStorage.getItem("portfolio_inbox") || "[]");
                } catch(e) {
                    inbox = [];
                }

                inbox.unshift(newMessage);
                localStorage.setItem("portfolio_inbox", JSON.stringify(inbox));

                // Update analytics views in localStorage
                let stats = getStats();
                stats.contacts = (stats.contacts || 0) + 1;
                saveStats(stats);

                // Reset submit controls and form elements
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            });
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

            // Fallback: Dynamically generate a premium PDF-based resume file
            generateAndDownloadPDFResume();
            incrementDownloadCounter();
            showToast("Downloading PDF resume...", "success");
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
 * Creates a beautiful, highly structured PDF resume document on the fly using jsPDF.
 */
function generateAndDownloadPDFResume() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const profile = JSON.parse(localStorage.getItem("portfolio_profile") || JSON.stringify(DEFAULT_PROFILE));

    // Styling constants
    const COLOR_PRIMARY = [14, 165, 233];   // Sky Blue
    const COLOR_SECONDARY = [71, 85, 105]; // Slate Gray
    const COLOR_DARK = [15, 23, 42];       // Off Black
    const COLOR_LIGHT = [226, 232, 240];   // Light Slate Gray (lines)

    let y = 20;
    const leftMargin = 15;
    const contentWidth = 180;

    // Helper to verify y boundaries and create a new page if necessary
    function checkPageLimit(neededHeight) {
        if (y + neededHeight > 280) {
            doc.addPage();
            y = 20;
            return true;
        }
        return false;
    }

    // Helper to draw section header
    function drawSectionHeader(title) {
        checkPageLimit(15);
        y += 5;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...COLOR_PRIMARY);
        doc.text(title, leftMargin, y);
        
        y += 2;
        doc.setDrawColor(...COLOR_LIGHT);
        doc.setLineWidth(0.3);
        doc.line(leftMargin, y, leftMargin + contentWidth, y);
        y += 5;
    }

    // ==========================================
    // 1. HEADER SECTION
    // ==========================================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...COLOR_PRIMARY);
    doc.text(profile.name, leftMargin, y);
    
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(...COLOR_SECONDARY);
    doc.text(profile.role, leftMargin, y);

    // Header Metadata Row
    y += 8;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLOR_DARK);
    
    const contactInfo = `Email: ${profile.email}  |  Phone: ${profile.phone}  |  Location: ${profile.location}`;
    doc.text(contactInfo, leftMargin, y);
    
    y += 4;
    const linkInfo = `LinkedIn: linkedin.com/in/ganesh-chillapalli  |  GitHub: github.com/Ganesh9247`;
    doc.text(linkInfo, leftMargin, y);

    y += 4;
    doc.setDrawColor(...COLOR_PRIMARY);
    doc.setLineWidth(0.8);
    doc.line(leftMargin, y, leftMargin + contentWidth, y);
    y += 6;

    // ==========================================
    // 2. PROFILE SUMMARY
    // ==========================================
    drawSectionHeader("SUMMARY");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...COLOR_DARK);
    
    const summaryLines = doc.splitTextToSize(profile.summary, contentWidth);
    doc.text(summaryLines, leftMargin, y);
    y += (summaryLines.length * 4.5);

    // ==========================================
    // 3. EDUCATION
    // ==========================================
    drawSectionHeader("EDUCATION");
    
    const eduList = [
        {
            role: "Bachelors Of Technology (Computer Science & Engineering)",
            inst: "MVR College of Engineering and Technology, Paritala, AP",
            date: "06/2021 – 06/2025",
            desc: "STREAM : CSE | CGPA : 8.0/10"
        },
        {
            role: "Board of Intermediate Education (MPC)",
            inst: "Narayana Junior College, Mangalagiri, AP",
            date: "06/2019 – 05/2021",
            desc: "STREAM : MPC | CGPA : 82.6%"
        },
        {
            role: "Board of Secondary Education (SSC)",
            inst: "Narayana English Medium School, Mangalagiri, AP",
            date: "06/2018",
            desc: "CGPA : 9.2"
        }
    ];

    eduList.forEach(edu => {
        checkPageLimit(15);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(...COLOR_DARK);
        doc.text(edu.role, leftMargin, y);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...COLOR_SECONDARY);
        const dateWidth = doc.getTextWidth(edu.date);
        doc.text(edu.date, leftMargin + contentWidth - dateWidth, y);

        y += 4;
        doc.setFont("helvetica", "oblique");
        doc.setFontSize(9);
        doc.setTextColor(...COLOR_DARK);
        doc.text(edu.inst, leftMargin, y);

        y += 4;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...COLOR_SECONDARY);
        doc.text(edu.desc, leftMargin, y);
        y += 6;
    });

    // ==========================================
    // 4. SKILLS MATRIX
    // ==========================================
    drawSectionHeader("TECHNICAL SKILLS");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    
    const skillCats = [
        { cat: "Languages", list: "Java, HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, ReactJS, NodeJS, ExpressJS, C, Python" },
        { cat: "Databases", list: "MySQL, MongoDB, PostgreSQL" },
        { cat: "Frameworks", list: "Spring Boot, Hibernate, Struts, JSF, Play, Spring MVC, Spring Security, Spring Data JPA" },
        { cat: "APIs & Tools", list: "RESTful APIs, SOAP, GraphQL, Postman, MongoDB Compass, Git, GitHub" },
        { cat: "Cloud Ops", list: "AWS (EC2, S3, RDS), Vercel, Netlify, Render" }
    ];

    skillCats.forEach(sc => {
        checkPageLimit(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...COLOR_DARK);
        doc.text(`• ${sc.cat}: `, leftMargin, y);
        
        const catWidth = doc.getTextWidth(`• ${sc.cat}: `);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...COLOR_SECONDARY);
        
        const lines = doc.splitTextToSize(sc.list, contentWidth - catWidth);
        doc.text(lines, leftMargin + catWidth, y);
        y += (lines.length * 4.5) + 1;
    });

    // ==========================================
    // 5. WORK EXPERIENCE / INTERNSHIPS
    // ==========================================
    drawSectionHeader("PROFESSIONAL EXPERIENCE");
    
    const expList = [
        {
            role: "Trainee - Java Full Stack",
            org: "Codegnan, Vijayawada, Andhra Pradesh",
            date: "Hands-on Training Syllabus",
            bullet: [
                "Designed and developed backend services using Java and Spring Boot MVC architecture.",
                "Built and verified JSON RESTful API endpoints for client-server communication.",
                "Integrated MySQL databases utilizing JPA repositories and optimized query mappings."
            ]
        },
        {
            role: "Intern - Cloud & DevOps Engineer",
            org: "Data Valley, Vijayawada, Andhra Pradesh",
            date: "AWS Integration Intern",
            bullet: [
                "Configured secure network systems and structured cloud compute containers inside AWS.",
                "Managed database storage architectures using Amazon S3, RDS, and EC2 systems."
            ]
        },
        {
            role: "Intern - Web-Development & Full-Stack",
            org: "IIDT (Black Bucks), Remote",
            date: "Web Developer Intern",
            bullet: [
                "Implemented interactive frontend designs utilizing modern React.js route frameworks.",
                "Connected full stack components using REST communication and Git version control."
            ]
        }
    ];

    expList.forEach(exp => {
        checkPageLimit(15);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(...COLOR_DARK);
        doc.text(exp.role, leftMargin, y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...COLOR_SECONDARY);
        const dWidth = doc.getTextWidth(exp.date);
        doc.text(exp.date, leftMargin + contentWidth - dWidth, y);

        y += 4.5;
        doc.setFont("helvetica", "oblique");
        doc.setFontSize(9);
        doc.setTextColor(...COLOR_DARK);
        doc.text(exp.org, leftMargin, y);
        y += 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...COLOR_DARK);
        
        exp.bullet.forEach(b => {
            const wrappedB = doc.splitTextToSize(b, contentWidth - 6);
            checkPageLimit(wrappedB.length * 4.5 + 2);
            doc.text("-", leftMargin + 2, y);
            doc.text(wrappedB, leftMargin + 6, y);
            y += (wrappedB.length * 4.5);
        });
        y += 2;
    });

    // ==========================================
    // 6. PROJECTS
    // ==========================================
    drawSectionHeader("ACADEMIC & CORE PROJECTS");
    
    const projList = [
        {
            name: "Weather Application | Personal Project",
            tech: "HTML, CSS, JavaScript, OpenWeatherMap API",
            bullets: [
                "Designed and developed a responsive weather application that fetches and displays live weather info using RESTful APIs.",
                "Integrated OpenWeatherMap API and asynchronous JavaScript (Fetch, async/await) for dynamic, real-time UI data updates."
            ]
        },
        {
            name: "A 3D Model Generator for Constructions Designs",
            tech: "ReactJS, NodeJS, MySQL",
            bullets: [
                "Developed fullstack construction visualizer integrating React client dashboard with Node API controllers.",
                "Implemented dynamic data models enabling real-time engineering metric calculations."
            ]
        },
        {
            name: "Employee Management System (EMS)",
            tech: "Java, Spring Boot, REST API, Maven, MySQL, Git",
            bullets: [
                "Constructed enterprise-style MVC (Controller-Service-Repository) server system in Spring Boot.",
                "Engineered complete secure CRUD endpoints completely mapped and tested using Postman."
            ]
        }
    ];

    projList.forEach(p => {
        checkPageLimit(12);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(...COLOR_DARK);
        doc.text(p.name, leftMargin, y);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...COLOR_SECONDARY);
        const tWidth = doc.getTextWidth(`[${p.tech}]`);
        doc.text(`[${p.tech}]`, leftMargin + contentWidth - tWidth, y);
        y += 4.5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...COLOR_DARK);
        
        p.bullets.forEach(b => {
            const wrappedB = doc.splitTextToSize(b, contentWidth - 6);
            checkPageLimit(wrappedB.length * 4.5 + 2);
            doc.text("-", leftMargin + 2, y);
            doc.text(wrappedB, leftMargin + 6, y);
            y += (wrappedB.length * 4.5);
        });
        y += 2;
    });

    // Save compiled PDF
    doc.save("Ganesh_Prasad_Chillapalli_Resume.pdf");
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
