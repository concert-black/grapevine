import * as constants from '/both/constants';

Template.input.onCreated(function(){
  this.value = new ReactiveVar('');
});

Template.input.helpers({
  canConfirm: () => {
    return utilities.checkPost(this.value);
  },
  remaining: () => {
		const value = Template.instance().value.get();
    return constants.POST_CHARACTER_LIMIT - value.length;
  },
  negative: () => {
		const value = Template.instance().value.get();
    return value.length > constants.POST_CHARACTER_LIMIT;
  }
});

Template.input.events({
  'input .post-input': (event, template) => {
		template.value.set($('.post-input').val());
  }
});
