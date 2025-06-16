// ==UserScript==
// @name         BGA replay with keys
// @description  Keyboard support for replays. For keys/shortcuts please see comments in the code or replay-with-keys-shortcuts.txt.
// @match        https://*.boardgamearena.com/archive/replay/*
// @icon         https://x.boardgamearena.net/data/themereleases/231110-1000/img/logo/logo.png
// @namespace    https://github.com/yzemaze/bga-scripts/
// @homepageURL  https://github.com/yzemaze/bga-scripts/
// @supportURL   https://github.com/yzemaze/bga-scripts/issues
// @downloadURL  https://github.com/yzemaze/bga-scripts/raw/main/replay-with-keys.user.js
// @grant        none
// @version      0.5.2
// @author       yzemaze
// @license      GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

// keycodes references: https://uiwjs.github.io/keycode-info/
// https://www.toptal.com/developers/keycode/table
// keycodes used by BGA for Carcassonne at least: Home = center board, End = fit board to display area, Arrowkeys = move board

"use strict";
function keyModifierPressed(e) {
	return (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) ? true : false;
}

function keyCheck(e) {
	const el = document.activeElement;
	if (el && (el.tagName.toLowerCase() == 'input' && el.type == 'text' || el.tagName.toLowerCase() == 'textarea')) {
		switch (e.keyCode) {
			case 27:
				// esc: close dialog
				document.getElementById("popin_askforvalue_dialog_close")?.click();
				document.getElementById("newArchiveCommentCancel")?.click();
				break;
		}
	} else {
		switch (e.keyCode) {
			case 72:
				if (e.ctrlKey && e.altKey) {
					// ctrl+alt+h: Game history back to top
					document.getElementById("archive_history_backtotop")?.click();
				} else if (!keyModifierPressed(e)) {
					// h: Show game history
					document.getElementById("archive_history")?.click();
				}
				break;
			case 36:
				if (e.ctrlKey && e.altKey) {
					// ctrl+alt+Home: Go back to first move
					e.preventDefault();
					window.location.reload();
				}
				break;
			case 70:
				if (!keyModifierPressed(e)) {
					// f: Next visible change
					document.getElementById("archive_nextlog")?.click();
				}
				break;
			case 68:
				if (!keyModifierPressed(e)) {
					// d: Next move
					document.getElementById("archive_next")?.click();
				}
				break;
			case 35:
				if (e.ctrlKey && e.altKey) {
					// ctrl+alt+End: Go to end of game
					document.getElementById("archive_end_game")?.click();
					document.getElementById("go_to_game_end_slow")?.click();
				} else if (e.ctrlKey && e.shiftKey) {
					// ctrl+shift+End: Go to end of game fast
					// ctrl+End: scrollmap autofit
					document.getElementById("archive_end_game")?.click();
					document.getElementById("go_to_game_end_fast")?.click();
				}
				break;
			case 88:
			case 78:
				if (!keyModifierPressed(e)) {
					// x or n: Go to next player's turn
					document.getElementById("archive_end_game")?.click();
					document.getElementById("go_to_new_turn")?.click();
				}
				break;
			case 77:
				if (e.ctrlKey && e.altKey) {
					// ctrl+alt+m: Go to specific move
					document.getElementById("archive_end_game")?.click();
					document.getElementById("go_to_specific_move_slow")?.click();
				} else if (!keyModifierPressed(e)) {
					// m: Go to specific move (fast)
					e.preventDefault();
					document.getElementById("archive_end_game")?.click();
					document.getElementById("go_to_specific_move")?.click();
				}
				break;
			case 67:
				if (e.ctrlKey && e.altKey) {
					// ctrl+alt+c: Add a comment
					document.getElementById("archive_addcomment")?.click();
				} else if (!keyModifierPressed(e)) {
					// c: Go to next comment
					document.getElementById("archive_go_to_nextComment")?.click();
				}
				break;
			case 27:
				// esc: close dialog
				document.getElementById("popin_askforvalue_dialog_close")?.click();
				document.getElementById("newArchiveCommentCancel")?.click();
				break;
			case 76:
				// l: add deep link to move-number
				addLinkToMoveNumber();
		}
	}
}

function addLinkToMoveNumber() {
  const element = document.getElementById('move_nbr');
	const move = element.textContent.trim();
	if (!isNaN(move) && move !== "") {
		const url = new URL(window.location.href);
		url.searchParams.set('goto', move);
		const link = document.createElement('a');
		link.href = url.toString();
		link.textContent = move;
		link.target = '_blank';
		element.innerHTML = '';
		element.appendChild(link);
	}
}

document.addEventListener("readystatechange", event => {
	if (event.target.readyState === "complete") {
		document.getElementById("advanced_replay_features").click();
		document.addEventListener("keydown", keyCheck, true);
	}
});
