/*
 * Menu state
 * ==========
 *
 */

export default class Menu extends Phaser.State {

  create() {
    // TODO: Stub
      $('#btn-start').on('click', () => {
          $('#menu').hide();
          $('#game').show();
          this.state.start('Game');
      });
  }

  update() {
    // TODO: Stub
  }

}
