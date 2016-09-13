import * as constants from '/both/constants';

export function format (x, units, long) {
  let correct = units[0];
  let index = units.length;
  while (index--) {
    if (x >= units[index].value) {
      correct = units[index];
      break;
    }
  }
  return Math.round(x / correct.value) + (long ? ' ' + correct.long : correct.short);
}
export function checkPost (content) {
  const length = Match.Where((string) => {
    check(string, String);
    return 0 < string.length && string.length <= constants.POST_CHARACTER_LIMIT;
  });
  return Match.test(content, length);
}

export function findPosts (position) {
  return constants.POSTS.find({
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
}
export function getPost (id) {
  return constants.POSTS.find({ id: id });
}

export const checkComment = checkPost;
