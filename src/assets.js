/*
 * `assets` module
 * ===============
 *
 * Declares static asset packs to be loaded using the `Phaser.Loader#pack`
 * method. Use this module to declare game assets.
 */

export default {
    // -- Splash screen assets used by the Preloader.
    boot: [{
        key: 'splash-screen',
        type: 'image'
    }, {
        key: 'progress-bar',
        type: 'image'
    }],

    // -- General assets used throughout the game.
    game: [{
        key: 'phaser',
        type: 'image'
    },{
        key: 'level',
        type: 'tilemap',
        url: 'level.json',
        format: 'TILED_JSON'

    },{
        key: 'spritesheet',
        type: 'image'
    }]
};
