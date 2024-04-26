// ==UserScript==
// @name          BGA Carcassonne highlight discarded tiles
// @description   Highlights a discard in the log and displays discarded tiles below remaining tiles text
// @match         https://*.boardgamearena.com/archive/replay/*
// @match         https://*.boardgamearena.com/*/carcassonne*
// @icon          https://x.boardgamearena.net/data/themereleases/231110-1000/img/logo/logo.png
// @namespace     https://github.com/yzemaze/bga-scripts/
// @homepageURL   https://github.com/yzemaze/bga-scripts/
// @supportURL    https://github.com/yzemaze/bga-scripts/
// @downloadURL   https://github.com/yzemaze/bga-scripts/raw/master/carcassonne/highlight-discards.user.js
// @updateURL     https://github.com/yzemaze/bga-scripts/raw/master/carcassonne/highlight-discards.user.js
// @version       0.3
// @author        yzemaze
// @license       GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

"use strict";
// CONFIG
// change official translations in discardMsgs or add to them
// cf. https://boardgamearena.com/translation?module_id=1&source_locale=en_US&dest_locale=en_US&findtype=all&find=cannot%20play%20and%20discards
const discardMsgs = ["cannot play and discards", "kann das Plättchen nicht anlegen und wirft es ab"];
// adjust to your preference
const discardText = "Discarded: ";
const highlightColor = "yellow";
// CONFIG END

const discardDiv = document.createElement("div");
discardDiv.setAttribute("id", "discard_block");
discardDiv.style.display = "none";
const discardSpan = document.createElement("span");
discardSpan.append(discardText);
const discardStyle = {
	display: "inline-block",
	position: "relative",
	left: "auto",
	top: "5px",
	margin: "2px 0 0 2px",
};

const logObserver = new MutationObserver(() => {
	discardDiv.textContent = '';
	discardDiv.append(discardSpan);
	const logMsgs = document.getElementsByClassName("log_replayable");
	for (const logMsg of logMsgs) {
		if (discardMsgs.some(d => logMsg.textContent.includes(d))) {
			logMsg.childNodes[0].setAttribute("style", "background-color: " + highlightColor + ";");
			const discardTile = logMsg.getElementsByClassName("tile_art")[0].cloneNode(true);
			Object.assign(discardTile.style, discardStyle);
			// current tile size changes when zooming
			const tileSize = document.getElementById("tile_art_current").style.height;
			discardTile.style.height = tileSize;
			discardTile.style.width = tileSize;
			discardDiv.style.display = "block";
			discardDiv.append(discardTile);
			document.querySelector("#remainingblock").append(discardDiv);
		}
	}
});

async function waitForElement(selector) {
  while (!document.querySelector(selector)) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
}

(async () => {
  const el = await waitForElement("#logs");
  logObserver.observe(el, {
    childList: true,
  });
})();
