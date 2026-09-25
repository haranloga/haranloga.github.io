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

    // Filterable lists (Writing, Projects): search + category + tag + sort,
    // mirrored in the URL (?q=&category=&tag=&sort=) so filtered views can be linked
    document.querySelectorAll("[data-listing]").forEach((listing) => {
        const controls = listing.querySelector("[data-listing-controls]");
        const root = listing.querySelector("[data-listing-items]");
        if (!controls || !root) return;
        const items = Array.from(root.querySelectorAll("[data-item]"));
        const groups = Array.from(root.querySelectorAll("[data-group]"));
        const search = controls.querySelector("[data-filter-search]");
        const catButtons = Array.from(controls.querySelectorAll("[data-category]"));
        const picker = controls.querySelector("[data-tag-picker]");
        const tagButtons = Array.from(controls.querySelectorAll("[data-tag]"));
        const tagSearch = controls.querySelector("[data-tag-search]");
        const tagNone = controls.querySelector("[data-tag-none]");
        const activeBar = controls.querySelector("[data-active-filters]");
        const countEl = controls.querySelector("[data-result-count]");
        const sortEl = controls.querySelector("[data-sort]");
        const emptyEl = listing.querySelector("[data-listing-empty]");
        const noun = [controls.dataset.noun || "item", controls.dataset.nounPlural || "items"];

        const params = new URLSearchParams(location.search);
        const state = {
            q: params.get("q") || "",
            category: params.get("category") || "",
            tag: params.get("tag") || "",
            sort: params.get("sort") === "old" ? "old" : "new",
        };
        // Ignore values that don't exist on this page (e.g. an old link)
        if (!catButtons.some((b) => b.dataset.category === state.category)) state.category = "";
        if (!tagButtons.some((b) => b.dataset.tag === state.tag)) state.tag = "";

        const labelFor = (buttons, attr, value) => {
            const b = buttons.find((x) => x.dataset[attr] === value);
            return b ? b.dataset.label || value : value;
        };

        const syncUrl = () => {
            const p = new URLSearchParams();
            if (state.q) p.set("q", state.q);
            if (state.category) p.set("category", state.category);
            if (state.tag) p.set("tag", state.tag);
            if (state.sort === "old") p.set("sort", "old");
            const qs = p.toString();
            history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
        };

        const renderActive = () => {
            const chips = [];
            if (state.category) chips.push(["category", "Category", labelFor(catButtons, "category", state.category)]);
            if (state.tag) chips.push(["tag", "Tag", labelFor(tagButtons, "tag", state.tag)]);
            if (state.q) chips.push(["q", "Search", "“" + state.q + "”"]);
            activeBar.hidden = chips.length === 0;
            activeBar.innerHTML = "";
            chips.forEach(([key, kind, label]) => {
                const b = document.createElement("button");
                b.type = "button";
                b.className = "active-chip";
                b.dataset.remove = key;
                b.setAttribute("aria-label", "Remove " + kind.toLowerCase() + " filter " + label);
                b.innerHTML = '<span class="active-chip__kind"></span><span class="active-chip__label"></span><span aria-hidden="true">×</span>';
                b.querySelector(".active-chip__kind").textContent = kind;
                b.querySelector(".active-chip__label").textContent = label;
                activeBar.appendChild(b);
            });
            if (chips.length > 1) {
                const clear = document.createElement("button");
                clear.type = "button";
                clear.className = "text-button";
                clear.dataset.clearFilters = "";
                clear.textContent = "Clear all";
                activeBar.appendChild(clear);
            }
        };

        const applySort = () => {
            const dir = state.sort === "old" ? 1 : -1;
            const byDate = (a, b) => dir * String(a.dataset.date || a.querySelector("[data-date]")?.dataset.date || "").localeCompare(String(b.dataset.date || b.querySelector("[data-date]")?.dataset.date || ""));
            if (groups.length) {
                groups.forEach((g) => {
                    const ul = g.querySelector("ul");
                    Array.from(ul.children).sort(byDate).forEach((li) => ul.appendChild(li));
                });
                groups.sort(byDate).forEach((g) => root.appendChild(g));
            } else {
                items.slice().sort(byDate).forEach((el) => root.appendChild(el.closest("li") || el));
            }
        };

        const apply = () => {
            const terms = state.q.toLowerCase().trim().split(/\s+/).filter(Boolean);
            let visible = 0;
            items.forEach((item) => {
                const haystack = item.dataset.search || "";
                const tags = (item.dataset.tags || "").split("|");
                const match =
                    terms.every((t) => haystack.includes(t)) &&
                    (!state.category || item.dataset.category === state.category) &&
                    (!state.tag || tags.includes(state.tag));
                (item.closest("li") || item).hidden = !match;
                if (match) visible++;
            });
            groups.forEach((g) => {
                g.hidden = !g.querySelector("li:not([hidden])");
            });
            const filtered = terms.length || state.category || state.tag;
            countEl.textContent = filtered
                ? `${visible} of ${items.length} ${items.length === 1 ? noun[0] : noun[1]}`
                : `${items.length} ${items.length === 1 ? noun[0] : noun[1]}`;
            if (emptyEl) emptyEl.hidden = visible !== 0;
            catButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.category === state.category)));
            tagButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tag === state.tag)));
            if (picker) picker.classList.toggle("is-active", !!state.tag);
            renderActive();
            syncUrl();
        };

        const clearAll = () => {
            state.q = state.category = state.tag = "";
            search.value = "";
            apply();
        };

        search.value = state.q;
        if (sortEl) sortEl.value = state.sort;

        search.addEventListener("input", () => {
            state.q = search.value.trim();
            apply();
        });
        search.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                search.value = "";
                state.q = "";
                apply();
                search.blur();
            }
        });

        catButtons.forEach((b) =>
            b.addEventListener("click", () => {
                state.category = b.dataset.category;
                apply();
            })
        );

        tagButtons.forEach((b) =>
            b.addEventListener("click", () => {
                state.tag = state.tag === b.dataset.tag ? "" : b.dataset.tag;
                if (picker) picker.open = false;
                apply();
            })
        );

        if (tagSearch) {
            tagSearch.addEventListener("input", () => {
                const q = tagSearch.value.toLowerCase().trim();
                let shown = 0;
                tagButtons.forEach((b) => {
                    const hit = !q || (b.dataset.label || "").toLowerCase().includes(q);
                    b.hidden = !hit;
                    if (hit) shown++;
                });
                if (tagNone) tagNone.hidden = shown !== 0;
            });
        }

        if (picker) {
            picker.addEventListener("toggle", () => {
                if (picker.open && tagSearch && window.matchMedia("(pointer: fine)").matches) tagSearch.focus();
            });
            document.addEventListener("click", (e) => {
                if (picker.open && !picker.contains(e.target)) picker.open = false;
            });
            picker.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    picker.open = false;
                    picker.querySelector("summary").focus();
                }
            });
        }

        if (sortEl) {
            sortEl.addEventListener("change", () => {
                state.sort = sortEl.value === "old" ? "old" : "new";
                applySort();
                syncUrl();
            });
        }

        listing.addEventListener("click", (e) => {
            const remove = e.target.closest("[data-remove]");
            if (remove) {
                const key = remove.dataset.remove;
                state[key] = "";
                if (key === "q") search.value = "";
                apply();
                return;
            }
            if (e.target.closest("[data-clear-filters]")) clearAll();
        });

        if (state.sort === "old") applySort();
        apply();
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
