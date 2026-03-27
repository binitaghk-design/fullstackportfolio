// ==================== HTML NAME INPUT ====================
function showName() {
    let name = document.getElementById("name").value.trim();
    let output = document.getElementById("output");
    
    if(!name) {
        output.innerHTML = "⚠️ Please enter your name!";
        output.style.color = "#e74c3c";
        shakeElement(document.getElementById("name"));
    } else if(name.length < 2) {
        output.innerHTML = "⚠️ Name must be at least 2 characters!";
        output.style.color = "#e74c3c";
    } else {
        output.innerHTML = `🎉 Hello, ${name}! Welcome to my portfolio! 🎉`;
        output.style.color = "#27ae60";
        createConfetti();
    }
}

// ==================== CSS BOX STYLING ====================
let styleChangeCount = 0;

function changeStyle() {
    const box = document.getElementById("box");
    if(!box) return;
    
    const colors = ["#e74c3c", "#2ecc71", "#3498db", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#1abc9c"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    box.style.background = randomColor;
    box.style.width = Math.floor(Math.random() * 200 + 100) + "px";
    box.style.height = Math.floor(Math.random() * 200 + 100) + "px";
    box.style.borderRadius = Math.floor(Math.random() * 60) + "%";
    box.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    
    styleChangeCount++;
    
    // Display change count
    let countDisplay = document.getElementById("changeCount");
    if(!countDisplay && box.parentNode) {
        countDisplay = document.createElement("p");
        countDisplay.id = "changeCount";
        countDisplay.style.marginTop = "10px";
        countDisplay.style.fontWeight = "bold";
        countDisplay.style.color = "#3498db";
        box.parentNode.appendChild(countDisplay);
    }
    if(countDisplay) {
        countDisplay.innerHTML = `🎨 Style changed ${styleChangeCount} times!`;
    }
}

// ==================== JAVASCRIPT SQUARE CALCULATOR ====================
let calcHistory = [];

// Check if the element exists before adding event listener
const numInput = document.getElementById("num");
if(numInput) {
    numInput.addEventListener("input", function() {
        let val = parseFloat(this.value);
        let result = document.getElementById("result");
        
        if(isNaN(val)) {
            result.innerHTML = "🔢 Please enter a valid number!";
            result.style.color = "#e74c3c";
        } else if(val < 0) {
            result.innerHTML = "📐 Please enter a positive number!";
            result.style.color = "#e74c3c";
        } else if(val === 0) {
            result.innerHTML = "✨ 0² = 0 ✨";
            result.style.color = "#3498db";
        } else {
            const square = (val * val).toFixed(2);
            result.innerHTML = `📊 ${val}² = ${square}`;
            result.style.color = "#27ae60";
            
            // Add to history
            calcHistory.push(`${val}² = ${square}`);
            if(calcHistory.length > 5) calcHistory.shift();
            
            showCalculationHistory();
        }
    });
}

function showCalculationHistory() {
    let historyDiv = document.getElementById("calcHistory");
    const resultElement = document.getElementById("result");
    
    if(!historyDiv && resultElement && resultElement.parentNode) {
        historyDiv = document.createElement("div");
        historyDiv.id = "calcHistory";
        historyDiv.style.marginTop = "15px";
        historyDiv.style.fontSize = "0.9em";
        historyDiv.style.color = "#7f8c8d";
        resultElement.parentNode.appendChild(historyDiv);
    }
    
    if(historyDiv && calcHistory.length > 0) {
        historyDiv.innerHTML = "📜 Recent: " + calcHistory.join(" | ");
    }
}

// ==================== FULL STACK LOGIN ====================
let loginAttempts = 0;
const validUsers = [
    { username: "admin", password: "1234", role: "Administrator" },
    { username: "student", password: "webdev", role: "Student" },
    { username: "teacher", password: "teach2024", role: "Teacher" }
];

function login() {
    let user = document.getElementById("username").value.toLowerCase();
    let pass = document.getElementById("password").value;
    let res = document.getElementById("loginResult");
    let loginBtn = document.querySelector(".card button");
    
    if(!user || !pass) {
        res.innerHTML = "⚠️ Please fill all fields!";
        res.style.color = "#e74c3c";
        return;
    }
    
    const validUser = validUsers.find(u => u.username === user && u.password === pass);
    
    if(validUser) {
        res.innerHTML = `✅ Login Successful! Welcome ${validUser.role} ${validUser.username}! ✅`;
        res.style.color = "#27ae60";
        loginAttempts = 0;
        
        // Clear fields
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        
        createConfetti();
        console.log(`User ${validUser.username} logged in at ${new Date().toLocaleTimeString()}`);
    } else {
        loginAttempts++;
        const remainingAttempts = 3 - loginAttempts;
        
        if(loginAttempts >= 3) {
            res.innerHTML = "🔒 Too many failed attempts! Please try again later. 🔒";
            res.style.color = "#e74c3c";
            if(loginBtn) loginBtn.disabled = true;
            setTimeout(() => {
                if(loginBtn) loginBtn.disabled = false;
                loginAttempts = 0;
                res.innerHTML = "";
            }, 30000);
        } else {
            res.innerHTML = `❌ Invalid Credentials! ${remainingAttempts} attempt(s) remaining. ❌`;
            res.style.color = "#e74c3c";
            shakeElement(document.getElementById("password"));
        }
    }
}

// ==================== BOOTSTRAP COLUMN HIGHLIGHT ====================
function highlightColumn(el, msg) {
    const messageDiv = document.getElementById("columnMessage");
    if(messageDiv) {
        messageDiv.innerHTML = `🔵 ${msg} 🔴`;
        messageDiv.style.animation = "fadeInOut 0.5s ease";
    }
    
    // Reset all columns
    document.querySelectorAll('.column').forEach(c => {
        c.style.opacity = "0.6";
        c.style.transform = "scale(0.98)";
    });
    
    // Highlight clicked column
    el.style.opacity = "1";
    el.style.transform = "scale(1.02)";
    el.style.transition = "all 0.3s ease";
    
    console.log(`Column clicked: ${msg} at ${new Date().toLocaleTimeString()}`);
}

// ==================== HELPER FUNCTIONS ====================

// Shake animation for error feedback
function shakeElement(element) {
    if(!element) return;
    element.style.animation = "shake 0.3s ease";
    setTimeout(() => {
        element.style.animation = "";
    }, 300);
}

// Confetti effect for success actions
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6600', '#ff0066'];
    for(let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = Math.random() * 8 + 4 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if(confetti && confetti.remove) confetti.remove();
        }, 2000);
    }
}

// Add CSS animation for confetti
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ==================== KEYBOARD SUPPORT ====================
document.addEventListener('DOMContentLoaded', function() {
    // Add Enter key support for login
    const passwordInput = document.getElementById('password');
    if(passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                login();
            }
        });
    }
    
    // Add Enter key support for HTML name input
    const nameInput = document.getElementById('name');
    if(nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                showName();
            }
        });
    }
    
    // Add tooltips to all buttons
    document.querySelectorAll('button').forEach(btn => {
        if(btn.innerText) {
            btn.title = btn.innerText + ' - Click me!';
        }
    });
    
    console.log('🎉 Portfolio Loaded Successfully!');
    console.log('💡 Tip: Try clicking buttons and see the interactive effects!');
});