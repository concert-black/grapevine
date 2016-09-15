import * as constants from '/both/constants';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';

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
  [
    '.modal-error-connection',
    '.modal-welcome',
    '.modal-error-location-unsupported',
    '.modal-error-location'
  ].forEach((dialog) => {
    const element = document.querySelector(dialog);
    if (! element.showModal) dialogPolyfill.registerDialog(element);
  });
	if (localStorage.getItem('visited')) {
		locate();
	} else {
    const dialog = document.querySelector('.modal-welcome');
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', () => {
      dialog.close();
      locate();
      localStorage.setItem('visited', true);
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
          const dialog = document.querySelector('.modal-error-connection');
					dialog.showModal();
          dialog.querySelector('.close').addEventListener('click', () => {
            dialog.close();
          });
				}
			});
	  }, (error) => {
	    const position = Session.get('position');
	    if (! position) {
	      navigator.geolocation.clearWatch(watch);
        const dialog = document.querySelector('.modal-error-location');
				dialog.showModal();
	    }
	  }, {
	    timeout: constants.LOCATION_TIMEOUT,
	    enableHighAccuracy: false
	  });
	} else {
    alert('test');
    const dialog = document.querySelector('.modal-error-location-unsupported');
    dialog.showModal();
	}
}

Template.overlay.helpers({
	hidden: () => {
		return Session.get('loaded') && Meteor.status().status === 'connected';
	}
});
