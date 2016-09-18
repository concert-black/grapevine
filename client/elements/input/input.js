import constants from '/both/constants';
import utilities from '/both/utilities';

Template.input.onCreated(function () {
	this.value = new ReactiveVar();

	const value = Session.get('draft') || '';
	this.value.set(value);
	Meteor.defer(() => $('.text-input').val(value));
});

Template.input.helpers({
	canPost: () => {
		const value = Template.instance().value.get();
		return utilities.checkPost(value) ? '' : 'disabled';
	},
	remaining: () => {
		const value = Template.instance().value.get();
		return constants.postCharacterLimit - value.length;
	},
	negative: () => {
		const value = Template.instance().value.get();
		return value.length > constants.postCharacterLimit;
	},
});

Template.input.events({
	'input .text-input': (event, template) => {
		const value = $('.text-input').val();
		template.value.set(value);
		Session.set('draft', value);
	},
});
