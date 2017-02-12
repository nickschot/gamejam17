/*
 * Over state
 * ==========
 *
 */

export default class Over extends Phaser.State {

  create() {
      $('#over').show();

      $('#btn-over').on('click', () => {
          $('#game-header').removeClass('animate');
          $('#btn-over').off('click');
          $('#menu').show();
          $('#game').removeClass('animate');
          $('#over').hide();
          this.state.start('Menu');
      });
  }

  update() {
    // TODO: Stub
  }

}
