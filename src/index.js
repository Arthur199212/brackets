module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let examStr = [];
  let last = [];
  let closeBrct = [];
  
  // Examination string  
  for (let i = 0; i < bracketsConfig.length; i++) {
      for (let j = 0; j < bracketsConfig[i].length; j++) {
        examStr.push(bracketsConfig[i][j]);
      }
  }

  // All characters can be used
  for (let i = 0; i < str.length; i++) {
      if ( examStr.indexOf(str[i]) > -1 ) {
      } else {return false};
  }

  // Solve task
  for (let i = 0; i < str.length; i++) {
    if (isItOpenningBracket( str[i] )) {

        if ( stack.indexOf( str[i] ) > -1 && !(/([\[\]\(\)\{\}])/.test( str[i] )) ){
            
            console.log( 'hello' );

            last = stack.pop();       
            closeBrct = str[i];  
                   
            if ( !compare(last, closeBrct) ) {
                return false;
            } else {
                return true;
            }

        } else {
        stack.push( str[i] );
        }

    } else {
        // If stack is empty = return false
        if ( stack.length == 0 ) {
           return false;
        }

        last = stack.pop();       
        closeBrct = str[i];  
               
        if ( !compare(last, closeBrct) ) {
            return false;
        }
         
      }
    }

  // Compare open and close brakets
  function compare(open, close) {
    for (let i = 0; i < bracketsConfig.length; i++) {
        if ( bracketsConfig[i][0] == last && bracketsConfig[i][1] == closeBrct ) {
            return true;
        }
    }

    return false;
  }

  // Is it opening bracket
  function isItOpenningBracket(symbol) {
    for (let i = 0; i < bracketsConfig.length; i++) {
        if ( symbol == bracketsConfig[i][0] ) {
            return true;
        }
    }
    return false;
  }

  // If stack is not empty - return false
  if ( !stack.length == 0 ) {
    return false;
  }

  return true;
}
