import * as constants from '/both/constants';

Momentum.registerPlugin('height', () => {
  options = {
    duration: constants.ANIMATION_DURATION,
    easing: 'ease-out'
  };
  return {
    insertElement: (node, next, done) => {
      $(node).insertBefore(next);
      const height = $(node).height();
      $(node)
        .css({'height': 0, 'opacity': 0})
        .velocity({
          opacity: 1,
          height: height + 'px'
        }, {
          easing: options.easing.in,
          duration: options.duration,
          complete: () => {
            $(node).css('height', '');
            done();
          }
        });
    },
    moveElement: (node, next, done) => {
      const self = this;
      self.removeElement(node, () => {
        self.insertElement(node, next, done);
      });
    },
    removeElement: (node, done) => {
      $(node)
        .velocity({
          opacity: 0,
          height: 0
        }, {
          easing: options.easing,
          duration: options.duration.out,
          complete: () => {
            $(node).remove();
            done();
          }
        });
    }
  };
});
