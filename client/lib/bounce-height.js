Momentum.registerPlugin('height', () => {
  options = {
    duration: animationDuration,
    easing: {
      in: [512, 0],
      out: [64, 0]
    }
  };
  return {
    insertElement: (node, next, done) => {
      $(node)
        .insertBefore(next);
      let height = $(node).height();
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
  }
});
