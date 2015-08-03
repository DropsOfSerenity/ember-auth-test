import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-auth/tests/helpers/start-app';
import API from 'ember-auth/api';

module('Acceptance | protected', {
  beforeEach: function() {
    API.token = null;
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /protected with valid token', function(assert) {
  API.token = 'user';

  visit('/');
  click('a:contains(Protected Page)');

  andThen(function() {
    assert.equal(currentURL(), '/protected');
  });

  click('a:contains(Go Back)');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('visiting /protected with invalid token', function(assert) {

  visit('/');
  click('a:contains(Protected Page)');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('h4').text(), 'An error has occurred');
    assert.equal(find('#content').text(), 'Please login to access this page');
  });
});
