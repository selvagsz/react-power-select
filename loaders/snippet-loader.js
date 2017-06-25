function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function(source) {
  var path = this.resourcePath;
  var splits = path.split('/');
  var namedParts = splits.slice(splits.length - 2);
  var snippetName =
    capitalize(namedParts[0]) + capitalize(namedParts[1].replace('.js', ''));
  return `global['${snippetName}'] =  ${JSON.stringify(source)}`;
};
