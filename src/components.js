function dom(html) {
    const div = document.createElement(`div`);
    div.innerHTML = html;
    const children = [];
    for (let i = 0; i < div.children.length; i++) {
        children.push(div.children[i]);
    }
    return children;
}

class ThemeToggle extends HTMLElement {
    darkIcon = `<%= render("./_icons/moon-line.svg")%>`;
    lightIcon = `<%= render("./_icons/sun-line.svg")%>`;

    connectedCallback() {
        this.render();
        this.style.cursor = "pointer";
    }

    render() {
        this.innerHTML = "";
        const elements = dom(/*html*/ `
        <i class="icon" style="width: 20px;">${
            localStorage.getItem("theme") === "dark" ? this.darkIcon : this.lightIcon
        }</i>
      `);
        this.append(...elements);

        elements[0].addEventListener("click", () => {
            localStorage.setItem("theme", localStorage.getItem("theme") === "dark" ? "light" : "dark");
            document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
            this.render();
        });
    }
}
customElements.define("theme-toggle", ThemeToggle);
if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
}
document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") ?? "light");

class ColorBand extends HTMLElement {
    connectedCallback() {
        this.style.display = "block";
        this.innerHTML = /*html*/ `<canvas class="w-full h-full"></canvas>`;
        const canvas = this.querySelector("canvas");
        const ctx = canvas?.getContext("2d");
        if (!ctx) return;

        const state = {
            lastTime: 0,
            theme: document.documentElement.getAttribute("data-theme") ?? "dark",
        };

        const getWidth = () => canvas.clientWidth;
        const getHeight = () => canvas.clientHeight;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const displayWidth = canvas.clientWidth;
            const displayHeight = canvas.clientHeight;
            const needResize = canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr;
            if (needResize) {
                canvas.width = displayWidth * dpr;
                canvas.height = displayHeight * dpr;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }
        };

        const drawBackground = () => {
            const isDark = state.theme === "dark";
            const width = getWidth();
            const height = getHeight();
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            if (isDark) {
                gradient.addColorStop(0, "#02040a");
                gradient.addColorStop(1, "#0b1426");
            } else {
                gradient.addColorStop(0, "#f7fbff");
                gradient.addColorStop(1, "#dee9ff");
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            const glowOpacity = isDark ? 0.15 : 0.08;
            ctx.fillStyle = `rgba(255,255,255,${glowOpacity})`;
            const centerX = width / 2;
            const centerY = height / 1.8;
            const glowRadius = Math.max(width, height) / 1.8;
            const radial = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
            radial.addColorStop(0, isDark ? "rgba(0,200,255,0.25)" : "rgba(0,150,255,0.2)");
            radial.addColorStop(1, "transparent");
            ctx.fillStyle = radial;
            ctx.fillRect(0, 0, width, height);
        };

        const heartbeatPath = [
            { x: 0, y: 0 },
            { x: 0.08, y: 0 },
            { x: 0.18, y: -0.05 },
            { x: 0.24, y: -0.05 },
            { x: 0.28, y: 0.35 },
            { x: 0.32, y: -0.45 },
            { x: 0.36, y: 0.65 },
            { x: 0.4, y: -0.1 },
            { x: 0.6, y: 0.05 },
            { x: 0.75, y: 0 },
            { x: 1, y: 0 },
        ];

        const drawHeartbeat = (time) => {
            const width = getWidth();
            const height = getHeight();
            const baseY = height / 2;
            const waveWidth = width * 1.3;
            const speed = width / 4000;
            const offset = (time * speed) % waveWidth;

            ctx.save();
            ctx.translate(-offset, 0);
            ctx.lineWidth = 3;
            ctx.strokeStyle = state.theme === "dark" ? "#8b0000" : "#b22222";
            ctx.shadowBlur = 18;
            ctx.shadowColor = ctx.strokeStyle;
            ctx.globalAlpha = 0.9;

            const drawSegment = (shift) => {
                ctx.beginPath();
                heartbeatPath.forEach((point, index) => {
                    const x = shift + point.x * waveWidth;
                    const y = baseY + point.y * height * 0.45;
                    if (index === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.stroke();
            };

            drawSegment(0);
            drawSegment(waveWidth);
            ctx.restore();
        };

        const drawParticles = (time) => {
            const width = getWidth();
            const height = getHeight();
            ctx.fillStyle = state.theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
            for (let i = 0; i < 12; i++) {
                const progress = (time * 0.0001 + i / 12) % 1;
                const x = progress * width;
                const y = height / 2 + Math.sin(progress * Math.PI * 2) * 60;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const loop = (time = 0) => {
            if (!state.lastTime) state.lastTime = time;
            state.lastTime = time;

            resize();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            drawParticles(time);
            drawHeartbeat(time);

            requestAnimationFrame(loop);
        };

        const handleThemeChange = () => {
            const newTheme = document.documentElement.getAttribute("data-theme") ?? "dark";
            state.theme = newTheme;
        };

        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        window.addEventListener("resize", resize);

        resize();
        loop();
    }
}
customElements.define("color-band", ColorBand);

class QuoteLink extends HTMLElement {
    quotesIcon = `<%= render("./_icons/double-quotes-r.svg")%>`;

    constructor() {
        super();
        this.href = "";
    }

    static get observedAttributes() {
        return ["href"];
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        if (name === "href") {
            this.href = newValue;
            this.render();
        }
    }

    connectedCallback() {
        this.style.display = "inline-flex";
        this.render();
    }

    render() {
        this.innerHTML = `
        <a href="${this.href}" class="inline-flex items-baseline" style="color: var(--link-color); font-size: 12px; transform: translateY(-6px);">
          <span>[</span>
          <i class="icon" style="width: 12px;">${this.quotesIcon}</i>
          <span>]</span>
        </a>
      `;
    }
}

customElements.define("q-l", QuoteLink);
