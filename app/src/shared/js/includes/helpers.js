let helpers = ( () => {

  /**
   * Thanks Stack Overflow!
   */
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function underscoreToCaps(str) {
    return (typeof str === 'string')
      ? str
        .split('_')
        .map( s => capitalizeFirstLetter(s) )
        .join(' ')
      : str;
  }

  return({
    underscoreToCaps: underscoreToCaps,
    capitalizeFirstLetter: capitalizeFirstLetter
  });
})()


module.exports = {
  helpers
};
