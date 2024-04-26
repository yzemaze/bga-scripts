// ==UserScript==
// @name         BGA starting player tag
// @description  Denotes starting player with a little power icon (+ title).
// @match        https://*.boardgamearena.com/archive/replay/*
// @match        https://*.boardgamearena.com/*/*table*
// @icon         https://x.boardgamearena.net/data/themereleases/231110-1000/img/logo/logo.png
// @namespace    https://github.com/yzemaze/bga-scripts/
// @homepageURL  https://github.com/yzemaze/bga-scripts/
// @supportURL   https://github.com/yzemaze/bga-scripts/issues
// @downloadURL  https://github.com/yzemaze/bga-scripts/raw/main/starting-player-tag.user.js
// @updateURL    https://github.com/yzemaze/bga-scripts/raw/main/starting-player-tag.user.js
// @version      0.1
// @author       yzemaze
// @license      GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

"use strict";
function getStartPlayerNameFromLog() {
	for (const log of ['log_0', 'log_1', 'log_2']) {
		const playerName = document.getElementById(log).querySelector(".playername")?.textContent;
		if (typeof playerName === "string") {
			return playerName;
		}
	}
}

const logObserver = new MutationObserver(() => {
	const startPlayerIcon = document.createElement('i');
	startPlayerIcon.className = "fa fa-power-off";
	startPlayerIcon.title = "starting player";
	startPlayerIcon.id = "starting_player_icon";
	const startPlayerName = getStartPlayerNameFromLog();
	for (const playerDiv of document.getElementsByClassName("player-board")) {
		const playerNameDiv = playerDiv.querySelector(".player-name");
		if (startPlayerName == playerNameDiv?.textContent.trim()) {
			playerNameDiv.parentNode.insertBefore(startPlayerIcon, playerNameDiv);
			playerNameDiv.style.display = "inline";
			logObserver.disconnect();
		}
	}
});

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
		const logs = document.getElementById("logs");
		logObserver.observe(logs, {
            childList: true,
        });
    }
});

