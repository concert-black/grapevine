export const MAX_DISTANCE = 8047;
export const ANIMATION_DURATION = 512;
export const POST_CHARACTER_LIMIT = 140;
export const POST_LIFE = 86400;
export const SALT = 'halite';
export const UNITS = {
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
export const Posts = new Mongo.Collection('posts');
