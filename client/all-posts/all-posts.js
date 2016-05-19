import * as utilities from '/both/utilities';
import * as constants from '/both/constants';

Template['all-posts'].helpers({
  posts: () => {
    return constants.Posts.find({}, {
      sort: {date: -1}
    });
  }
});
Template['all-posts'].events({
  'click .template-item': function (event) {
    event.preventDefault();
    Router.go(`/post/${this.id}`);
  }
});
