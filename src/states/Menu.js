/*
 * Menu state
 * ==========
 *
 */

export default class Menu extends Phaser.State {

  create() {
      $('#game-header').addClass('animate');
      $('#menu').show();
      $('#menu .menu-text').addClass('animate');

      $('#btn-start').on('click', () => {
          $('#btn-start').off('click');
          setTimeout(() => {
              $('#menu .menu-text').removeClass('animate');
              $('#menu').hide();
              $('#game').addClass('animate');
              $('#over').hide();
              this.state.start('Game');
          }, 600);
      });
  }

  update() {
    // TODO: Stub
  }

}
