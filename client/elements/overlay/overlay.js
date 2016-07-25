import * as constants from '/both/constants';

Meteor.startup(() => {
  reconnectToServer(constants.RECONNECT_FREQUENCY, false);
  const sort = localStorage.getItem('sort');
  if (sort) {
    Session.set('sort', sort);
  } else {
    Session.set('sort', constants.DEFAULT_SORT_METHOD);
  }
});

Template.overlay.onRendered(() => {
	if (localStorage.getItem('visited')) {
		locate();
	} else {
		$('.modal-welcome').openModal({
			dismissible: false, // modal cannot be dismissed by clicking outside of the modal
      opacity: 0.5, // opacity of modal background
      in_duration: 0, // transition in duration
      out_duration: 0, // transition out duration
      complete: () => {
				locate();
				$('.lean-overlay').remove(); // materialize sucks
				localStorage.setItem('visited', true); // might break in private browsing
			}
		});
	}
});
function locate () {
	if ('geolocation' in navigator) {
	  const watch = navigator.geolocation.watchPosition((position) => {
	    const coordinates = {
	      longitude: position.coords.longitude,
	      latitude: position.coords.latitude
	    };
	    Session.set('position', JSON.stringify(coordinates));
	    Meteor.subscribe('posts', JSON.parse(Session.get('position')), {
				onReady: () => {
					Session.set('loaded', true);
				},
				onStop: () => {
					$('.modal-error-connection').openModal({
						dismissible: false, // modal cannot be dismissed by clicking outside of the modal
			      opacity: 0.5, // opacity of modal background
			      in_duration: 0, // transition in duration
			      out_duration: 0, // transition out duration
					});
				}
			});
	  }, (error) => {
	    const position = Session.get('position');
	    if (! position) {
	      navigator.geolocation.clearWatch(watch);
				$('.modal-error-location').openModal({
					dismissible: false, // modal cannot be dismissed by clicking outside of the modal
					opacity: 0.5, // opacity of modal background
					in_duration: 0, // transition in duration
					out_duration: 0, // transition out duration
				});
	    }
	  }, {
	    timeout: constants.LOCATION_TIMEOUT,
	    enableHighAccuracy: false
	  });
	} else {
		$('.modal-error-location-unsupported').openModal({
			dismissible: false, // modal can be dismissed by clicking outside of the modal
			opacity: 0.5, // opacity of modal background
			in_duration: 0, // transition in duration
			out_duration: 0, // transition out duration
		});
	}
}

Template.overlay.helpers({
	hidden: () => {
		return Session.get('loaded') && Meteor.status().status === 'connected';
	}
});
