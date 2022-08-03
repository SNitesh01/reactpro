/**
 * @param {array} array Array to be sorted on
 * @param {string} sortBy property to be sorted by
 * @param {string} type datatype
 * @param {number} sortOrder ascending or descending (1 or ascending )
 * @param {boolean} type datatype
 * @returns
 */

 function sorting(array, sortBy, type, sortOrder) {
    if (type === "number") return numbersSort(array, sortBy, sortOrder);
    if (type === "string") return stringsSort(array, sortBy, sortOrder);
    if (type === "boolean") return booleanSort(array, sortBy, sortOrder);

    return array;
  }
  
  function numbersSort(array, sortBy, sortOrder) {
    return array.sort((a, b) => {
      a = a[sortBy];
      b = b[sortBy];
      return sortOrder === 1 ? a - b : b - a;
    });
  }
  
  function stringsSort(array, sortBy, sortOrder) {
    return array.sort((a, b) => {
      a = a[sortBy].toUpperCase();
      b = b[sortBy].toUpperCase();
  
      if (a > b) return sortOrder === 1 ? 1 : -1;
      if (a < b) return sortOrder === 1 ? -1 : 1;
      return 0;
    });
  }

  function booleanSort(array, sortBy, sortOrder) {
    return array.sort((a, b) => {
      a = a[sortBy];
      b = b[sortBy];
      return sortOrder === 1 ? a - b : b - a;
    });
  }

  //slider
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  

  export {sorting, debounce}