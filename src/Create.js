/* HOW TO CREATE INPUT FIELDS (FORMS):
You always keep it in sync with the state so that when the value of the input changes, it refletcs on
the DOM.
*/
/*
When an onSubmit event is clicked inside a form, it triggers a submit event on the entire form.
An alternative would be to use an onClick button, it triggers a click event on the button itself.
But since this is a form, onSubmit is the best here.
*/

/*useHistory hook helps redirect users either forward or backward. In this case, it redirects the back to
homepage after their new blog has been created aka
form submitted*/

import { useState } from "react";
import {useHistory} from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState ("");
    const [body, setBody] = useState ("");
    const [author, setAuthor] = useState ("yoshi");
    const [isPending, setIsPending] = useState (false);
    const history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault(); /*This prevents the form page from refreshing and removing the things you've typed in, when you click the eg. "submit" or "add blog" button. That's the default, so this prevents it.*/
      const blog = {title, body, author}; /*Creating the object/template for each blogpost that will be created, just like in thatjson file*/
      /*Making a POST request (It's possible to make a hook that we can use for POST requests, or even one that handles both POST and GET requests, but we won't be doing that for this project*/
      
        setIsPending(true);

      fetch("http://localhost:8000/blogs", {   /*where we are posting to*/
        method: "POST",  /*It's a POST request*/
        headers: {"Content-Type": "application/json"}, /*we want the content to be sent as a json file */
        body: JSON.stringify(blog) /*This is the actaual data we want to POST, which in this case, is the "blog" object*/
        }).then(() => {
           console.log("new blog added");
           setIsPending(false);
           /* history.go(-1); */
           history.push('/');
        });
    }


    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea 
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;