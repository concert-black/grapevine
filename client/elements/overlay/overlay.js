import constants from '/both/constants';
import dialogPolyfill from 'dialog-polyfill';
import utilities from '/both/utilities';
import 'dialog-polyfill/dialog-polyfill.css';

Meteor.startup(() => {
	reconnectToServer(constants.reconnectFrequency, false);
	const sort = localStorage.getItem('sort');
	if (sort) {
		Session.set('sort', sort);
	} else {
		Session.set('sort', constants.defaultSortMethod);
	}
});

Template.overlay.onRendered(() => {
	[
		'.modal-error-connection',
		'.modal-welcome',
		'.modal-error-location-unsupported',
		'.modal-error-location',
	].forEach((dialog) => {
		const element = document.querySelector(dialog);
		if (! element.showModal) dialogPolyfill.registerDialog(element);
	});
	if (localStorage.getItem('visited')) {
		locate();
	} else {
		const dialog = document.querySelector('.modal-welcome');
		dialog.showModal();
		dialog.querySelector('.fine-whatever').addEventListener('click', () => {
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
				latitude: position.coords.latitude,
			};
			Session.set('position', JSON.stringify(coordinates));
			Meteor.subscribe('posts', JSON.parse(Session.get('position')), {
				onReady: () => {
					Session.set('loaded', true);
				},
				onStop: () => {
					const dialog = document.querySelector('.modal-error-connection');
					dialog.showModal();
					dialog.querySelector('.try-again').addEventListener('click', utilities.reload);
				},
			});
		}, (error) => {
			const position = Session.get('position');
			if (! position) {
				navigator.geolocation.clearWatch(watch);
				const dialog = document.querySelector('.modal-error-location');
				dialog.showModal();
				dialog.querySelector('.try-again').addEventListener('click', utilities.reload);
			}
		}, {
			timeout: constants.locationTimeout,
			enableHighAccuracy: false,
		});
	} else {
		alert('test');
		const dialog = document.querySelector('.modal-error-location-unsupported');
		dialog.showModal();
		dialog.querySelector('.try-again').addEventListener('click', utilities.reload);
	}
}

Template.overlay.helpers({
	hidden: () => {
		return Session.get('loaded') && Meteor.status().status === 'connected';
	}
});
