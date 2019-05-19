module.exports.register = function(handlebars) {
  var layouts = require('handlebars-layouts');
  handlebars.registerHelper(layouts(handlebars));
};
