import {module, test} from 'qunit';

import API from 'ember-auth/api';

// run the server
import 'ember-auth/mock-server';

module('API Client', {
  setup: function() {
    API.token = null;
  }
});

test('Login with incorrect user', function(assert) {
  return API.login('wrong', 'pass').catch(function(err) {
    assert.strictEqual(API.token, null);
    assert.equal(err.status, 'Unauthorized');
    assert.equal(err.message, 'Incorrect username/password');
  });
});

test('Login as user', function(assert) {
  return API.login('user', 'secret').then(function(response) {
    assert.equal(API.token, 'user');

    assert.equal(response.role, 'user');
    assert.equal(response.name, 'User');
  });
});

test('Login as user with incorrect password', function(assert) {
  return API.login('user', 'wrong').catch(function(err) {
    assert.strictEqual(API.token, null);

    assert.equal(err.status, 'Unauthorized');
    assert.equal(err.message, 'Incorrect username/password');
  });
});

test('Login as admin works', function(assert) {
  return API.login('admin', 'secret').then(function(response) {
    assert.equal(API.token, 'admin');

    assert.equal(response.role, 'admin');
    assert.equal(response.name, 'Administrator');
  });
});

test('Login as admin with incorrect password', function(assert) {
  return API.login('admin', 'wrong').catch(function(err) {
    assert.strictEqual(API.token, null);

    assert.equal(err.status, 'Unauthorized');
    assert.equal(err.message, 'Incorrect username/password');
  });
});

/** LOGOUT **/
test('Logout', function(assert) {
  API.token = 'user';

  return API.logout().then(function() {
    assert.strictEqual(API.token, null);
  });
});

test('Logout with expired token', function(assert) {
  API.token = 'expired';

  return API.logout().then(function() {
    assert.strictEqual(API.token, null);
  });
});

test('Logout with no token', function(assert) {
  return API.logout().then(function() {
    assert.strictEqual(API.token, null);
  });
});
