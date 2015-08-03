import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-auth/tests/helpers/start-app';
import API from 'ember-auth/api';

module('Acceptance | index', {
  beforeEach: function() {
    API.token = null;
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('h2').text(), 'Authentication Example');
  });
});
