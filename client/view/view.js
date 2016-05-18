import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

Template.view.helpers({
  post: () => {
    const controller = UI.controller();
    return Posts.find({_id: controller.get('id')});
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
Template.view.events({
  'click .template-toolbarBack': (event) => {
    event.preventDefault();
    Router.go('/');
  }
});
