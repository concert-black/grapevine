import * as constants from '/both/constants';
import * as utilities from '/both/utilities';

Template.input.onCreated(function(){
  this.value = new ReactiveVar('');
});

Template.input.helpers({
  canPost: () => {
    const value = Template.instance().value.get();
    return utilities.checkPost(value);
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
  'input .text-input': (event, template) => {
    console.log($('.text-input').val());
		template.value.set($('.text-input').val());
  }
});
