MAX_DISTANCE = 8047;
ANIMATION_DURATION = 512;
POST_CHARACTER_LIMIT = 140;
POST_LIFE = 86400;
SALT = 'halite';
UNITS = {
  distance: [
    {
      name: 'ft',
      value: 0.3048
    },
    {
      name: 'mi',
      value: 804.67
    }
  ]
}
Posts = new Mongo.Collection('posts');
