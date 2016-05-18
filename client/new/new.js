import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

function triggerPost (post) {
  const position = JSON.parse(Session.get('position'));
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
  Router.go('/');
}

Template.new.events({
  'click .template-toolbarBack': (event) => {
    event.preventDefault();
    Router.go('/');
  },
  'keydown .post-input': (event) => {
    if (event.which === 13) {
      event.preventDefault();
      triggerPost($('.post-input').val());
    }
  }
});
Template.new.onRendered(function () {
  $('textarea').trigger('autoresize');
  $('textarea').focus();
});
