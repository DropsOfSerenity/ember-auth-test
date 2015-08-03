import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import Ember from 'ember';

setResolver(resolver);

Ember.Test.registerAsyncHelper('login', function(username, password) {

});
