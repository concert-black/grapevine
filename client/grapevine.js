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
  distance: function () {
    const position = JSON.parse(Session.get('position'));
    return format(distance({
        longitude: this.location.coordinates[0],
        latitude: this.location.coordinates[1]
      }, {
        longitude: position.longitude,
        latitude: position.latitude
      }), UNITS.distance);
  },
  time: function () {
    return this.date;
  },
});
Template.tag.helpers({
  opacity: function () {
    if (this.user) return 1;
    return 0;
  },
  user: function () {
    const chance = new Chance(this.user);
    return chance.word({
      syllables: 3
    });
  },
  hue: function () {
    const chance = new Chance(this.user);
    return chance.integer({
      min: 0,
      max: 360
    });
  }
});
Template.post.events({
  'click .post': function (event) {
    event.preventDefault();
    Router.go(`/post/${this.id}`);
  }
});
Template.toolbarConfirm.helpers({
  canConfirm: () => {
    return checkPost(Session.get('draft'));
  }
});
Template.toolbarLoading.helpers({
  isLoading: () => {
    return Session.get('locating') || Session.get('identifying');
  }
});
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
});
Template.view.helpers({
  post: () => {
    const controller = UI.controller();
    return Posts.find({_id: controller.get('id')});
  },
  time: function () {
    return moment(this.date).format('h:mm:ss A');
  }
});
Template.view.events({
  'click .toolbarBack': (event) => {
    event.preventDefault();
    Router.go('/');
  }
});

Session.set('locating', true);
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const coordinates = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };
    Session.set('position', JSON.stringify(coordinates));
    Meteor.subscribe('posts', JSON.parse(Session.get('position')));
    Session.set('locating', false);
  }, (error) => {
    Session.set('locating', false);
    alert('geolocation error');
  });
} else {
  Session.set('locating', false);
  alert('no geolocation');
}
