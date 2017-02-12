/*
 * Menu state
 * ==========
 *
 */

export default class Menu extends Phaser.State {

  create() {
      $('#game-header').addClass('animate');
      $('#menu').show();

      $('#btn-start').on('click', () => {
          $('#btn-start').off('click');
          $('#menu').hide();
          $('#game').addClass('animate');
          $('#over').hide();
          this.state.start('Game');
      });
  }

  update() {
    // TODO: Stub
  }

}
