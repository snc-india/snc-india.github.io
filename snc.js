/* SNC India premium front-end (static).
   Tip for deployment: replace the image file:// paths with web-hosted relative URLs. */

(() => {
	"use strict";

	// Absolute paths from the provided workspace assets.
	const ASSETS = {
	logo: "Images/main_logo.jpeg",			// add images here
	gst: "Images/gst_info.jpeg",
	how1: "Images/howto1.jpeg",
	how2: "Images/howto2.jpeg",
	how3: "Images/howto3.jpeg",
	how4: "Images/howto4.jpeg",
	};

	const asset = (key) => ASSETS[key];

	const bindImages = () => {
		const brandLogo = document.getElementById("brandLogo");
		const footerLogo = document.getElementById("footerLogo");
		const gstImage = document.getElementById("gstImage");

		const how1 = document.getElementById("how1");
		const how2 = document.getElementById("how2");
		const how3 = document.getElementById("how3");
		const how4 = document.getElementById("how4");

		if (how1) how1.src = asset("how1");
		if (how2) how2.src = asset("how2");
		if (how3) how3.src = asset("how3");
		if (how4) how4.src = asset("how4");

		if (brandLogo) brandLogo.src = asset("logo");
		if (footerLogo) footerLogo.src = asset("logo");
		if (gstImage) gstImage.src = asset("gst");

	};

	let revealObserver = null;
	const initReveal = () => {
		const nodes = Array.from(document.querySelectorAll(".reveal"));
		revealObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) entry.target.classList.add("in-view");
				}
			},
			{ threshold: 0.14 }
		);
		nodes.forEach((n) => revealObserver.observe(n));
	};

	const initSpotlight = () => {
		const root = document.documentElement;
		let raf = null;
		let lx = 0;
		let ly = 0;

		const step = () => {
			raf = null;
			const w = window.innerWidth || 1;
			const h = window.innerHeight || 1;
			const mx = (lx / w) * 100;
			const my = (ly / h) * 100;
			root.style.setProperty("--mx", `${mx.toFixed(2)}%`);
			root.style.setProperty("--my", `${my.toFixed(2)}%`);
		};

		window.addEventListener(
			"mousemove",
			(e) => {
				lx = e.clientX;
				ly = e.clientY;
				if (raf) return;
				raf = window.requestAnimationFrame(step);
			},
			{ passive: true }
		);
	};

	const initContactLinks = () => {
	const phone = "+916352112727";
	const email = "sncindia224@gmail.com";

	const phoneLink = document.getElementById("phoneLink");
	const emailLink = document.getElementById("emailLink");
	const callBtn = document.getElementById("callBtn");
	const mailBtn = document.getElementById("mailBtn");

	if (phoneLink) phoneLink.href = `tel:${phone}`;
	if (callBtn) callBtn.href = `tel:${phone}`;

	if (emailLink) emailLink.href = `mailto:${email}`;
	if (mailBtn) mailBtn.href = `mailto:${email}`;
	};

	const initNav = () => {
	const btn = document.querySelector(".nav-toggle");
	const nav = document.querySelector(".nav");

	if (!btn || !nav) return;

	btn.addEventListener("click", () => {
		nav.classList.toggle("open");
	});
	};

	const initYear = () => {
	const y = document.getElementById("year");
	if (y) y.textContent = new Date().getFullYear();
	};


	const PRODUCTS = [
	{
		title: "S-111 Tile Adhesive",
		subtitle: "Standard strength adhesive",
		category: "adhesives",
		image: "Images/use3.jpeg",
		tags: ["Standard"],
	},
	{
		title: "S-333 Tile Adhesive",
		subtitle: "Polymer modified adhesive",
		category: "adhesives",
		image: "Images/use2.jpeg",
		tags: ["Premium"],
	},
	{
		title: "S-555 Tile/Stone Adhesive",
		subtitle: "High strength bonding",
		category: "adhesives",
		image: "Images/use1.jpeg",
		tags: ["Strong"],
	},
	{
		title: "S-777 Tile/Slab Adhesive",
		subtitle: "Heavy duty slab adhesive",
		category: "adhesives",
		image: "Images/use4.jpeg",
		tags: ["Heavy Duty"],
	},
	{
		title: "S-555 Tile/Stone Adhesive",
		subtitle: "High strength bonding",
		category: "adhesives",
		image: "Images/type1.jpeg",
		tags: ["Strong"],
	},
	{
		title: "S-777 Tile/Slab Adhesive",
		subtitle: "Heavy duty slab adhesive",
		category: "adhesives",
		image: "Images/type2.jpeg",
		tags: ["Heavy Duty"],
		},
	{
		title: "S-999 Tile/Slab Adhesive",
		subtitle: "Heavy duty slab adhesive",
		category: "adhesives",
		image: "Images/howto1.jpeg",
		tags: ["Heavy Duty"],
		},
		];

	const renderProducts = (filter = "all") => {
	const grid = document.getElementById("productGrid");
	if (!grid) return;

	grid.innerHTML = "";

	const filtered = PRODUCTS.filter(p => filter === "all" || p.category === filter);

	filtered.forEach(p => {
		const card = document.createElement("div");
		card.className = "product-card";

		card.innerHTML = `
			<div class="product-media">
				<img src="${p.image}" alt="${p.title}">
			</div>
			<div class="product-meta">
				<h3 class="product-title">${p.title}</h3>
				<p class="product-subtitle">${p.subtitle}</p>
				<div class="tag-row">
					${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
				</div>
			</div>
		`;

		grid.appendChild(card);
	});
	};

	const initFilters = () => {
	const buttons = document.querySelectorAll(".tool-btn");

	buttons.forEach(btn => {
		btn.addEventListener("click", () => {
			document.querySelector(".tool-btn.is-active")?.classList.remove("is-active");
			btn.classList.add("is-active");

			const filter = btn.dataset.filter;
			renderProducts(filter);
		});
	});
	};

	const initProductModal = () => {
	const modal = document.getElementById("modal");
	const modalImage = document.getElementById("modalImage");
	const modalTitle = document.getElementById("modalTitle");
	const modalSubtitle = document.getElementById("modalSubtitle");
	const modalBullets = document.getElementById("modalBullets");

	document.addEventListener("click", (e) => {
		const card = e.target.closest(".product-card");
		if (!card) return;

		const title = card.querySelector(".product-title").innerText;
		const subtitle = card.querySelector(".product-subtitle").innerText;
		const img = card.querySelector("img").src;

		modalImage.src = img;
		modalTitle.textContent = title;
		modalSubtitle.textContent = subtitle;

		modalBullets.innerHTML = `
			<li>High quality material</li>
			<li>Suitable for professional use</li>
			<li>Reliable performance</li>
		`;

		modal.classList.add("is-open");
	});

	// Close modal
	document.querySelectorAll("[data-close]").forEach(el => {
		el.addEventListener("click", () => {
			modal.classList.remove("is-open");
		});
	});
	};

	const initHeroSlider = () => {
	const slider = document.getElementById("heroSlider");
	if (!slider) return;

	const slides = slider.querySelectorAll("img");
	let index = 0;

	setInterval(() => {
		slides[index].classList.remove("active");

		index = (index + 1) % slides.length;

		slides[index].classList.add("active");
	}, 2500); // speed like your video
	};

	const init = () => {
	bindImages();
	initReveal();
	initSpotlight();
	initContactLinks();
	initYear();
	initNav();
	renderProducts();
	initFilters();
	initProductModal();
	initHeroSlider()
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}

})();