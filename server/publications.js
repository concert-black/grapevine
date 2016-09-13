import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

constants.POSTS._ensureIndex({ 'location': '2dsphere' });
constants.POSTS._ensureIndex({ 'date': 1 }, { expireAfterSeconds : constants.POST_LIFE });
Meteor.publish('posts', (position) => {
  return utilities.findPosts(position);
});

Meteor.publish('post', (id) => {
  return utilities.getPost(id);
});
