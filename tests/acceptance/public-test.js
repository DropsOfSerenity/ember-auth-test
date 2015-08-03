import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-auth/tests/helpers/start-app';

function clickLink(text) {
  click('a:contains(' + text + ')');
}

module('Acceptance | public', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /public', function(assert) {
  visit('/');
  clickLink('Public Page');

  andThen(function() {
    assert.equal(currentURL(), '/public');
    assert.equal(find('h4').text(), 'Public Page');
    assert.equal(find('#content').text(), 'Lorem ipsum dolor sit amet');
  });

  clickLink('Go Back');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
