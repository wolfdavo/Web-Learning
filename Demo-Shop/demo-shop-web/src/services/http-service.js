//Dont need ot put a name for whatwg-fetch package because they made it so you just need
//import it like so and it available.
import 'whatwg-fetch';

//Class is a new thing from ES6 and is not available in vanilla JS.
class HttpService {
  //This is an ES6 arrow function. It works exactly the same as a normal JS function, just different
  //syntax.  This is the same is var getProducts = function() {...};
  getProducts = () => {
    var promise = new Promise((resolve, reject) => {
      fetch('http://localhost:3000/product')
      .then(response => {
        resolve(response.json());
      })
    });
    return promise;
  }
}

export default HttpService;
