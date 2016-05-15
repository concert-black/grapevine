Template.toolbarConfirm.helpers({
  canConfirm: () => {
    return checkPost(Session.get('draft'));
  }
});
Template.toolbarLoading.helpers({
  isLoading: () => {
    return Session.get('locating') || Session.get('identifying');
  }
});
