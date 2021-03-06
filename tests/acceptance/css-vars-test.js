import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

function rgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgb(${result.slice(1, 4).map(x => parseInt(x, 16)).join(', ')})`;
}

module('Acceptance | css vars', function(hooks) {
  setupApplicationTest(hooks);

  test('it should apply the css var', async function(assert) {
    await visit('/');

    assert.dom('#background').hasStyle({ backgroundColor: rgb('#0000ff') });
    assert.dom('#font').hasStyle({ color: rgb('#0000ff') });
  });

  test('it should update the css var', async function(assert) {
    await visit('/');
    await click('#make-red');
    assert.dom('#dynamic-background').hasStyle({ backgroundColor: rgb('#ff0000') });
  });

  test('it takes a positional vars object', async function(assert) {
    await visit('/');
    assert.dom('#with-positional').hasStyle({
      backgroundColor: rgb('#0000ff'),
      color: rgb('#ff0000'),
    });
  });
});
