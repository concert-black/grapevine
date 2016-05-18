export const MAX_DISTANCE = 8047;
export const POST_CHARACTER_LIMIT = 160;
export const POST_LIFE = 86400;
export const LOCATION_TIMEOUT = 16384;
export const UNITS = {
  distance: [
    {
      short: 'ft',
      long: 'feet',
      value: 0.3048
    },
    {
      short: 'ft',
      long: 'miles',
      value: 804.67
    }
  ]
};
export const Posts = new Mongo.Collection('posts');
