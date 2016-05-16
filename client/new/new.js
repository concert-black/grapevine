import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

Template.new.helpers({
  canConfirm: () => {
    return utilities.checkPost(Session.get('draft'));
  },
  draft: () => {
    return Session.get('draft');
  },
  remaining: () => {
    return constants.POST_CHARACTER_LIMIT - Session.get('draft').length ;
  },
  negative: () => {
    return Session.get('draft') < 0;
  }
});
Template.new.events({
  'click .toolbarBack': (event) => {
    event.preventDefault();
    Router.go('/');
  },
  'click .toolbarConfirm': (event) => {
    event.preventDefault();
    const position = JSON.parse(Session.get('position'));
    const post = $('.post-input').val();
    if (post.length === 0) {
      return;
    } else if (! utilities.checkPost(post)) {
      alert('Invalid post.');
      return;
    } else if (! position) {
      alert('Geolocation error.');
      return;
    }
    Meteor.call('posts.insert', post, position);
    Session.set('draft', '');
    Router.go('/');
  },
  'keydown .post-input': (event) => {
    if (event.which === 13) {
      event.preventDefault();
      $('.toolbarConfirm').trigger('click');
    }
  },
  'input .post-input': (event) => {
    const draft = $('.post-input').val();
    Session.set('draft', draft);
  }
});
Template.new.onRendered(function () {
  $('textarea').trigger('autoresize');
  $('textarea').focus();
});
