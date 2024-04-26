# BGA Carcassonne scripts

## Just show me …
![screenshot_board](/carcassonne/img/screenshot-board.png?raw=true)
1) <a href="highlight-discards.user.js">Highlight discard messages</a> in the log.
2) <a href="highlight-discards.user.js">Show discarded tiles</a> permanently.
3) <a href="log-tiles-fix.user.styl">Fix distorted tiles</a> in the log (and if desired align them to the right).
4) Select <a href="tile-borders.user.styl">border width and colors</a> for last placed tiles.
5) Add a <a href="starting-player-tag.user.js">starting player icon</a>.

6) Replace second edition tiles everywhere with the <a href="original-tiles.user.styl">original tiles</a>.
7) <a href="mobile-condensed-playerboards.user.styl">Shrink playerboards on mobile devices</a> or smaller windows (<= 960 px).
8) <a href="lobby-hide-cce.user.js">Hide games with expansions</a> or 3+ players from the game lobby.

## Prerequisites
<a href="https://violentmonkey.github.io/">Violentmonkey</a> or the like for .user.js-files. <a href="/highlight-discard.user.js">highlight-discard.user.js</a> has a tiny config section. Please edit the discard string according to the language you use on BGA.
<a href="https://github.com/openstyles/stylus#readme">Stylus</a> or some other way to apply .user.styl-files. Config is done within Stylus:
![screenshot_stylus.png](/carcassonne/img/screenshot-stylus.png?raw=true)

## Problems? Ideas?
All scripts were designed and tested for 2p-Carcassonne without expansions. They should work fine with more players and expansions, though. Some edges might still be rough (cf. version numbers ;) ). So if you encounter any problems please let me know. Either open an issue or contact me on BGA. Same goes if you’d like to see specific improvements.

## Anything else?
Check out the <a href="https://github.com/yzemaze/bga-scripts">general scripts</a>, especially if you review many games or would like a more compact game lobby.
