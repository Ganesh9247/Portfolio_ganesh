/**
 * Creative Live Coding Matrix Background Canvas Animation
 * Streams custom Java, Javascript, React, and DevOps tokens in neon HSL themes
 * Integrates interactive cursor laser tracking
 */

document.addEventListener("DOMContentLoaded", () => {
    initMatrixBackground();
});

function initMatrixBackground() {
    const canvas = document.getElementById("matrixCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Dynamic resize handler
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates for interactive glow
    let mouse = { x: undefined, y: undefined, radius: 110 };
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener("mouseleave", () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // List of developer-centric syntax characters and keywords
    const tokens = [
        "{", "}", "[", "]", "(", ")", ";", "++", "==", "=>", "&&", "||",
        "class", "public", "void", "main", "String", "System.out.println",
        "const", "let", "function", "return", "import", "package", "java",
        "js", "react", "spring", "aws", "cloud", "devops", "Object", "List",
        "Map", "extends", "implements", "null", "new", "try", "catch", "static",
        "final", "private", "protected", "interface", "class", "this", "super",
        "break", "continue", "switch", "case", "default", "while", "for", "if",
        "else", "return", "throw", "throws", "new", "null", "true", "false",
        "&&", "||", "!", "==", "!=", "<", ">", "<=", ">=", "+", "-", "*", "/",
        "%", "=", "+=", "-=", "*=", "/=", "%=", "++", "--", "&", "|", "^", "~",
        "<<", ">>", ">>>", "?:", "instanceof", "new", "this", "super", "null",
        "</>", "[]", "{}", "()", "=>", "::", "->", "@Override", "@Autowired"
    ];

    const fontSize = 14;
    let columns = Math.floor(canvas.width / 24); // Spacing between columns
    let drops = [];

    // Initialize drop coordinates dynamically
    function initDrops() {
        columns = Math.floor(canvas.width / 24);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // staggered start heights
        }
    }
    initDrops();
    window.addEventListener("resize", initDrops);

    // Drawing loop
    function draw() {
        const isLightMode = document.body.classList.contains("light-mode");
        
        // Render semi-transparent background to fade past characters smoothly
        ctx.fillStyle = isLightMode ? "rgba(248, 250, 252, 0.07)" : "rgba(11, 17, 32, 0.07)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Styling properties
        ctx.font = "bold 13px 'Outfit', 'Fira Code', 'Courier New', monospace";

        for (let i = 0; i < drops.length; i++) {
            // Pick a random syntax character
            const text = tokens[Math.floor(Math.random() * tokens.length)];
            
            // X coordinate (spacing intervals)
            const x = i * 24;
            // Y coordinate
            const y = drops[i] * fontSize;

            // Mouse proximity checking
            let isHovered = false;
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    isHovered = true;
                }
            }

            // Neon colors: alternate sky blue, purple, and subtle slate gray
            const rand = Math.random();
            if (isHovered) {
                // Interactive cursor laser highlight
                ctx.fillStyle = "#ffffff";
                ctx.shadowBlur = 10;
                ctx.shadowColor = Math.random() > 0.5 ? "#0ea5e9" : "#8b5cf6";
            } else {
                ctx.shadowBlur = 0; // Reset shadow for normal paths
                if (isLightMode) {
                    if (rand > 0.85) ctx.fillStyle = "rgba(14, 165, 233, 0.45)"; // Sky Blue
                    else if (rand > 0.70) ctx.fillStyle = "rgba(139, 92, 246, 0.45)"; // Purple
                    else ctx.fillStyle = "rgba(148, 163, 184, 0.15)"; // Light gray
                } else {
                    if (rand > 0.85) ctx.fillStyle = "rgba(14, 165, 233, 0.65)"; // Neon Sky Blue
                    else if (rand > 0.70) ctx.fillStyle = "rgba(139, 92, 246, 0.65)"; // Neon Purple
                    else ctx.fillStyle = "rgba(71, 85, 105, 0.25)"; // Dark slate syntax
                }
            }

            // Draw character
            ctx.fillText(text, x, y);

            // Move drop down
            drops[i] += 0.85;

            // Reset when drop leaves viewport limits
            if (y > canvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }
        }

        // Reset shadowBlur globally to not affect other drawings
        ctx.shadowBlur = 0;

        requestAnimationFrame(draw);
    }

    draw();
}
