import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

Meteor.methods({
  'posts.insert' (content, position) {
    if (! utilities.checkPost(content)) {
      return;
    }
    constants.Posts.insert({
      'content': content,
      'date': new Date(),
      'id': Meteor.uuid(),
      'location': {
        'type': 'Point',
        'coordinates': [position.longitude, position.latitude]
      }
    });
  }
});
