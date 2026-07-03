/**
 * AI Copilot - Smart Assistant for Portfolio Visitors and Recruiters
 */

document.addEventListener("DOMContentLoaded", () => {
    initCopilotWidget();
});

// Predefined suggestion responses populated from Ganesh's resume
const COPILOT_RESPONSES = {
    introduction: `**Ganesh Prasad Chillapalli** is an aspiring **Java Full Stack Developer** from Mangalagiri, Andhra Pradesh, India. He holds a Bachelor of Technology in Computer Science & Engineering (2021-2025) from MVR College of Engineering and Technology, graduating with an **8.0/10 CGPA**.

He possesses foundational expertise in backend engineering (Java, Spring Boot, Spring Data JPA, Hibernate, REST APIs) and modern frontend design (React.js, HTML5, CSS3, Tailwind CSS, JavaScript). Additionally, he has completed structured traineeship at Codegnan and internships at Data Valley (AWS Cloud & DevOps) and IIDT Black Bucks (Web Development).

Ganesh is passionate about writing clean, modular code and solving complex software engineering challenges in Agile environments!`,

    skills: `Ganesh specializes in **Java Full Stack development**. His core technology stack includes:

• **Backend**: Java, Spring Boot, Hibernate, JPA, Spring MVC, REST APIs
• **Frontend**: HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React.js, Next.js
• **Databases**: MySQL, MongoDB, PostgreSQL
• **Cloud & DevOps**: AWS (EC2, S3, RDS), Git, GitHub, Postman, Netlify, Vercel

Ask me about a specific skill, such as **"Tell me about his Java experience"** or **"What does he know about AWS?"**!`,

    skills_java: `Ganesh's core strength is **Java Backend Development**. His expertise includes:

• **Java SE**: Solid grasp of Object-Oriented Programming (OOP) principles, exception handling, collections framework, and multithreading.
• **Enterprise Architecture**: Gained practical traineeship experience building MVC components using Maven, Hibernate ORM, and Spring frameworks.
• **Database Integration**: Connecting Java backends with databases using JDBC and JPA repositories.`,

    skills_spring: `Ganesh is highly proficient in building RESTful APIs using the **Spring Boot ecosystem**:

• **Layered Architecture**: Follows the strict Controller-Service-Repository pattern for modular, maintainable code.
• **Spring Data JPA**: Links MySQL databases using optimized Object-Relational Mapping (ORM) and custom repository methods.
• **REST API Design**: Builds endpoints handling structured JSON client-server communication, tested and validated using Postman.`,

    skills_react: `On the frontend, Ganesh works with **React.js** and modern styling frameworks:

• **Component-Based UI**: Designs reusable components managing local states, hooks, and routing.
• **Styling**: Proficient in vanilla CSS3 (glassmorphic layouts, HSL color tokens, animations) and Tailwind CSS / Bootstrap templates.
• **Client Integration**: Connects React clients to backend REST APIs using the JavaScript Fetch API and async/await.`,

    skills_aws: `Ganesh holds a **Cloud & DevOps Internship** certificate from Data Valley. His skills include:

• **Amazon EC2**: Configuring and monitoring virtual computing instances.
• **Amazon S3**: Hosting static assets and managing storage buckets.
• **Amazon RDS**: Deploying relational database instances.
• **Security Groups**: Managing VPC configurations, inbound/outbound rules, and IP credentials.`,

    projects: `Here are Ganesh's core projects:

1. **Weather Application** [Live Demo](https://reliable-daifuku-2bed8b.netlify.app/) | [Code](https://github.com/Ganesh9247/Weather_Application)
   Real-time weather tracking utilizing OpenWeatherMap REST API, Fetch, and async/await.
2. **3D Model Construction Generator** [Live Demo](https://track3dai.netlify.app/) | [Code](https://github.com/Ganesh9247/track3dai)
   React.js Client dashboard mapping to a Node.js database visualizer for structural designs.
3. **Employee Management System (EMS)** [Code](https://github.com/Ganesh9247/ems_EmployeeManagementSystem_2026)
   Enterprise Spring Boot MVC backend CRUD operations system.

Ask me about any specific project (e.g., **"Tell me about the Weather App"** or **"What is the EMS project?"**)!`,

    project_weather: `The **Weather Application** is a responsive frontend web app developed by Ganesh:

• **REST API Integration**: Connects to the OpenWeatherMap API to retrieve real-time weather details (temperature, description, city name).
• **Asynchronous JS**: Utilizes Fetch API with async/await for seamless client-side processing.
• **Deployment**: Deployed via Netlify and version-controlled with Git.

🔗 [Live Demo](https://reliable-daifuku-2bed8b.netlify.app/)  |  [GitHub Repository](https://github.com/Ganesh9247/Weather_Application)`,

    project_3d: `The **3D Model Construction Generator** is a full-stack engineering application developed by Ganesh:

• **Architecture**: Powered by a React.js client interface and a Node.js/Express.js backend API.
• **Integration**: Implements real-time visualization models and processes structural parameter inputs securely mapped to a MySQL database.

🔗 [Live Demo](https://track3dai.netlify.app/)  |  [GitHub Repository](https://github.com/Ganesh9247/track3dai)`,

    project_ems: `The **Employee Management System (EMS)** is an enterprise backend project built by Ganesh:

• **Stack**: Java, Spring Boot, REST API, Maven, MySQL, Git, Postman.
• **MVC Architecture**: Implements a clean layered structure (Controller-Service-Repository) for CRUD operations.
• **Testing**: Endpoints were thoroughly tested and validated using Postman.

🔗 [GitHub Repository](https://github.com/Ganesh9247/ems_EmployeeManagementSystem_2026)`,

    project_toyota: `The **Toyota Clone Website** is a responsive UI design mimicking the Toyota portal page structure using HTML, CSS, and MySQL database integration.

🔗 [Live Demo](https://toyota-com-ten.vercel.app/)  |  [GitHub Repository](https://github.com/Ganesh9247/TOYOTA.COM)`,

    download: `Understood! I am generating and compiling Ganesh's official PDF resume right now. It should initiate download in your browser bar.

If it does not trigger automatically, please click [here](file:///d:/portfolio/index.html) or click the **Download Resume** button in the hero header.`,

    contact: `You can reach out to Ganesh Chillapalli directly via:

• 📧 **Email**: [Chillapallirajababu620@gmail.com](mailto:Chillapallirajababu620@gmail.com)
• 📞 **Phone**: [7013350830](tel:7013350830)
• 📍 **Location**: Mangalagiri, Andhra Pradesh, India
• 🔗 **LinkedIn**: [in/ganesh-chillapalli](https://www.linkedin.com/in/ganesh-chillapalli)
• 🔗 **GitHub**: [github.com/Ganesh9247](https://github.com/Ganesh9247)

[MAP_PLACEHOLDER]

You can also fill in the contact form on this page to send a message directly to his Gmail inbox!`,

    experience: `Ganesh has accumulated professional traineeship and internship experience:

1. **Java Full Stack Trainee** @ Codegnan, Vijayawada
   Classroom syllabus covering J2SE Core, Spring Boot, JPA, MVC frameworks, and SQL databases.
2. **Cloud & DevOps Intern** @ Data Valley, Vijayawada
   AWS infrastructure configuration, compute server monitoring, and storage deployments (EC2, S3, RDS).
3. **Web-Development & Full-Stack Intern** @ IIDT Black Bucks (Remote)
   Frontend component building in React.js, API routing, and backend systems integration.`,

    education: `Ganesh's academic credentials:

• **Bachelors of Technology (CSE)** | 2021 – 2025
  MVR College of Engineering and Technology | CGPA: **8.0 / 10**
• **Board of Intermediate Education (MPC)** | 2019 – 2021
  Narayana Junior College, Mangalagiri | CGPA: **82.6%**
• **Board of Secondary Education (SSC)** | 2018 – 2019
  Narayana English Medium School | CGPA: **9.2 / 10**`,

    hire: `Ganesh is a motivated **Java Full Stack Developer Trainee** with practical project experience:
    
• **Robust Backend Skills**: Practical knowledge of Java SE, Spring Boot, Hibernate, JPA, and RESTful API structures.
• **Modern Frontend Tooling**: Gained experience integrating React.js client dashboards with backend services.
• **Cloud Familiarity**: Interned as a Cloud & DevOps engineer, configuring compute environments on AWS (EC2, S3, RDS).
• **Agile & Clean Code**: Quick learner with a focus on writing modular code and collaborative problem solving.
    
He is open to junior developer positions, internships, and traineeships!`,

    database: `Ganesh has worked with both SQL and NoSQL database management systems:
    
• **MySQL / PostgreSQL**: Formulated structured schemas, optimized SQL queries, mapped database connections, and handled JDBC adapters (designed database schemas for the Employee Management System).
• **MongoDB**: Implemented NoSQL document storage models for JavaScript backend services.`,

    aws: `Ganesh completed a Cloud & DevOps internship at **Data Valley** where he gained hands-on familiarity with the AWS cloud platform:
    
• **AWS EC2**: Configured and monitored virtual compute instances.
• **AWS S3**: Managed object storage buckets for media assets.
• **AWS RDS**: Set up and linked relational database instances.
• **Network Infrastructure**: Configured standard security groups, IP mappings, and inbound/outbound rules.`,

    welcome: `Hello! I am Ganesh's AI portfolio copilot. I am ready to answer your inquiries. Try asking:
• "What projects has he built?"
• "List his technical skills"
• "How can I contact him?"
• Type "download" to compile his PDF resume.`,

    fallback: `I'm not sure I understood that specific request. I am pre-loaded with details on Ganesh's background. Try asking about:
• **Skills** (e.g. Java, React, SQL)
• **Experience** (internships at Data Valley, IIDT, Codegnan)
• **Projects** (Weather App, EMS, 3D Generator)
• **Contact Info** (Email, LinkedIn)
• Type **'download'** to get his PDF resume.`
};

function initCopilotWidget() {
    // 1. Inject HTML elements to Body (featuring animated Full-Body Colored SVG Robot Logo & Hello Speech Bubble)
    const copilotHtml = `
        <div class="copilot-widget" id="copilotWidget">
            <div class="copilot-greeting" id="copilotGreeting">
                <span>👋</span>
                <span>Hello! Ganesh's AI Copilot here. Let's talk!</span>
            </div>
            
            <button class="copilot-btn" id="copilotBtn" title="Ask Ganesh's AI Copilot">
                <svg class="copilot-svg-robot" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round;">
                    <!-- Antenna Beacon -->
                    <line x1="18" y1="6" x2="18" y2="10" stroke="#94a3b8" stroke-width="2"/>
                    <circle class="copilot-svg-antenna-glow" cx="18" cy="4.5" r="2" fill="var(--primary)" stroke="none"/>
                    
                    <!-- Left Waving Arm (waving-hand animation attached) -->
                    <g class="robot-left-arm">
                        <!-- Shoulder joint -->
                        <circle cx="10" cy="16" r="2.5" fill="#475569" stroke="none"/>
                        <!-- Arm & Hand -->
                        <path d="M10 16 L6 11 C5 10 3 11 3 13 L5 17 Q6 19 8 19 L10 16" fill="var(--secondary)" stroke="#334155" stroke-width="1"/>
                        <!-- Waving Palm -->
                        <path d="M3 13 C2 12 1 13 1 14 C1 15 2 16 3 15" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round"/>
                    </g>
                    
                    <!-- Right Swaying Arm -->
                    <g class="robot-right-arm">
                        <!-- Shoulder joint -->
                        <circle cx="26" cy="16" r="2.5" fill="#475569" stroke="none"/>
                        <!-- Arm -->
                        <path d="M26 16 L30 20 C31 21 32 20 32 18 L28 15 Z" fill="var(--secondary)" stroke="#334155" stroke-width="1"/>
                    </g>
                    
                    <!-- Neck -->
                    <rect x="16" y="17" width="4" height="3" fill="#64748b" rx="1" stroke="none"/>
                    
                    <!-- Head (Filled with white/light gray glass plate) -->
                    <rect x="11" y="9" width="14" height="10" rx="3" fill="#f8fafc" stroke="#334155" stroke-width="1.8"/>
                    <!-- Screen Face overlay -->
                    <rect x="12.5" y="10.5" width="11" height="7" rx="2" fill="#0f172a" stroke="none"/>
                    
                    <!-- Eyes (eye-blink animations attached) -->
                    <circle class="robot-eye eye-left" cx="15.5" cy="14" r="1.5" fill="var(--primary)" stroke="none"/>
                    <circle class="robot-eye eye-right" cx="20.5" cy="14" r="1.5" fill="var(--primary)" stroke="none"/>
                    
                    <!-- Mouth -->
                    <path class="robot-mouth" d="M15.5 16.5 Q 18 17.5 20.5 16.5" stroke="var(--secondary)" stroke-width="1.2" fill="none"/>
                    
                    <!-- Body Torso -->
                    <path d="M12 20 H24 L25 28 Q25 30 23 30 H13 Q11 30 11 28 Z" fill="#334155" stroke="#1e293b" stroke-width="1.8"/>
                    <!-- Chest plate cover -->
                    <path d="M14 22 H22 L21 28 H15 Z" fill="#475569" stroke="none"/>
                    <!-- Glowing Power Core -->
                    <circle class="robot-chest-light" cx="18" cy="25" r="2.2" fill="var(--primary)" stroke="none"/>
                </svg>
            </button>
            
            <div class="copilot-chat-window" id="copilotChat">
                <div class="copilot-header">
                    <div class="copilot-header-profile">
                        <div class="copilot-header-avatar">🤖</div>
                        <div class="copilot-header-info">
                            <span class="copilot-header-title">Portfolio Copilot</span>
                            <span class="copilot-header-status">
                                <span class="status-dot"></span> Online
                            </span>
                        </div>
                    </div>
                    <button class="copilot-header-close" id="copilotClose">&times;</button>
                </div>
                
                <div class="copilot-messages" id="copilotMessages">
                    <div class="message-bubble assistant">
                        Hi! I am Ganesh's AI Copilot. I can guide you through his skills, timeline, projects, and credentials. Select a quick topic below or type any question!
                    </div>
                </div>
                
                <div class="copilot-suggestions">
                    <span class="suggestion-chip" data-intent="skills">🛠️ Core Skills</span>
                    <span class="suggestion-chip" data-intent="projects">🏗️ Core Projects</span>
                    <span class="suggestion-chip" data-intent="download">📄 Download PDF</span>
                    <span class="suggestion-chip" data-intent="experience">💼 Experience</span>
                    <span class="suggestion-chip" data-intent="hire">🤝 Why Hire?</span>
                    <span class="suggestion-chip" data-intent="contact">📧 Contact Details</span>
                </div>
                
                <div class="copilot-input-area">
                    <input type="text" class="copilot-input" id="copilotInput" placeholder="Ask about Java, React, projects...">
                    <button class="copilot-send-btn" id="copilotSend" title="Send message">➔</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', copilotHtml);

    // 2. DOM Bindings
    const widget = document.getElementById("copilotWidget");
    const btn = document.getElementById("copilotBtn");
    const chatWindow = document.getElementById("copilotChat");
    const closeBtn = document.getElementById("copilotClose");
    const messagesBox = document.getElementById("copilotMessages");
    const inputField = document.getElementById("copilotInput");
    const sendBtn = document.getElementById("copilotSend");
    const suggestionChips = document.querySelectorAll(".suggestion-chip");
    const greetingBubble = document.getElementById("copilotGreeting");

    // Trigger greeting popup bubble on load
    setTimeout(() => {
        if (!chatWindow.classList.contains("active")) {
            greetingBubble.classList.add("active");
        }
    }, 2500);

    // Toggle Chat visibility
    btn.addEventListener("click", () => {
        chatWindow.classList.toggle("active");
        greetingBubble.classList.remove("active");
        if (chatWindow.classList.contains("active")) {
            inputField.focus();
        }
    });

    closeBtn.addEventListener("click", () => {
        chatWindow.classList.remove("active");
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && chatWindow.classList.contains("active")) {
            chatWindow.classList.remove("active");
        }
    });

    // Suggestion chips listeners
    suggestionChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const intent = chip.getAttribute("data-intent");
            const text = chip.textContent;
            handleUserMessage(text, intent);
        });
    });

    // Send handlers
    sendBtn.addEventListener("click", () => {
        submitInput();
    });

    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            submitInput();
        }
    });

    function submitInput() {
        const text = inputField.value.trim();
        if (!text) return;
        
        inputField.value = "";
        
        // Parse user query to extract specific intent
        const intent = parseUserIntent(text);
        handleUserMessage(text, intent);
    }

    // Core message handler
    function handleUserMessage(userText, intent) {
        // Render User Bubble
        appendBubble(userText, "user");
        
        // Render Typing Indicator
        const typingIndicator = appendTypingIndicator();
        
        // Simulate thinking latency
        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.remove();
            
            // Get intent response
            let response = COPILOT_RESPONSES[intent] || COPILOT_RESPONSES.fallback;
            appendBubble(response, "assistant");
            
            // Specific action trigger: Download PDF Resume
            if (intent === "download") {
                triggerResumeDownloadLink();
            }
        }, 800);
    }

    // Advanced token matching NLP parsing algorithm
    function parseUserIntent(text) {
        const input = text.toLowerCase();
        
        // Helper checking if text contains any of the keywords
        const containsAny = (keywords) => keywords.some(keyword => input.includes(keyword));
        
        // 1. Download Resume intent
        if (containsAny(["download", "pdf", "cv", "resume", "get resume"])) {
            return "download";
        }
        
        // 2. Who is Ganesh (Self Introduction)
        if (containsAny(["who is", "who is ganesh", "who are you", "who is ganesh prasad", "self introduction", "tell me about", "introduce yourself", "ganesh prasad", "ganesh chillapalli"])) {
            return "introduction";
        }
        
        // 3. Hire & Fit queries
        if (containsAny(["hire", "why hire", "fit", "joining", "relocate", "recommend", "why should we"])) {
            return "hire";
        }

        // 4. Specific Projects
        if (containsAny(["weather", "weather app", "openweathermap", "forecast"])) {
            return "project_weather";
        }
        if (containsAny(["3d", "construction", "track3dai", "construction visualizer"])) {
            return "project_3d";
        }
        if (containsAny(["ems", "employee", "management system", "crud"])) {
            return "project_ems";
        }
        if (containsAny(["toyota", "toyota.com", "toyota clone"])) {
            return "project_toyota";
        }
        if (containsAny(["project", "projects", "built", "portfolio", "application", "applications"])) {
            return "projects";
        }

        // 5. Specific Skills
        if (containsAny(["java", "oop", "j2se", "multithreading", "inheritance"])) {
            return "skills_java";
        }
        if (containsAny(["spring", "boot", "spring boot", "jpa", "hibernate", "mvc", "api", "rest"])) {
            return "skills_spring";
        }
        if (containsAny(["react", "reactjs", "frontend", "tailwind", "bootstrap", "css", "html", "javascript", "js"])) {
            return "skills_react";
        }
        if (containsAny(["aws", "cloud", "devops", "ec2", "s3", "rds"])) {
            return "skills_aws";
        }
        if (containsAny(["database", "sql", "mysql", "postgresql", "mongodb", "nosql"])) {
            return "database";
        }
        if (containsAny(["skill", "skills", "tech", "stack", "languages"])) {
            return "skills";
        }

        // 6. Contact and Map Location
        if (containsAny(["contact", "email", "phone", "reach", "location", "address", "map", "maps", "where do you", "where is ganesh"])) {
            return "contact";
        }
        
        // 7. Work History
        if (containsAny(["experience", "work", "job", "intern", "internship", "history", "codegnan", "data valley", "iidt"])) {
            return "experience";
        }
        
        // 8. Education
        if (containsAny(["education", "college", "school", "btech", "mvr", "narayana"])) {
            return "education";
        }
        
        // 9. Welcomes
        if (containsAny(["hi", "hello", "hey", "greetings", "welcome"])) {
            return "welcome";
        }
        
        return null; // triggers fallback
    }

    // Appends bubbles to DOM
    function appendBubble(rawText, sender) {
        const bubble = document.createElement("div");
        bubble.className = `message-bubble ${sender}`;
        
        // Parse markdown bold and links
        let htmlContent = parseMarkdownFormatting(rawText);
        
        // Inject interactive location map if placeholder is present
        if (htmlContent.includes("[MAP_PLACEHOLDER]")) {
            const mapHtml = `<div class="copilot-map-container" style="margin-top: 10px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); height: 140px;"><iframe width="100%" height="140" src="https://maps.google.com/maps?q=Mangalagiri,%20Andhra%20Pradesh,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" style="border:0;" allowfullscreen></iframe></div>`;
            htmlContent = htmlContent.replace("[MAP_PLACEHOLDER]", mapHtml);
        }
        
        bubble.innerHTML = htmlContent;
        messagesBox.appendChild(bubble);
        autoscrollChat();
    }

    function appendTypingIndicator() {
        const indicator = document.createElement("div");
        indicator.className = "message-bubble assistant typing-indicator";
        indicator.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        messagesBox.appendChild(indicator);
        autoscrollChat();
        return indicator;
    }

    function autoscrollChat() {
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    // Basic regex parser to translate **bold** and [text](url) markdown to HTML tags safely
    function parseMarkdownFormatting(text) {
        let formatted = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Restore HTML characters for safe anchors constructed in variables
        formatted = formatted
            .replace(/&lt;a href=(.*?)&gt;(.*?)&lt;\/a&gt;/g, '<a href=$1 target="_blank">$2</a>')
            .replace(/&lt;span(.*?)&gt;(.*?)&lt;\/span&gt;/g, '<span$1>$2</span>');

        // Parse **bold** -> <strong>bold</strong>
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        // Parse [label](url) -> <a href="$2" target="_blank">$1</a>
        formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Parse newlines -> <br>
        formatted = formatted.replace(/\n/g, "<br>");

        return formatted;
    }

    // Call global pdf downloader in app.js
    function triggerResumeDownloadLink() {
        // Trigger click on DOM download buttons if available
        const downloadBtn = document.querySelector(".download-resume-btn");
        if (downloadBtn) {
            downloadBtn.click();
        } else if (typeof generateAndDownloadPDFResume === "function") {
            // direct invocation fallback
            generateAndDownloadPDFResume();
        }
    }
}
