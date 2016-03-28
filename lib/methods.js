Meteor.methods({
  post: (content, position) => {
    Posts.insert({
      content: content,
      date: new Date(),
      id: Meteor.uuid(),
      location: {
        type: 'Point',
        coordinates: [position.longitude, position.latitude]
      }
    });
  }
});
