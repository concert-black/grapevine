import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

Template.distance.helpers({
	distance: function () {
		const position = JSON.parse(Session.get('position'));
		return utilities.format(utilities.distance({
				longitude: this.location.coordinates[0],
				latitude: this.location.coordinates[1]
			}, {
				longitude: position.longitude,
				latitude: position.latitude
			}), constants.UNITS.distance);
	}
});
Template.content.helpers({
	content: function() {
		return this.content;
	}
});
Template.date.helpers({
	date: function() {
		return this.date;
	}
});
