// ==UserScript==
// @name         BGA lobby hide Carcassonne expansions
// @description  Removes Carcassonne tables with expansions, Strategic variant or 3+ players from game lobby, so baically anything but 2p Standard.
// @match        https://*.boardgamearena.com/lobby
// @icon         https://x.boardgamearena.net/data/themereleases/231110-1000/img/logo/logo.png
// @namespace    https://github.com/yzemaze/bga-scripts/
// @homepageURL  https://github.com/yzemaze/bga-scripts/tree/main/carcassonne
// @supportURL   https://github.com/yzemaze/bga-scripts/issues
// @downloadURL  https://github.com/yzemaze/bga-scripts/raw/main/carcassonne/lobby-hide-cce.user.js
// @updateURL    https://github.com/yzemaze/bga-scripts/raw/main/carcassonne/lobby-hide-cce.user.js
// @version      0.2
// @author       yzemaze
// @license      GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

"use strict";
const stopTerms = ["The River", "Inns & Cathedrals", "Traders & Builders", "The Princess & the Dragon", "Strategic variant"];

function checkTable(table) {
	if (
		stopTerms.some(term => table.querySelector(".table_top_status_detailed")?.innerText.includes(term))
		|| (table.querySelectorAll(".tableplace").length > 2)
	) {
		table.style.display = "none";
		console.log("table hidden:", table.querySelectorAll(".tableplace").length, "p, options:", table.querySelector(".table_top_status_detailed")?.innerText);
	}
}

const logObserver = new MutationObserver((mutations) => {
	if (mutations[0].addedNodes[0]) {
		checkTable(mutations[0].addedNodes[0]);
	}
});

async function waitForElement(selector) {
	while (!document.querySelector(selector)) {
		await new Promise(resolve => requestAnimationFrame(resolve));
	}
	return document.querySelector(selector);
}

(async () => {
	const gamelist = await waitForElement("#Xannaplay_tables_list_1");
	const table = await waitForElement(".gametable_game_1");
	const tables = document.querySelectorAll(".gametable_game_1");
	if (tables.length > 0) {
		for (const table of tables) {
			checkTable(table);
		}
	}
	logObserver.observe(gamelist, {
		childList: true,
		subtree: true,
	});
})();
