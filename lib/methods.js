const hmac = function (key) {
  var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha1);
  this.encrypt = function () {
    return hasher.encrypt.apply(hasher, arguments);
  }
}
checkPost = (content) => {
  const length = Match.Where((string) => {
    check(string, String);
    return 0 < string.length && string.length <= POST_CHARACTER_LIMIT;
  });
  return Match.test(content, length);
}
getId = (ip) => {
  const chance = new Chance(sjcl.misc.pbkdf2(ip, SALT, 512, 512, hmac).toString());
  return chance.guid();
}
Meteor.methods({
  'posts.insert' (content, position) {
    if (!checkPost(content)) {
      return;
    }
    Posts.insert({
      'content': content,
      'date': new Date(),
      'id': Meteor.uuid(),
      'user': Meteor.isServer ? getId(this.connection.clientAddress) : undefined,
      'location': {
        'type': 'Point',
        'coordinates': [position.longitude, position.latitude]
      }
    });
  }
});
