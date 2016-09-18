import constants from '/both/constants';
import utilities from '/both/utilities';

constants.posts._ensureIndex({ 'location': '2dsphere', });
constants.posts._ensureIndex(
	{ 'date': 1 },
	{ expireAfterSeconds: constants.postLife },
);

Meteor.publish('posts', position => utilities.findPosts(position));
Meteor.publish('post', id => utilities.getPost(id));
