import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";


/*WHAT ARE ROUTE PARAMETERS?
It is the changeable part of a url/route. Eg we can have /blog/123 and /blog/456. These will refer to two
different blog posts in the same "/blog" route. To make the route parameters, we'll create the BlogDetails 
component. Then we'll nest it in the App.js  but the name will contatain an extra slash, a colon
and then just add anything after the colon. Here i used "/blogs/:id" (i added "id" as the name after the colon).

Now in order to make the second slash link to each particular blog post, we'll use a useParams hook
and set that "id" as the parameter.
*/


/* I declared and imported my custom useFetch hook so i can use it to fetch each blog here*/

/* This BlogDetails displays each blog */



const BlogDetails = () => {
    const {id} = useParams();
    const {data: blog, error, isPending} = useFetch("http://localhost:8000/blogs/" + id);
    const history = useHistory();

    const handleClick= () => {
      fetch("http://localhost:8000/blogs/" + blog.id, {
         method: "DELETE"
    }).then(() => {
       history.push("/");
    })
    }

    return (
        <div className="blog-details">
           { isPending && <div>Loading...</div>}
           {error && <div>{error}</div>}
           {blog && (
            <article>
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
              <div>{blog.body}</div>
              <button onClick={handleClick}>delete</button>
            </article>
           )}
        </div>
     );
}
 
export default BlogDetails;