Template.toolbarLoading.helpers({
  isLoading: () => {
    return Session.get('locating') || Session.get('identifying');
  }
});
