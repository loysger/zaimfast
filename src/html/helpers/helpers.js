module.exports = {
  times: function(times, context) {
    if (context.data.index <= times - 1) {
      return true;
    } else {
      return false;
    }
  },

  itHas: function(targetArray, seekingValue) {
    if (targetArray.includes(seekingValue)) {
      return true;
    } else {
      return false;
    }
  },

  toNumber: function(value) {
    return parseInt(value.replace(/\s+/g, ''), 10);
  }
};
