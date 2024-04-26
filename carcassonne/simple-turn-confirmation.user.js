// ==UserScript==
// @name         BGA Carcassonne simple turn confirmation
// @description  Use right click to trigger tile placement and no partisan confirmation without mouse movement.
// @match        https://*.boardgamearena.com/archive/replay/*
// @match        https://*.boardgamearena.com/*/carcassonne*
// @icon         https://x.boardgamearena.net/data/themereleases/231110-1000/img/logo/logo.png
// @namespace    https://github.com/yzemaze/bga-scripts/
// @homepageURL  https://github.com/yzemaze/bga-scripts/tree/main/carcassonne
// @supportURL   https://github.com/yzemaze/bga-scripts/issues
// @downloadURL  https://github.com/yzemaze/bga-scripts/raw/main/carcassonne/simple-turn-confirmation.user.js
// @version      0.3
// @author       yzemaze
// @license      GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

"use strict";
document.addEventListener("contextmenu", function(ev) {
	ev.preventDefault();
	try {
		document.getElementById("action_confirm").click();
	} catch (error) {
		try {
			document.getElementById("action_no_partisan").click();
		}
		catch (error) {
			console.log("no action to confirm or skip");
		}
	}
}, false);
