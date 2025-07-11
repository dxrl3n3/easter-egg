const easterEgg = document.getElementById('easterEgg');
const terminalContent = document.getElementById('terminalContent');
const terminalInput = document.getElementById('terminalInput');
let commandHistory = [];
let historyIndex = -1;

// Secret key combination to activate
let keys = [];
document.addEventListener('keydown', (e) => {
    keys.push(e.key);
    if (keys.length > 3) keys.shift();
    
    // Ctrl + Shift + K
    if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        showTerminal();
    }
});

function showTerminal() {
    easterEgg.style.display = 'block';
    terminalInput.focus();
    addLine("Easter egg activated! 🥚✨");
}

function closeTerminal() {
    easterEgg.style.display = 'none';
}

function addLine(text, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isCommand) {
        line.innerHTML = `<span class="prompt">dev@retro:~$</span> ${text}`;
    } else {
        line.textContent = text;
    }
    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

const commands = {
    help: () => {
        addLine("Available commands:");
        addLine("  help      - Show this help message");
        addLine("  about     - About this terminal");
        addLine("  team      - Show team appreciation");
        addLine("  fortune   - Get a random fortune");
        addLine("  matrix    - Enter the matrix");
        addLine("  coffee    - Essential fuel status");
        addLine("  uptime    - System uptime");
        addLine("  whoami    - Who are you?");
        addLine("  clear     - Clear terminal");
        addLine("  exit      - Close terminal");
    },
    about: () => {
        addLine("╔══════════════════════════════════════╗");
        addLine("║        RETRO TERMINAL v1.337         ║");
        addLine("║                                      ║");
        addLine("║  A nostalgic Easter egg for devs     ║");
        addLine("║  who remember the good old days      ║");
        addLine("╚══════════════════════════════════════╝");
    },
    team: () => {
        addLine("🎉 TEAM APPRECIATION PROTOCOL ACTIVATED 🎉");
        addLine("");
        addLine("Scanning for awesome developers...");
        setTimeout(() => {
            addLine("█████████████████████████████████ 100%");
            addLine("");
            addLine("RESULTS: Maximum awesomeness detected!");
            addLine("Your team is officially LEGENDARY! 🚀");
            addLine("Keep coding, keep being amazing! 💪");
        }, 1000);
    },
    fortune: () => {
        const fortunes = [
            "A bug is never just a mistake. It's a feature waiting to be discovered.",
            "The best code is written when no one is watching.",
            "Coffee not found. Developer performance may be impacted.",
            "In Soviet Russia, code debugs you!",
            "There are only 10 types of people: those who understand binary and those who don't.",
            "It's not a bug, it's an undocumented feature.",
            "Programmer: A machine that turns coffee into code.",
            "The cake is a lie, but the code is real."
        ];
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        addLine(`🔮 ${randomFortune}`);
    },
    matrix: () => {
        addLine("Entering the matrix...");
        addLine("01001000 01100101 01101100 01101100 01101111");
        addLine("Wake up, Neo... 💊");
        addLine("The matrix has you...");
        addLine("Follow the white rabbit... 🐰");
    },
    coffee: () => {
        addLine("☕ COFFEE STATUS CHECK ☕");
        addLine("Scanning coffee levels...");
        setTimeout(() => {
            const level = Math.floor(Math.random() * 100);
            addLine(`Coffee level: ${level}%`);
            if (level < 20) {
                addLine("⚠️  CRITICAL: Coffee levels dangerously low!");
                addLine("Recommend immediate caffeine injection!");
            } else if (level < 50) {
                addLine("⚡ Coffee levels moderate. Proceed with caution.");
            } else {
                addLine("✅ Coffee levels optimal. Ready to code!");
            }
        }, 800);
    },
    uptime: () => {
        const startTime = new Date();
        startTime.setHours(9, 0, 0, 0); // Pretend we started at 9 AM
        const now = new Date();
        const uptime = Math.floor((now - startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        addLine(`System uptime: ${hours}h ${minutes}m`);
        addLine("Status: Still caffeinated and coding! ☕");
    },
    whoami: () => {
        addLine("You are a legendary developer! 🦸‍♂️");
        addLine("User: awesome_coder");
        addLine("Level: Over 9000!");
        addLine("Special abilities: Turning coffee into code");
    },
    clear: () => {
        terminalContent.innerHTML = '';
    },
    exit: () => {
        addLine("Goodbye, fellow developer! 👋");
        setTimeout(() => {
            closeTerminal();
        }, 1000);
    }
};

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        if (command) {
            addLine(command, true);
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            
            if (commands[command]) {
                commands[command]();
            } else {
                addLine(`Command not found: ${command}`);
                addLine("Type 'help' for available commands.");
            }
        }
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'Escape') {
        closeTerminal();
    }
});

// Keep focus on input when terminal is active
document.addEventListener('click', (e) => {
    if (easterEgg.style.display === 'block' && !e.target.classList.contains('close-btn')) {
        terminalInput.focus();
    }
});