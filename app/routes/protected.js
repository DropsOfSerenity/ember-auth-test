import Ember from 'ember';
import API from 'ember-auth/api';

export default Ember.Route.extend({

  beforeModel: function() {
    // if we don't have a user then there is no need to make the call
    if (!this.session.get('user')) {
      return Ember.RSVP.reject({
        status: 'Unauthorized',
        message: 'Please login to access this page'
      });
    }
  },

  model: function() {
    return API.get('protected');
  }
});
