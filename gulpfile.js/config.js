/*
 * Tasks configuration
 * ===================
 */

'use strict';

// Where this project source code lives.
const SRC = 'src';

// Where final distribution files will be copied.
const DIST = 'docs';

// Where compiled scripts will be placed.
const BUILD = 'build';

// Where static assets (textures, fonts, sprites, sounds etc.) live.
const STATIC = 'static';

// Where bundled Phaser CE builds are located.
const PHASER_BUILDS = 'node_modules/phaser-ce/build';

const JQUERY_BUILDS = 'node_modules/jquery/dist';

// Which Phaser build was selected to develop the game.
//
// Available options:
// *  .../phaser.js: The standard one, with both Arcade and P2 Physics.
// *  .../custom/phaser-arcade-physics.js: Including only Arcade Physics.
// *  .../custom/phaser-no-physics.js: No physics engines included.
//
// Note: Other features are missing in the 'no physics' build, like Tilemaps.
//    If you're getting exceptions when trying to create these game objects,
//    change to another build option listed above.
const PHASER = `${PHASER_BUILDS}/phaser.js`;
const JQUERY = `${JQUERY_BUILDS}/jquery.js`;

// Build output directories.
exports.dirs = {
    build: BUILD,
    dist: DIST
};

// File paths and glob patterns.
exports.files = {
    // Finds this project static assets to be copied for distribution.
    assets: `${STATIC}/**`,

    // Finds the scripts to be compiled.
    scripts: `${SRC}/**/*.js`,

    // The selected Phaser script.
    phaser: PHASER,
    jquery: JQUERY
};

// The Browserify settings.
exports.bundle = {
    debug: true,
    standalone: 'app',
    entries: [`${SRC}/app.js`]
};

// The BrowserSync settings.
exports.server = {
    // Settings for the development server.
    dev: {
        server: {
            baseDir: [STATIC, BUILD],
            routes: {
                '/jquery.js': JQUERY,
                '/phaser.js': PHASER
            }
        },
        ghostMode: false,
        notify: false,
        ui: false
    },
    // Settings for testing the application bundled for distribution. Used when
    // running the `test-dist` npm script.
    dist: {
        server: DIST,
        port: 8080,
        ghostMode: false,
        notify: false,
        ui: false
    }
};
