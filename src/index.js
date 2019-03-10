module.exports = function check(str, bracketsConfig) {
  let pattern = [];
  let stackUniq = [];
  let stackEqual = [];

  for (let i = 0; i < bracketsConfig.length; i++) {
      for (let j = 0; j < bracketsConfig[i].length; j++) {
          pattern.push(bracketsConfig[i][j]);
      }
  }

  const patternStr = pattern = pattern.join('');
  
  // Start
  for (let i = 0; i < str.length; i++) {

      if ( isOpen(i)) {
          if ( isEqual(i) ) { // Opening
              stackEqual.push(str[i]); // Equal
          } else {
              stackUniq.push(str[i]); // Uniq
          }
      } else { // Closing
          if (patternStr.indexOf(str[i]) < 0 || stackUniq == 0) {
              return false;
          }

          let n = patternStr.indexOf(str[i]);
          
          if ( patternStr[n-1] != stackUniq.pop() ) {
              return false;        
          }
      }
  }

  // Final
  if ( stackUniq.length != 0 ) {
      return false;
  }

  if ( stackEqual.length % 2 != 0 ) {
      return false;
  }

  if (!finalCheck()) {
      return false;
  }

  return true;


  // Opening Br?
  function isOpen(i) {
      if (patternStr.indexOf(str[i]) % 2 == 0) {
          return true;
      } 
      return false;
  }

  // Opening Br == Closing Br ?
  function isEqual(i) {
      let n = patternStr.indexOf(str[i]);

      if ( str[i] == patternStr[patternStr.indexOf(str[i])+1] ) {
          return true;
      }
      return false;
  }

  function finalCheck() {
      let k = 0;
      let a = [];
      let b = [];
      let lastCheck = [];

      for (let i = 0; i < str.length; i = i + 2) {
          if (patternStr[i] == patternStr[i+1]) {
              lastCheck.push(patternStr[i]);
          }
      }



      for (let i = 0; i < str.length; i++) {
          k = str.indexOf(lastCheck[0], i);
          if (k < 0) {
              break;
          }
          a.push(k);
          i = k;
      }

      if (lastCheck.length > 1) {
          for (let i = 0; i < str.length; i++) {
              k = str.indexOf(lastCheck[1], i);
              if (k < 0) {
                  break;
              }
              b.push(k);
              i = k;
          }

          b.reverse();

          for (let i = 0; i < b.length-1; i = i + 2) {
              if ((b[i] - b[i+1]) % 2 == 0) {
                  return false;
              }
          }
      }

      a.reverse();

      for (let i = 0; i < a.length-1; i = i + 2) {
          if ((a[i] - a[i+1]) % 2 == 0) {
              return false;
          }
      }
      
      return true;
  }
}
