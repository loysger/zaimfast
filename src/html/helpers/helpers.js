module.exports = {
  times: function(times, context) {
    if (context.data.index <= times - 1) {
      return true;
    } else {
      return false;
    }
  }
};
