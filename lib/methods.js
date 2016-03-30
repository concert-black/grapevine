Meteor.methods({
  'posts.insert' (content, position) {
    length = Match.Where((string) => {
      check(string, String);
      return string.length < postCharacterLimit;
    });
    check(content, length);
    Posts.insert({
      'content': content,
      'date': new Date(),
      'location': {
        'type': 'Point',
        'coordinates': [position.longitude, position.latitude]
      }
    });
  }
});
