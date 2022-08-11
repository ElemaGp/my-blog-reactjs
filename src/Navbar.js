import {Link} from 'react-router-dom';

/* Making the Navigation bar component */

/*WRITING LINKS IN REACT:
When you use that a tag we learned in html, the link's request goes to the server/database. But when
you use the Link tag, react router handles it. The later is faster and the UX is more sleek, so we'll use that. 
First import Link.
So instead of <a href=....></a>, we'll do <Link to=....></Link>
*/


const Navbar = () => {
    return ( 
        <nav className="navbar">
          <h1>The Dojo Blog</h1>
          <div className="links">
            <Link to="/">Home</Link>
            {/* i did some inline styling for the "New Blog". Two curly brackets were used. The outer one 
            represents that the content is a dynamic value. The inner one represents that the content an 
            object ie color: "white"; etc. Also note that unlike css that calls it "background-color", this
            is a jsx file so you call it backgroundColor because hyphen looks like a minus here  */}
            <Link to="/create" style= {{
                color: "white",
                backgroundColor: "#f1356d",
                borderRadius: "8px"
            }} >New Blog</Link>
          </div>
        </nav>
     );
}
 
export default Navbar ;