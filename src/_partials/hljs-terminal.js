// Registers a "terminal" language with blargh's highlight.js, for terminal
// sessions in posts. Lines starting with a prompt (❯, user@host:dir$ or
// bash-5.2#) get the prompt coloured and the command highlighted as bash;
// every other line is command output and stays muted.
//
// Use it from a post: <% require(path.resolve(path.dirname(inputPath), "../../_partials/hljs-terminal.js")) %>
// then fence terminal blocks with ```terminal.
// Must be the same highlight.js instance blargh loaded, wherever blargh is
// installed, so take it from the module cache.
const loaded = Object.keys(require.cache).find(k => /[\\/]highlight\.js[\\/]lib[\\/]index\.js$/.test(k));
if (!loaded) throw new Error("hljs-terminal: blargh's highlight.js is not loaded");
const hljs = require(loaded);

if (!hljs.getLanguage("terminal")) {
	hljs.registerLanguage("terminal", () => ({
		name: "terminal",
		contains: [
			{
				scope: "meta.prompt",
				begin: /^(?:❯ |[\w.-]+@[\w.-]+:\S*[$#] |bash-[\d.]+# )/m,
				// The command runs to the end of the line, or further if the
				// line ends with a backslash continuation.
				starts: { end: /[^\\](?=\s*$)/, subLanguage: "bash" },
			},
		],
	}));
}

module.exports = hljs;
