import * as constants from '/both/constants';

constants.posts._ensureIndex({'location': '2dsphere'});
constants.posts._ensureIndex({'date': 1}, {expireAfterSeconds: constants.POST_LIFE});
Meteor.publish('posts', (position) => {
  return constants.posts.find({
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
