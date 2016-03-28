Posts._ensureIndex({'location.coordinates': '2dsphere'});
Meteor.publish('posts', (position) => {
  return Posts.find({
    'location': {
      '$near': {
        '$geometry': {
          'type': 'Point',
          'coordinates': [position.longitude, position.latitude]
        },
        '$maxDistance': maxDistance
      }
    }
  });
});
