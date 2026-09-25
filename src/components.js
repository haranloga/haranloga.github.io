const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

class ThemeToggle extends HTMLElement {
    darkIcon = `<%= render("./_icons/moon-line.svg")%>`;
    lightIcon = `<%= render("./_icons/sun-line.svg")%>`;

    connectedCallback() {
        this.style.display = "inline-flex";
        this.render();
    }

    currentTheme() {
        return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    }

    render() {
        const theme = this.currentTheme();
        const next = theme === "dark" ? "light" : "dark";
        this.innerHTML = `<button type="button" class="theme-toggle" aria-label="Switch to ${next} theme" title="Switch to ${next} theme"><i class="icon">${theme === "dark" ? this.darkIcon : this.lightIcon}</i></button>`;
        this.querySelector("button").addEventListener("click", () => {
            document.documentElement.setAttribute("data-theme", next);
            try { localStorage.setItem("theme", next); } catch {}
            this.render();
            this.querySelector("button").focus();
        });
    }
}
customElements.define("theme-toggle", ThemeToggle);

class QuoteLink extends HTMLElement {
    quotesIcon = `<%= render("./_icons/double-quotes-r.svg")%>`;

    static get observedAttributes() {
        return ["href"];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.style.display = "inline-flex";
        this.render();
    }

    render() {
        this.innerHTML = `<a href="${this.getAttribute("href") || ""}" class="inline-flex items-baseline" style="color: var(--accent); font-size: 12px; transform: translateY(-6px);"><span>[</span><i class="icon" style="width: 12px;">${this.quotesIcon}</i><span>]</span></a>`;
    }
}
customElements.define("q-l", QuoteLink);

document.addEventListener("DOMContentLoaded", () => {
    // Marquee: duplicate the track so translateX(-50%) loops seamlessly
    document.querySelectorAll(".tech-carousel__track").forEach((track) => {
        Array.from(track.children).forEach((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            clone.setAttribute("alt", "");
            track.appendChild(clone);
        });
    });

    // Copy buttons on code blocks
    document.querySelectorAll(".prose pre").forEach((pre) => {
        const code = pre.querySelector("code");
        if (!code) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "code-copy-btn";
        btn.textContent = "Copy";
        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(code.innerText).then(() => {
                btn.textContent = "Copied";
                setTimeout(() => { btn.textContent = "Copy"; }, 1500);
            });
        });
        pre.appendChild(btn);
    });

    // Copy-link share button
    document.querySelectorAll("[data-copy-link]").forEach((btn) => {
        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(window.location.href.split("#")[0]).then(() => {
                btn.classList.add("is-copied");
                btn.setAttribute("aria-label", "Link copied");
                setTimeout(() => {
                    btn.classList.remove("is-copied");
                    btn.setAttribute("aria-label", "Copy link");
                }, 1600);
            });
        });
    });

    // Share buttons are <button>s so URL-based content blockers don't hide them
    const shareTargets = {
        linkedin: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
        x: (u, t) => `https://x.com/intent/post?url=${u}&text=${t}`,
    };
    document.querySelectorAll("[data-share]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const build = shareTargets[btn.dataset.share];
            if (!build) return;
            window.open(build(btn.dataset.shareUrl || "", btn.dataset.shareText || ""), "_blank", "noopener,width=600,height=640");
        });
    });

    // Back to top
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "back-to-top";
    backBtn.setAttribute("aria-label", "Back to top");
    backBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
    document.body.appendChild(backBtn);
    backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" }));

    // Reading progress for long-form pages
    const progressRoot = document.querySelector("[data-progress]");
    let progressBar = null;
    if (progressRoot) {
        progressBar = document.createElement("div");
        progressBar.className = "reading-progress";
        progressBar.setAttribute("aria-hidden", "true");
        document.body.appendChild(progressBar);
    }

    const onScroll = () => {
        backBtn.classList.toggle("visible", window.scrollY > 600);
        if (progressBar) {
            const top = progressRoot.getBoundingClientRect().top + window.scrollY;
            const span = Math.max(1, progressRoot.offsetHeight - window.innerHeight);
            const progress = Math.min(1, Math.max(0, (window.scrollY - top) / span));
            progressBar.style.transform = `scaleX(${progress})`;
        }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    // Typewriter: rotate the words listed in data-words
    document.querySelectorAll(".type-rotate").forEach((el) => {
        let words;
        try { words = JSON.parse(el.dataset.words); } catch { return; }
        if (!Array.isArray(words) || words.length < 2 || prefersReducedMotion()) return;

        const cursor = document.createElement("span");
        cursor.className = "type-cursor";
        cursor.setAttribute("aria-hidden", "true");
        el.after(cursor);
        el.setAttribute("aria-label", words.join(", "));

        let wordIdx = 0;
        let charIdx = words[0].length;
        let deleting = true;
        const TYPE_MS = 60, DELETE_MS = 32, HOLD_MS = 2400, GAP_MS = 300;

        const tick = () => {
            const word = words[wordIdx];
            charIdx += deleting ? -1 : 1;
            el.textContent = word.slice(0, charIdx);
            if (deleting && charIdx <= 0) {
                deleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                return setTimeout(tick, GAP_MS);
            }
            if (!deleting && charIdx >= words[wordIdx].length) {
                deleting = true;
                return setTimeout(tick, HOLD_MS);
            }
            setTimeout(tick, deleting ? DELETE_MS : TYPE_MS);
        };
        setTimeout(tick, HOLD_MS);
    });

    // Client-side filtering for any list marked with data-search-input
    document.querySelectorAll("[data-search-input]").forEach((input) => {
        const root = document.querySelector(input.dataset.searchTarget);
        if (!root) return;
        const items = Array.from(root.querySelectorAll("[data-search]"));
        const groups = Array.from(root.querySelectorAll("[data-search-group]"));
        const countEl = document.querySelector("[data-search-count]");
        const emptyEl = document.querySelector("[data-search-empty]");
        const chipsEl = document.querySelector(`[data-tag-filters="${input.dataset.searchTarget}"]`);
        const noun = input.dataset.searchTarget === "#project-grid" ? ["project", "projects"] : ["post", "posts"];
        let activeTag = "";

        const apply = () => {
            const terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
            let visible = 0;
            items.forEach((item) => {
                const haystack = item.dataset.search || "";
                const tags = (item.dataset.tags || "").split("|");
                const match = terms.every((t) => haystack.includes(t)) && (!activeTag || tags.includes(activeTag));
                (item.closest("li") || item).hidden = !match;
                if (match) visible++;
            });
            groups.forEach((g) => {
                g.hidden = !g.querySelector("li:not([hidden])");
            });
            if (countEl) {
                countEl.hidden = terms.length === 0 && !activeTag;
                countEl.textContent = `${visible} of ${items.length} ${items.length === 1 ? noun[0] : noun[1]}`;
            }
            if (emptyEl) emptyEl.hidden = visible !== 0;
        };

        input.addEventListener("input", apply);

        if (chipsEl) {
            chipsEl.addEventListener("click", (e) => {
                const btn = e.target.closest("[data-tag]");
                if (!btn) return;
                activeTag = btn.dataset.tag;
                chipsEl.querySelectorAll("[data-tag]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
                apply();
            });
        }

        input.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                input.value = "";
                apply();
                input.blur();
            }
        });
    });

    // "/" focuses the page's search box
    document.addEventListener("keydown", (e) => {
        if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
        const active = document.activeElement;
        if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) return;
        const search = document.querySelector("[data-search-input]");
        if (search) {
            e.preventDefault();
            search.focus();
        }
    });

    // Floating table of contents with scroll-spy (wide screens only)
    const tocRoot = document.querySelector("[data-toc]");
    if (tocRoot && window.innerWidth >= 1200) {
        const headings = Array.from(tocRoot.querySelectorAll(tocRoot.dataset.toc || "h2, h3"))
            .filter((h) => !h.closest(".post-header, .post-footer, [data-toc-skip]"));
        if (headings.length >= 3) {
            const used = new Set();
            headings.forEach((h, i) => {
                if (h.id) { used.add(h.id); return; }
                let id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || `section-${i}`;
                while (used.has(id)) id += "-" + i;
                used.add(id);
                h.id = id;
            });

            const nav = document.createElement("nav");
            nav.className = "toc";
            nav.setAttribute("aria-label", "On this page");
            nav.innerHTML = '<p class="toc__heading">On this page</p>';
            const list = document.createElement("ul");
            let lastTopItem = null;
            let subList = null;
            const topTag = headings[0].tagName;

            headings.forEach((h) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.className = "toc__link";
                a.href = "#" + h.id;
                a.textContent = h.textContent.trim();
                li.appendChild(a);
                if (h.tagName !== topTag && lastTopItem) {
                    if (!subList) {
                        subList = document.createElement("ul");
                        lastTopItem.appendChild(subList);
                    }
                    subList.appendChild(li);
                } else {
                    list.appendChild(li);
                    lastTopItem = li;
                    subList = null;
                }
            });
            nav.appendChild(list);
            document.body.appendChild(nav);

            const links = Array.from(nav.querySelectorAll(".toc__link"));
            const spy = () => {
                let current = headings[0].id;
                for (const h of headings) {
                    if (h.getBoundingClientRect().top <= 110) current = h.id;
                }
                links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
            };
            window.addEventListener("scroll", spy, { passive: true });
            spy();
        }
    }
});
