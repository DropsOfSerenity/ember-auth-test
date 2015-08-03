import Ember from 'ember';
import API from 'ember-auth/api';

export default Ember.Route.extend({
  beforeModel: function() {
    var user = this.session.get('user');
    if (!user) {
      return Ember.RSVP.reject({
        status: 'Unauthorized',
        message: 'Please login to access this page'
      });
    }
    if (user.role !== 'admin') {
      return Ember.RSVP.reject({
        status: 'Forbidden',
        message: 'You are not authorized to view this page'
      });
    }
  },

  model: function() {
    return API.get('secret');
  }
});
