Session.set('locating', true);
if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition((position) => {
    const coordinates = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };
    Session.set('position', JSON.stringify(coordinates));
    Meteor.subscribe('posts', JSON.parse(Session.get('position')));
    Session.set('locating', false);
  }, (error) => {
    Session.set('locating', false);
    alert('geolocation error');
  });
} else {
  Session.set('locating', false);
  alert('no geolocation');
}
