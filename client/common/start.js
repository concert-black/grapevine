Session.set('draft', '');
Session.set('locating', true);
if ('geolocation' in navigator) {
  const watch = navigator.geolocation.watchPosition((position) => {
    const coordinates = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };
    Session.set('locating', false);
    Session.set('position', JSON.stringify(coordinates));
    Meteor.subscribe('posts', JSON.parse(Session.get('position')));
  }, (error) => {
    const position = Session.get('position');
    if (! position) {
      navigator.geolocation.clearWatch(watch);
      Session.set('locating', false);
      alert('We could not determine your location.');
    }
  }, {
    timeout: 8192,
    enableHighAccuracy: false
  });
} else {
  Session.set('locating', false);
  alert('We could not determine your location.');
}
