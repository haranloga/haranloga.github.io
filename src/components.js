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
            theme: document.documentElement.getAttribute("data-theme") ?? "dark",
        };

        const bars = Array.from({ length: 48 }, () => ({
            offset: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.9,
            variance: 0.45 + Math.random() * 0.4,
        }));

        const rainbowStops = [
            { pos: 0, color: [20, 70, 190] },
            { pos: 0.4, color: [23, 165, 205] },
            { pos: 0.7, color: [60, 210, 145] },
            { pos: 1, color: [160, 245, 130] },
        ];

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

        const lerp = (a, b, t) => a + (b - a) * t;
        const getRainbowColor = (t) => {
            for (let i = 0; i < rainbowStops.length - 1; i++) {
                const current = rainbowStops[i];
                const next = rainbowStops[i + 1];
                if (t >= current.pos && t <= next.pos) {
                    const localT = (t - current.pos) / (next.pos - current.pos);
                    const r = Math.round(lerp(current.color[0], next.color[0], localT));
                    const g = Math.round(lerp(current.color[1], next.color[1], localT));
                    const b = Math.round(lerp(current.color[2], next.color[2], localT));
                    return `rgb(${r},${g},${b})`;
                }
            }
            return `rgb(${rainbowStops[rainbowStops.length - 1].color.join(",")})`;
        };

        const drawBackground = () => {
            const isDark = state.theme === "dark";
            const width = getWidth();
            const height = getHeight();
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            if (isDark) {
                gradient.addColorStop(0, "#020307");
                gradient.addColorStop(1, "#040914");
            } else {
                gradient.addColorStop(0, "#eef4ff");
                gradient.addColorStop(1, "#cfdaf5");
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            if (isDark) {
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(0, height * 0.7, width, height * 0.3);
            }
        };

        const drawParticles = (time) => {
            const width = getWidth();
            const height = getHeight();
            ctx.fillStyle = state.theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
            for (let i = 0; i < 18; i++) {
                const progress = (time * 0.00008 + i / 18) % 1;
                const x = progress * width;
                const y = height / 2 + Math.sin(progress * Math.PI * 2) * 70;
                ctx.beginPath();
                ctx.arc(x, y, 1.8, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawBars = (time) => {
            const width = getWidth();
            const height = getHeight();
            const barWidth = width / (bars.length + 2);
            const maxBarHeight = height * 0.75;
            const baseLineY = height * 0.9;
            const segmentCount = 10;
            const segmentGap = 2;
            const segmentHeight = maxBarHeight / segmentCount;
            ctx.save();
            ctx.globalAlpha = state.theme === "dark" ? 0.9 : 0.85;
            ctx.shadowBlur = 10;

            bars.forEach((bar, index) => {
                const speed = time * 0.0008 * bar.speed + bar.offset;
                const base = (Math.sin(speed) + 1) / 2;
                const pulse = (Math.sin(speed * 2.8) + 1) / 2;
                const eased = Math.pow(base, 1.35) * bar.variance + pulse * 0.08;
                const barHeight = Math.max(maxBarHeight * (0.3 + eased), maxBarHeight * 0.2);
                const filledSegments = Math.round(barHeight / segmentHeight);
                const x = (index + 1) * barWidth;
                const colorPosition = index / (bars.length - 1);
                const color = getRainbowColor(colorPosition);
                ctx.shadowColor = color;

                for (let seg = 0; seg < filledSegments; seg++) {
                    const y = baseLineY - seg * (segmentHeight + segmentGap) - segmentHeight;
                    const gradient = ctx.createLinearGradient(x, y, x, y + segmentHeight);
                    gradient.addColorStop(0, `rgba(255,255,255,${state.theme === "dark" ? 0.15 : 0.25})`);
                    gradient.addColorStop(1, color);
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.roundRect(x, y, barWidth * 0.6, segmentHeight - segmentGap * 0.3, barWidth * 0.15);
                    ctx.fill();
                }

                if (filledSegments > 0) {
                    const capY = baseLineY - (filledSegments - 0.5) * (segmentHeight + segmentGap);
                    ctx.fillStyle = `rgba(240,255,255,${state.theme === "dark" ? 0.9 : 0.7})`;
                    ctx.fillRect(x, capY, barWidth * 0.6, 2);
                }
            });

            ctx.restore();
        };

        const loop = (time = 0) => {
            resize();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            drawParticles(time);
            drawBars(time);
            requestAnimationFrame(loop);
        };

        const handleThemeChange = () => {
            state.theme = document.documentElement.getAttribute("data-theme") ?? "dark";
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
