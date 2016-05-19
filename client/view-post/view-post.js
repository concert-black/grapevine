import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

function triggerComment (id) {
  const post = id;
  const comment = $('.text-input').val();
  if (! utilities.checkPost(comment)) {
    alert('Invalid comment.');
    return;
  }
  Meteor.call('posts.comment', comment, post);
  $('.text-input').val('');
}

Template['view-post'].helpers({
  comments: function () {
    return _.sortBy(this.comments, (object) => {
      return -1 * (new Date(object.date));
    });
  },
  empty: function () {
    return this.comments.length === 0;
  },
  time: function () {
    return moment(this.date).format('h:mm:ss A');
  },
  distance: function () {
    const position = JSON.parse(Session.get('position'));
    return utilities.format(utilities.distance({
        longitude: this.location.coordinates[0],
        latitude: this.location.coordinates[1]
      }, {
        longitude: position.longitude,
        latitude: position.latitude
      }), constants.UNITS.distance, true);
  },
  location: function() {
    const position = JSON.parse(Session.get('position'));
    return `https://www.google.com/maps?q=${position.latitude},${position.longitude}`;
  }
});
Template['view-post'].events({
  'click .template-toolbarBack': (event) => {
    event.preventDefault();
    Router.go('/');
  },
  'click .post-button': (event, template) => {
    triggerComment(template.data.id);
    event.preventDefault();
  },
  'keydown .text-input': (event, template) => {
    if (event.which === 13) {
      event.preventDefault();
      triggerComment(template.data.id);
    }
  }
});
Template.comment.helpers({
	content: function() {
		return this.content;
	},
	date: function() {
		return this.date;
	}
});
