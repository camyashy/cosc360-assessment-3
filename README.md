https://github.com/camyashy/cosc360-assessment-3

# Set Up
Please follow the below instructions to deploy this local front end React application:
(NB: This is based upon running the application from the supplied zipped files rather than cloning the repo from github)
1. Navigate to the 'reactJS-client' folder in a terminal window
2. Run ```npm run dev```
3. Ensure the server has also been started (see instructions in server README)
4. Navigate to the page indicated in your terminal window (Local: <page>)

# Approach

*Login details*<br>

Admin User
email: admin@example.com
password: password

Regular User
email: emilypost@example.com
password: password

*Login*<br>
The (unlogged in) client enters the app at a list of all posts ('/'). They are then able to login via a dropdown link in the Nav Bar, which directs them to a log in page.

*Logout*<br>
Once a user is logged in, they are able to logout by clicking their username in the nav bar and selecting the Log Out drop down. After the confirm log out prompt is accepted, the app awaits the logout call to the server, deletes the token and other credentials stored in local storage, and redircts to the list page.

*Page access depending on logged in status*<br>
In order to create a fully working blog application, I added different functionality depending on whether a logged in or un-logged in user was accessing the page:
Un-logged in user functionality:
- Able to view a full list of posts (only includes a button against each post to view)
- Able to view the details of an individual post
- NavBar: Only has the option to view all posts or log in

Logged in user functionality:
- Redirected to personal 'dashboard' displaying a list of all posts that particular user has created
- Both the full list of posts and the personal dashboard now has the option to edit and delete posts as well as view
- NavBar: Has the option to view all posts, view the user's dashboard or click on their username to logout

*Functionality depending on which user is logged in*<br>
Admin user: 
- Has the ability to edit and delete all posts regardless of creator
- Cannot access the dashboard of any other user other than themselves

General user:
- Is only able to edit and delete the posts that they have created
- Cannot access the dashboard of any other user other than themselves

*Route validation*<br>
Route validation occurs in one of two ways:
- The appearance of links and buttons. If a user in not authorised to edit or delete a particular post, the button is disabled and an unauthorised message will appear on hover. Similarly, if a user is not logged in, the edit and delete buttons do not appear, nor does the nav bar link directing a user to their dashboard
- In-page conditional logic: This prevents an unauthorised user from plugging a URL into the broswer and gaining access to an unauthorised page. This is achieved by checking if a user is logged in and if the logged in user is authorised to access said page (in the case of edit and delete).

*Fallback*<br>
A fallback route has been added to catch any rouge pages

# Challenges

*Communicating with the server*<br>
The first challenge I ran into was how specifically to communicate with the server. I could create calls, but I struggled to understand how I was going to direct the React client to the correct server. Extensive research revealed I needed to update the vite.config file with the location of my server, and from there I was able to successfully communicate.

*Log Out*<br>
I had great difficulties getting the log out function to work both on the client and server side. Due to issues server side, when a logout request was called, while the response message contained a success server code, the data was HTML rather than the JSON message that was intended. As the logout functionalisty was outside the scope of the assignment requirements, I chose to patch this bug rather than solve it. The log out functionality simply awaits a successful server response, at which point it performs all server side log out actions. This bypasses the need to solve the HTML vs JSON response problem.<br><br>

*Working with multiple languages and general intricies of React*
An overarching challenge I had was just in the general intricies of React, made particularly difficult due to the fact that the last time I worked in JavaScript was four years and a baby ago! I also found regularly jumping between different languages difficult, particularly when it came to small things like how object variables were called or how specifically I communicated with the server (or client). I was very reliant on Linting in order to call me up when I had written something incorrectly, postman to confirm server responses, real-time error checking through the pages in addition to Google Chrome's developer tools.

