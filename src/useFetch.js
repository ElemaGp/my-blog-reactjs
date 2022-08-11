import {useState, useEffect} from 'react';

/* HOW TO CREATE A CUSTOM HOOK: (this hook will fetch and parse/convert the json data, and contain our 
logic for catching and throwing errors, and showing "Loading..." message during the fetch. 
Then we can import the useFetch hook into any components we'd like to use those data and logic in).

The name of the function will be the hook itself. So i'll call it useFetch (hooks in react must start with
the word "use" else it won't work. ).

Import any necessary thing, and export the custom hook at the end of the code.

Define the objects you used (eg. with useState) and write the function for what you want the custom hook to 
do (eg. with useEffect).

At the end of the custom hook function, you "return" the objects you created, that used the custom hook 
(All hooks return the value of the objects created in them,  obviously.)

Then you can go to any components you want to use it in, define the objects that you "returned" from the
custom hook, equal to the name of the custom hook and maybe the fetch url if necessary. I did this in the
 Home component
*/





/*WHAT IS useState:
    useState makes it possible to change the value aka state of a variable. Once its value changes, there
    is a render and the new state be displayed in the DOM. That value can be equal to (contain) a string, number or even an array containing entire 
objects as seen below. The variable is always declared in two; the name of the variable, and a variable that
can be used in another funcion to reset it. The id property is used by react to uniquely access each of the 
properties. It comes in handy when you want to output the contents of the array, so always add them to 
arrays (or if you're getting the data from a json database which is a more realistic scenerio, each object
should have its unique id there). 
Since i'll be getting the data from json, i'll set the initial useState value to null. Then once i fetch 
the data, i'll use setBlogs to update the value and render the contents.

isPending is another variable we defined, to show the user a message when the program is retrieving data
from the data so the user is patient. I set it to be true initially. 
Then i went to the jsx part and put a conditional statement that if isPending is true, it should write a 
"loading... message.
*/


/* 
    
    WHAT IS useEFFECT?:
    - useEffect is the component that is triggered after each render. 
    - A program renders when it is first loaded and after each change of state.
    - Don't put the eg. the function that has the "setBlog", inside the useEffect hook. 
      If you do that, when the page renders, useEffect will be triggered, updating the state, which will then 
      cause another render, triggering the useEffect and you have an endless loop of renders.   
    - if you  want the useEffect hook to only run once, put empty square brackets as its second argument.
    - if you want the useEffect to always render only when the state of a particular variable changes, write 
      that variable inside the square brackets.
    - since useEffect runs after each render, it is a good place to fetch data from the database using
      an api. In a real world scenerio, the blog datas will be put in a database and i'll use an api to fetch
      the data when needed. Since i hardcoded the blog's data here above for this tutorial, i'll create a fake 
      json api server, put the data above in the json format and use it to get the data above (pretending 
      like it is coming from a database).
    
    */

      /*EXPLAINING WHAT IS GOING ON INSIDE THIS useEffect
        - The empty square brackets as the second argument means that the useEffect will render only once.
        - fetch tells the code to fetch the data in the url (aka promise). 
        - .then basically means that once the fetching data is done (aka promise is resolved), THEN do the 
        thing i have in brackets.
        - inside the .then brackets, i'll have an arrow function with the response (res) object as argument, 
        and the function returns res.json which converts/parses the json data from json format into javascript.
        - put another .then, which will run after the json has been parsed to javascript. This .then will
          now contain the converted/ parsed data as argument. Now you jave the json data in javascript 
          format.
        - Next, you use the setBlogs to change the state/value of the blogs to that data. 
          Even thoght the setBlogs is inside the useEffect, it will not cause an infinite render loop 
          because the empty square brackets in the useEffect will make it render only once.
          
          "LOADING..." MESSAGE
          So that the blog displays "Loading..." when it's loading and fetching the data, i created an 
          "isPending" variable and set the initial useState to true. Then in the useEffect, under the place 
          where the data has been gotten and updated, i then put the setIsPending as false so that once
          the data is updated to the DOM, isPending becomes false. 
          Then i went to the "return/jsx" part and did the conditional && statement saying that if isPending is 
          true, it should show the "Loading" message.

          CATCHING ERRORS
          When the program tries to fetch data from the json/server/database, there can be errors eg. it 
          couldn't find the data there, network connection is bad etc. We can write code to "catch" these errors
          and display to the user.
          - The .catch arrow function below sets the setError to err.message. (There's a jsx part of 
          the home component that says if error is true, it should display the error). 
          if the fetch couldn't reach the server/database, perhaps due to bad network. It will show
          something like "could not fetch". 
          
          THROWING & CATCHING ERRORS
          - But If fetch reaches the database, but what it's getting is not the data or that data doesn't 
          exist or the fetch url is wrong, the .catch will not catch it automatically. We'll need to throw the error 
          for it to catch. So we intercept that type of error by checking if the response object we got back is 
          "not OK". If that is true, then we "Throw" the error message we want to send. This error 
          interception is done under the first .then, before it starts returning the parsed code (res.json). 
          When we throw the error message, the .catch catches it and shows it.

          DISPLAYING THE ERROR TO DOM
          - In order to do this, we first create an error state variable. Here we call it error, and set the 
          inital value to null. Then in .catch, we do eg "setError(err.message);", so that it displays any 
          error it catches, on the DOM (whether it's an error it caught due to bad network or it was thrown 
          the error to catch). (NOTE that the "err" is what i chose to call the "error". But the ".message"
          part is an inbuilt property.)
          Then in the "return/jsx" part of the Home component, put a conditional statement that says "if error is true (rememeber
          we set it as "null" initially, which is false), it should display the error".
          - When i do all these, it works fine but it still shows "Loading" alongside the error message.
          To rectify this, i make it such that whenever .catch catches an error, setIsPending is set to False.

          Finally, in the .then(data =>) function, set the setError to null again. This is so that if the 
          error issue is resolved eg. the user's internet connection gets back, and the data is now received
          from the database, you want the setError to go back to null.

          */

          /*
          useEffect CLEAN-UP:
          When the data is still being fetched, if the user quickly moves to another page, the fetch will
          continue in the backgrounnd but since that conponent has been unmounted, you'll get an error in the
          console. In order to combat this, you use a cleanup function so that once the component that uses
          the useFetch and useEffect hooks unmount, it stops totally aand doesnt continue in the background.
          To do this, we assign a variable to a new AbortController method, then use the signal property in the
          fetch's argument to associate the abortCont with the fetch.  Then "return" an arrow function
          which tells it to abort the fetch through the abortCont. 
          Then in the .catch, you tell it that if the error name is AbortError, it should just abort everything
          and write "fetch aborted" in the console. Else (ie if not), it can then change the state of the 
          Error and IsPending.
          */
    



const useFetch = (url) => {
    const [data, setData] = useState (null);
    const [isPending, setIsPending] = useState (true);
    const [error, setError] = useState (null);

    useEffect(() => {
      const abortCont = new AbortController();
        fetch(url, {signal: abortCont.signal})
          .then(res=> {
            if(!res.ok) {
              throw Error("could not fetch data for that resource");
            }
            return res.json()
          })
          .then(data => {
            setData(data); //note that the "data" here refers to the parsed data from json which is then set to the object we want it to become it's value. We named our object "data" in this case. Here,  it doesn't matter that the names clash because the parsed "data" is a local scope while our object "data" is a global scope.
            setIsPending(false);
            setError(null);
          })
          .catch(err => {
            if (err.name === "AbortError"){
              console.log("fetch aborted");
            } else {
            setIsPending(false);
            setError(err.message);
            }
          })
          
          return () => abortCont.abort();
      }, [url]); //This means that it's only when  the url changes that the useEffect will re-render.

      return { data,  isPending, error}
}


export default useFetch;