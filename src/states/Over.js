/*
 * Over state
 * ==========
 *
 */

export default class Over extends Phaser.State {

  create() {
      $('#over').show();

      $('#btn-over').on('click', () => {
          $('#btn-over').off('click');
          $('#menu').show();
          $('#game').hide();
          $('#over').hide();
          this.state.start('Menu');
      });
  }

  update() {
    // TODO: Stub
  }

}
