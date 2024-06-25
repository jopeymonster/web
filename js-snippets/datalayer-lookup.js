function() {
    // Modify the searchObject below.
    //
    // Add each key-value pair you want to look for directly into the searchObject object. Use
    // strings for keys. 
    //
    // The variable will look for any key-value pair you specify, and return true if any one of them
    // is found. If you use dot notation, the variable will try to find a key with this name first,
    // after which it will parse the nested structure looking for a match.
    var searchObject = {
      'user.consentGiven': 'false'
    };
    
    // Change this if you have renamed the dataLayer array.
    var dataLayerName = 'dataLayer';
    
    // Don't edit anything below this line.
    var getValueForObjectString = function(obj, key) {
      return key.split(".").reduce(function(o, x) {
          return (typeof o == "undefined" || o === null) ? o : o[x];
      }, obj);
    };
    
    return window[dataLayerName].filter(function(obj) {
      var found = false;
      var prop;
      
      for (prop in searchObject) {
        if (obj[prop] == searchObject[prop] || getValueForObjectString(obj, prop) == searchObject[prop]) {
          found = true;
        }
      }
      return found;
    }).length > 0;
  }