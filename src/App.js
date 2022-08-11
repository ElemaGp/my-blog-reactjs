
import Home from './Home';
import Navbar from './Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

/*Code-along: net ninja full modern react tutorial youtube  */

/* The main work of React is to parse data from a backend api, and then use Javascript and Jsx (html+JS) + CSS
to decide how the data will be "Displayed" and interacted with ie "Add, Delete, Modify"
In a nutshell, react gets the data from backend api, and lets the user interact with the data. */

//App.js is basically the background template for how each page will look.

/*
Comments at the javascript part are just slash and astericks, but in the jsx part (aka return), you 
add curly braces. 

Variables aka Dynamic values in the javascript part are written just like that, but in the jsx part, you
add curly braces

Object.Method should have the double brackets in front of them eg Math.random().

If a function is in the jsx onClick part and you dont want it to be triggered automatically, put an 
anonymous-arrow function before it that then returns that function

*/

/*HOW TO CREATE MULTI-PAGES IN REACT (ROUTER):
The first time a website loads, it gets data from the server/database. In other websites, this action
repeats everytime the user click on a link to go to another page. But with react, on the initial
website loading, the server delivers the "js bundle" alongside the index.html. So when the user clicks
on any link eg "About" or "Contact" link, the "js bundle" intercepts it and the React Router then tells react 
to inject that component into the browser. 
So in a nutshell, router takes care of routing to another page.

Every page or route is assigned a top-level component eg Home.js, About.js, Contact.js, Clothes.js. And that 
component is dynamically injected into the browser when we visit that route.

First install the React Router Package in a new terminal. Type npm install react-router-dom@5 (5 is currently
the latest version.)

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

Surround inside the "return" part of the App.js with the Router tags. This shows that every component nested
there can use the Router.

Next step is to decide where we want each page's content to be when that page is opened. In this project,
it's inside the "content" class, so we'll put the "Switch" tags inside it. The Switch tags make sure that
only 1 route is shown at a time. When another page is to be accessed, the Switch checks the routes from top 
to bottom trying to find a match for the link that is behind that page. It'll stop at the first match it
finds and render that route (but if you don't put the closing Switch tag at the end, you'll end up having
multiple pages rendered at the same time.)

Next, inside the Switch tag, we put all our individual route tags for each path aka link. Then nest the
component within that route (click on the suggestion to auto-import it).

Since "/" is in eg. "/create" or any url for that matter, the react "Switch" sees it as a match and so
will display the homepage if it comes across it first even though the /create is nested below it. To
combat this, we use use "exact path" for the "Home" which has the "/". That way, Switch only selects
it only if the url is exactly "/".  

*/




function App() {
  return (
    <Router>
      <div className="App">
        {/* Nesting the navbar */}
        <Navbar />
        {/* Creating class for the contents */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="*"> {/*The astericks rute means "catch any route that is not assigned above, and display this" */} 
              <NotFound />
            </Route>
          </Switch>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
