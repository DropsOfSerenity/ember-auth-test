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
  login('user', 'secret');

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
    assert.equal(currentURL(), '/login');
    assert.equal(find('#message').text(), 'Please login to access this page');
  });

  login('user', 'secret');

  andThen(function() {
    assert.equal(currentURL(), '/protected');
  });
});

test('logging in then visiting protected page', function(assert) {
  visit('/');
  login('user', 'secret');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });

  click('a:contains(Protected Page)');

  andThen(function() {
    assert.equal(currentURL(), '/protected');
  });
});

function login(username, password) {
  visit('/login');

  fillIn('input[name="username"]', username);
  fillIn('input[name="password"]', password);
  click("button:contains(Submit)");
}
