
import BlogList from './BlogList';
import useFetch from './useFetch';

/* HOME COMPONENT IS THE HOMEPAGE:
This is the home component (the one whose link we created in the navbar. It's the homepage) */

const Home = () => {
    /*Making a GET request*/
    const {data: blogs, isPending, error} = useFetch ("http://localhost:8000/blogs");

    /*The reason i did "data: blogs" is just so that i can call it "blogs" in this component. It's just
    like saying "i know we called it data in the custom hook, but call it blogs in this component".
    If i wanted, i could just leave it as "data" only, and then call it data in the jsx but customizing
    the name to fit each component just makes it look better and more readable.

    SO ANY COMPONENT THAT I WANT TO FETCH ITS DATA FROM DATABASE, I JUST PUT THIS useFetch code in there and 
    change the url FOR THE DATA, and it FETCHES THE DATA FOR THAT COMPONENT.

    */

    

    

        
    return ( 
       <div className="home">
        {/*NESTING AND PROPING IN ACTION:
        I've nested the BlogList here and imported it above. Also added the props i want to clone
        from this Home component and use in the BlogList component, with the names i'll call them there
        
        I put the "blogs &&" before it because it takes a while for the json to be parsed/converted to
        javascript and then used by the program. So if i run the program, i'll get an error. So putting
        "blogs &&" rectifies it by saying "if the blogs(data) is available (aka true), then you can run
        the code on the right. Remember we set the blog's initial value to "null" which equates to false.
        So when the data becomes available, it becomes true. And then runs what's on the right.
        */}
        
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {blogs && <BlogList blogs={blogs} title= "All Blogs"  />}
    
       </div>
     );
}
 
export default Home;



/*
WHAT IS JSON? (NOTE THAT JSON DOESNT ACCEPT COMMENTS SO I'M PUTTING IT HERE)

REST API is an API (sends and receives data between client and server). Json is the content format in
which the data is sent and received so that both client and server understands each other.*/

/* This is a json file with one Top-Level property (blog), and having two objects with normal-level
 properties of (title, body, author or id) each. 
Json sees every Top-Level property as a resource. So it creates endpoints for us so we can interact with
this resource and be able to eg Delete items from it, add items to it, edit items, get items etc.
 */

 /*Just like with installing react, you can either install json directly on your pc or you install
 a virtual server to run it on that program. I'll go for the later.
 So the first step is to click the dropdown in the terminal and choose another terminal eg powershell or
 anything. As long as it's not the one you're using for the react project.
 Then type: npx json-server --watch data/db.json --port 8000 (Note that i put data/db.json because
 i created the db.json file inside the data folder. I also used port 8000 because if i 
 didn't specify that, the program will automatically try to use port 3000 which is what i'm using for the
 react project)
 */

 /*Here are the endpoints json provides for us to interact with this (blog) Top-Level property:

 /blogs          GET      Fetches all blogs
 /blogs/{id}     GET      Fetches a single blog
 /blogs          POST     Adds a new blog
 /blogs/{id}     DELETE   Deletes a blog

Fetching data will be done inside the useEffect. I put empty square brackets as second argument there, so 
the useEffect will only render once, thereby fetching and rendering the data only once.

Since i'll be getting the data from json, i'll set the initial useState value to null. Then once i fetch 
the data, i'll use setBlogs to update the value and render the contents.

 */

/* HOW DELETING ITEMS FROM A LIST/ARRAY WORK (THIS IS FOR DELETING FROM DATA STORED LOCALLY IN THE
      PROGRAM. WE'LL BE SEEING HOW TO DELETE DATA FROM DATABASE LATER):
    I wrote this handleDelete here so that the function will interact directly with the setBlogs which 
    has the ability to change the state of the blogs and render the new state to the DOM. Note that when
    you delete something, it technically doesn't delete or touch the previous array. What actually happens
    is that a new array array is created with the new items that are filtered in. And yes, 
    the filter method is what is used for deleting what you want to and after filtering in the 
    remaining. It iterates round the array and using the code below, checks each blog's id. Any blog
    that is NOT that id is filtered in and stored in the "const newBlog" you created. Any blog 
    that is that id is then filtered out/deleted (you'll click on that id; its's specified in 
    the <button onClick> tag at the BlogList component as blog.id). 
    setBlog is the brought in to update the value of the blogs object and render it to the DOM.
    The jsx with the button onClick for the deleting is in BlogList component 

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }
    */

 
