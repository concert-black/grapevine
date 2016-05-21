import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

Meteor.methods({
  'posts.insert' (content, position) {
    if (! utilities.checkPost(content)) {
      return;
    }
    constants.posts.insert({
      'content': content,
      'date': new Date(),
      'id': Meteor.uuid(),
      'comments': [],
      'location': {
        'type': 'Point',
        'coordinates': [position.longitude, position.latitude]
      }
    });
  },
  'posts.comment' (comment, post) {
    if (! utilities.checkComment(comment)) {
      return;
    }
    constants.posts.update({
      'id': post
    }, {$push: {
      'comments': {
        'date': new Date(),
        'id': Meteor.uuid(),
        'content': comment
      }
    }});
  }
});
