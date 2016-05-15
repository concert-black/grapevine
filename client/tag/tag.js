Template.tag.helpers({
  opacity: function () {
    if (this.user) return 1;
    return 0;
  },
  user: function () {
    const chance = new Chance(this.user);
    return chance.word({
      syllables: 3
    });
  },
  hue: function () {
    const chance = new Chance(this.user);
    return chance.integer({
      min: 0,
      max: 360
    });
  }
});
