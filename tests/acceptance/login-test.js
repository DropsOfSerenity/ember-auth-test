import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-auth/tests/helpers/start-app';
import API from 'ember-auth/api';

module('Acceptance | login', {
  beforeEach: function() {
    this.application = startApp();
    API.token = null;
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Login with incorrect credentials', function(assert) {
  visit('/');
  login('wrong', 'wrong');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    assert.equal( find('#message').text(), 'Incorrect username/password' );
  });

  click('button:contains(Cancel)');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('Login in as user', function(assert) {
  visit('/');
  login('user', 'secret');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal( find('h4').text(), 'You are logged in as User' );
    assert.equal( find('button:contains(Logout)').length, 1 );
  });

  click('button:contains(Logout)');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal( find('button:contains(Login)').length, 1 );
  });
});

test('Login as admin', function(assert) {
  visit('/');
  login('admin', 'secret');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal( find('h4').text(), 'You are logged in as Administrator' );
    assert.equal( find('button:contains(Logout)').length, 1 );
  });

  click('button:contains(Logout)');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal( find('button:contains(Login)').length, 1 );
  });
});

function login(username, password) {
  visit('/login');

  fillIn('input[name="username"]', username);
  fillIn('input[name="password"]', password);
  click("button:contains(Submit)");
}
