Posts._ensureIndex({'location': '2dsphere'});
Posts._ensureIndex({'date': 1}, {expireAfterSeconds: POST_LIFE})
Meteor.publish('posts', (position) => {
  return Posts.find({
    'location': {
      '$near': {
        '$geometry': {
          'type': 'Point',
          'coordinates': [position.longitude, position.latitude]
        },
        '$maxDistance': MAX_DISTANCE
      }
    }
  });
});
