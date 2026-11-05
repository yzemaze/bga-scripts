// ==UserScript==
// @name         BGA History Link
// @namespace    bga-history-link
// @version      0.1.2
// @description  add a History link to the BGA player menu if you have turn based tables
// @match        https://boardgamearena.com/*
// @match        https://*.boardgamearena.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
	"use strict";

	const containerSelector = ".bga-player-menu__bottom div.flex.items-center.justify-center.flex-wrap.gap-2.p-2";

	function hasGamestatsLink(container) {
		return Array.from(container.querySelectorAll("a[href]")).some((a) => new URL(a.href).pathname === "/gamestats");
	}

	function insertLinks() {
		document.querySelectorAll(containerSelector).forEach((container) => {
			if (hasGamestatsLink(container)) {
				return;
			}
			const link = document.createElement("a");
			link.className = "bgabutton bgabutton_blue close-menus";
			link.href = "/gamestats";
			link.textContent = "History";
			container.prepend(link);
		});
	}

	// the player menu is rendered lazily, so watch for it
	new MutationObserver(insertLinks).observe(document.body, { childList: true, subtree: true });
	insertLinks();
})();
