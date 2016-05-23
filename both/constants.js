export const MAX_DISTANCE = 8047; // meters
export const POST_CHARACTER_LIMIT = 160; // characters
export const POST_LIFE = 86400; // seconds
export const LOCATION_TIMEOUT = 16384; // milliseconds
export const RECONNECT_FREQUENCY = 1024; // milliseconds
export const POSITION_VARIABILITY = 0.0001;
export const UNITS = {
  distance: [
    {
      short: 'ft',
      long: 'feet',
      value: 0.3048
    },
    {
      short: 'mi',
      long: 'miles',
      value: 804.67
    }
  ]
};
export const posts = new Mongo.Collection('posts');
