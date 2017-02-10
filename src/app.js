/*
 * `app` module
 * ============
 *
 * Provides the game initialization routine.
 */

// Required: import the Babel runtime module.
import 'babel-polyfill';

// Import game states.
import * as states from './states';

export function init() {
    const game = new Phaser.Game(1280, 720, Phaser.AUTO);

    // Dynamically add all required game states.
    Object
        .entries(states)
        .forEach(([key, state]) => game.state.add(key, state));

    game.state.start('Boot');

    return game;
}
