import Ember from 'ember';
import API from 'ember-auth/api';

export default Ember.Route.extend({
  actions: {
    submit: function() {
      var self = this;
      var controller = this.get('controller');

      var username = controller.get('username'),
          password = controller.get('password');

      API.login(username, password).then(
        function() {
          self.transitionTo('index');
        },
        function(err) {
          controller.set('message', err.message);
        }
      );

    },
    cancel: function() {
      this.transitionTo('index');
    }
  }
});
