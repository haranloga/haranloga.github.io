(function () {
	var containers = document.querySelectorAll('.pdf-viewer[data-pdf-src]');
	if (!containers.length) return;

	function base64ToUint8Array(b64) {
		var binStr = atob(b64);
		var len = binStr.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);
		return bytes;
	}

	function renderPage(pdf, num, canvas, containerWidth) {
		pdf.getPage(num).then(function (page) {
			var unscaled = page.getViewport({ scale: 1 });
			var scale = Math.min(2.2, containerWidth / unscaled.width);
			var viewport = page.getViewport({ scale: scale });
			var ctx = canvas.getContext('2d');
			var ratio = window.devicePixelRatio || 1;
			canvas.width = Math.floor(viewport.width * ratio);
			canvas.height = Math.floor(viewport.height * ratio);
			canvas.style.width = viewport.width + 'px';
			canvas.style.height = viewport.height + 'px';
			ctx.scale(ratio, ratio);
			page.render({ canvasContext: ctx, viewport: viewport }).promise.catch(function (err) {
				console.error('PDF page render failed', err);
			});
		});
	}

	function init() {
		var pdfjsLib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;
		pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
		containers.forEach(function (container) {
			var pagesEl = container.querySelector('.pdf-viewer__pages');
			var statusEl = container.querySelector('.pdf-viewer__status');
			var containerWidth = pagesEl.clientWidth || 700;

			fetch(container.getAttribute('data-pdf-src')).then(function (res) {
				if (!res.ok) throw new Error('PDF data request failed: ' + res.status);
				return res.text();
			}).then(function (b64) {
				return pdfjsLib.getDocument({ data: base64ToUint8Array(b64.trim()) }).promise;
			}).then(function (pdf) {
				if (statusEl) statusEl.remove();
				var observer = new IntersectionObserver(
					function (entries) {
						entries.forEach(function (entry) {
							if (entry.isIntersecting) {
								var canvas = entry.target;
								observer.unobserve(canvas);
								renderPage(pdf, +canvas.dataset.page, canvas, containerWidth);
							}
						});
					},
					{ rootMargin: '800px 0px' }
				);
				for (var i = 1; i <= pdf.numPages; i++) {
					var canvas = document.createElement('canvas');
					canvas.className = 'pdf-viewer__page';
					canvas.dataset.page = i;
					canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
					canvas.addEventListener('dragstart', function (e) { e.preventDefault(); });
					pagesEl.appendChild(canvas);
					observer.observe(canvas);
				}
			}).catch(function (err) {
				if (statusEl) statusEl.textContent = 'Could not load the PDF preview.';
				console.error(err);
			});
		});
	}

	function load() {
		if (window.pdfjsLib || window['pdfjs-dist/build/pdf']) {
			init();
		} else {
			var script = document.createElement('script');
			script.src = '/pdfjs/pdf.min.mjs';
			script.onload = init;
			document.head.appendChild(script);
		}
	}

	// The report data is several MB, so wait until a viewer is near the screen
	var nearObserver = new IntersectionObserver(function (entries) {
		if (entries.some(function (e) { return e.isIntersecting; })) {
			nearObserver.disconnect();
			load();
		}
	}, { rootMargin: '1200px 0px' });
	containers.forEach(function (c) { nearObserver.observe(c); });
})();
