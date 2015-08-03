/* globals jQuery */

import Ember from 'ember';

var API = {
  token: null,

  login: function(username, password) {
    var self = this;

    var payload = {
      username: username,
      password: password
    };

    var deferred = jQuery.post('/session', payload).then(
        function(data) {
          self.token = data.token;
          return data.user;
        }, function(err) {
          return {status: err.statusText, message: err.responseText};
        }
    );

    return Ember.RSVP.resolve(deferred);
  },

  logout: function() {
    var settings = {
      type: 'DELETE',
      headers: {'Authorization': 'Token token=' + this.token }
    };

    var deferred = jQuery.ajax('/session', settings).then(function() {
      this.token = null;
    }.bind(this));

    return Ember.RSVP.resolve(deferred);
  },

  get: function(resource) {
    var url = '/' + resource;

    var settings;

    if (this.token) {
      settings = {
        type: 'GET',
        headers: { 'Authorization': 'Token token=' + this.token }
      };
    } else {
      settings = {};
    }

    var deferred = jQuery.ajax(url, settings).then(
        null,
        function(err) {
          return {status: err.statusText, message: err.responseText};
        }
    );

    return Ember.RSVP.resolve(deferred);
  }
};

export default API;
