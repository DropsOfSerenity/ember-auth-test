import Ember from 'ember';
import API from 'ember-auth/api';

export default Ember.Route.extend({
  actions: {
    submit: function() {
      var self = this;
      var controller = this.get('controller');

      var username = controller.get('username'),
          password = controller.get('password');

      var transition = controller.get('transition');

      API.login(username, password).then(
        function(user) {
          self.session.set('user', user);
          if (transition)
            transition.retry();
          else
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
  },

  resetController: function(controller) {
    controller.setProperties({
      username: null,
      password: null,
      message: null,
      transition: null
    });
  }
});
