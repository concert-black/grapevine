import * as constants from '/both/constants';

constants.POSTS._ensureIndex({'location': '2dsphere'});
constants.POSTS._ensureIndex({'date': 1}, {expireAfterSeconds: constants.POST_LIFE});
Meteor.publish('posts', (position) => {
  return constants.POSTS.find({
    'location': {
      '$near': {
        '$geometry': {
          'type': 'Point',
          'coordinates': [position.longitude, position.latitude]
        },
        '$maxDistance': constants.MAX_DISTANCE
      }
    }
  });
});
