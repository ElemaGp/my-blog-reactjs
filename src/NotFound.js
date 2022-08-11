/*This component is for the 404 error page, if the user types a nonexistent route in our website*/
/*After creating the component, i nested it in the app.js, telling it to catch any route path is not 
among the ones specified, and display this*/

import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry</h2>
            <p>That page cannot be found</p>
            <Link to="/">Back to the homepage...</Link>
        </div>
     );
}
 
export default NotFound;