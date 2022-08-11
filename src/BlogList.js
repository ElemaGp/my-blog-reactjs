import { Link } from "react-router-dom";

const BlogList = ({blogs, title}) => {

    /* 3 STEPS SHOWING HOW A SUBCOMPONENT CLONES A PROP FROM ANOTHER COMPONENT (HOW PROPS WORK)

    - "As i nest here, this your object or function, i'll call it this name in my component"
    - Accept it in the arguments with curly braces
    - Use it in your jsx
    
    */
    
    /* EXPLAINING THE PROPS-CLONING GOING ON HERE:
    Since we want to use the "setBlog" to delete any blog we want but it's defined in
    the Home component, after creating the onClick button here and putting a handleDelete
    funtion in it,we then go to the Home component and create the handleDelete function.
    .
    Then we go to where we nested the BlogList component in the Home component and add a prop 
    <BlogList handleDelete={handleDelete} />, which means that handleDelete in the Bloglist 
    component represents the handleDelete function i made in the Home component. 
    Then i'll add the handleDelete as a prop here in my arguments (put it in the curly braces).*/

    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            
            {/* OUTPUTTING CONTENTS OF ARRAYS: 
            The .map() method is used for iteration. (Foreach can be used too). The map method then 
    contains those other things as arguments in its callback arrow function. The "blog" written there is 
    like "item" used in itearation. It represents each blog as it iterates. 
    The key= blog.id represents each object/blog in the array. The browser uses the key to 
    identify each blog post uniquely. It comes in handy if you want to edit, add or delete a blog. 
    In this case, the id which we used as keys is stated  in the "blogs" array which we defined in JSON file.  
    Some css is used to style the blog-preview class. This BlogList component is a subcomponent and i nested 
    it in the home component. I also did the props in the nesting place and here above. The code below outputs
    the content of the array as it iterates*/}
         {blogs.map((blog)=> (
            <div className="blog-preview" >
              <Link to= {`/blogs/${blog.id}`}>
              <h2>{blog.title}</h2>
              <p>Written by {blog.author} </p>
              </Link>
             

             


            </div>
        ))}
        </div>
     );
}
 
export default BlogList;