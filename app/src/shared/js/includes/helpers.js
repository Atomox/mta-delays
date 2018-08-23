let helpers = ( () => {

  /**
   * Thanks Stack Overflow!
   */
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function underscoreToCaps(str) {
    str = str.split('_');
    return str.map( s => capitalizeFirstLetter(s) ).join(' ')
  }

  return({
    underscoreToCaps: underscoreToCaps,
    capitalizeFirstLetter: capitalizeFirstLetter
  });
})()


module.exports = {
  helpers
};
