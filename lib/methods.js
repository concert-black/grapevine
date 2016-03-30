checkPost = function (content) {
  const length = Match.Where((string) => {
    check(string, String);
    return 0 < string.length && string.length < postCharacterLimit;
  });
  return Match.test(content, length);
}

Meteor.methods({
  'posts.insert' (content, position) {
    if (! checkPost(content)) {
      return;
    }
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
