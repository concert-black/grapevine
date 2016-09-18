import constants from '/both/constants';
import utilities from '/both/utilities';

Meteor.methods({
	'posts.insert': (content, position) => {
		if (! utilities.checkPost(content)) {
			return;
		}
		constants.posts.insert({
			content,
			'date': new Date(),
			'id': Meteor.uuid(),
			'comments': [],
			'commentCount': 0,
			'location': {
				'type': 'Point',
				'coordinates': [position.longitude, position.latitude],
			},
		});
	},
	'posts.comment': (content, post) => {
		if (! utilities.checkComment(content)) return;
		constants.posts.update({
			'id': post,
		}, {
			$push: {
				'comments': {
					content,
					'date': new Date(),
					'id': Meteor.uuid(),
				},
			},
			$inc: {
				'commentCount': 1,
			},
		});
	}
});
