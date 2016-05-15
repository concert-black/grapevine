Template.new.helpers({
  draft: () => {
    return Session.get('draft');
  },
  remaining: () => {
    const remaining = Session.get('remaining');
    if (remaining === undefined) return POST_CHARACTER_LIMIT;
    return remaining;
  },
  negative: () => {
    return Session.get('remaining') < 0;
  }
});
Template.new.events({
  'click .toolbarBack': (event) => {
    event.preventDefault();
    Router.go('/');
  },
  'click .toolbarConfirm': (event) => {
    event.preventDefault();
    if (! checkPost(Session.get('draft'))) {
      alert('post check error');
      return;
    }
    Meteor.call('posts.insert', $('.post-input').val(), JSON.parse(Session.get('position')));
    Session.set('draft', '');
    Session.set('remaining', POST_CHARACTER_LIMIT);
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
    Session.set('remaining', POST_CHARACTER_LIMIT - draft.length);
  }
});
Template.new.onRendered(function () {
  $('textarea').trigger('autoresize');
  $('textarea').focus();
});
