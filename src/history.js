import { createBrowserHistory } from 'history'; 
export default createBrowserHistory();

// Warning: Please use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")`. Support for the latter will be removed in the next major release.

// To fix, our history.js file should instead look like this:

// import { createBrowserHistory } from 'history'; 
// export default createBrowserHistory();