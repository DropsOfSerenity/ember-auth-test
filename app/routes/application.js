import Ember from 'ember';
import API from 'ember-auth/api';

export default Ember.Route.extend({
  actions: {
    logout: function() {
      var self = this;
      API.logout().then(function() {
        self.session.set('user', null);
        self.transitionTo('index');
      });
    },

    error: function(error, transition) {
      if (error.status === 'Unauthorized') {
        var loginController = this.controllerFor('login');
        loginController.setProperties({
          message: error.message,
          transition: transition
        });

        return this.transitionTo('login');
      }
      return true;
    }
  }
});
