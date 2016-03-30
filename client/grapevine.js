Template.all.helpers({
  posts: () => {
    return Posts.find({}, {
      sort: {date: -1}
    });
  }
});
Template.all.events({
  'click .toolbarCreate': (event) => {
    event.preventDefault();
    Router.go('/new');
  }
});
Template.post.helpers({
  distance: function() {
    const position = JSON.parse(Session.get('position'));
    return format(distance({
        longitude: this.location.coordinates[0],
        latitude: this.location.coordinates[1]
      }, {
        longitude: position.longitude,
        latitude: position.latitude
      }), units.distance);
  },
  time: function() {
    return this.date;
  }
});
Template.toolbarConfirm.helpers({
  canConfirm: () => {
    return checkPost(Session.get('draft'));
  }
});
Template.new.helpers({
  draft: () => {
    return Session.get('draft');
  },
  remaining: () => {
    return Session.get('remaining') || postCharacterLimit;
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
    if (Session.get('characters') < 0 || Session.get('characters') == postCharacterLimit) {
      return;
    }
    Meteor.call('posts.insert', $('.post-input').val(), JSON.parse(Session.get('position')));
    Session.set('draft', '');
    Session.set('remaining', postCharacterLimit)
    Router.go('/')
  },
  'keydown .post-input': (event) => {
    if (event.which === 13) {
      $('.toolbarConfirm').trigger('click');
    }
  },
  'input .post-input': (event) => {
    const draft = $('.post-input').val();
    Session.set('draft', draft);
    Session.set('remaining', postCharacterLimit - draft.length);
  }
});
Template.toolbarLoading.helpers({
  loading: () => {
    return Session.get('loading') ? 1 : 0;
  }
});

Session.set('loading', true);
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const coordinates = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };
    Session.set('loading', false);
    Session.set('position', JSON.stringify(coordinates));
    Meteor.subscribe('posts', JSON.parse(Session.get('position')));
  }, (error) => {
    Session.set('loading', false);
    alert('geolocation error');
  });
} else {
  Session.set('loading', false);
  alert('no geolocation');
}
