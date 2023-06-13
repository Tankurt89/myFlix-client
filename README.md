my-Flix-client is where the front end of myflix api is going to be built.

This project will be using React along with src files of .jsx, .scss.

Initial steps of the project started on 5/31/23 and pushed to github.

First large update to the app was pushed on 6/2/23.
This update added in a components folder with sub folders for main-view, movie-card, and movie-view.
Withing each folder new .jsx files were created and updated.
movie-card.jsx was added to allow a movie title, from main-view, to be clicked on. Upon clicking the title the movie-view.jsx takes over and displays information about the movie including: description, genre, director. It also has a back button that can be clicked to take you back to the main-view and select a different movie.

Next large updated was pushed on 6/13/23
This updated built upon the foundation of the update from 6/2. Took what was a great base and built upon it by adding the ability to login and sing up for the site. When logging in the user is assigned a token which is stored locally and called on every time they go to a different endpoint to make sure the user is both valid, and has an active token. The sing up fields, once filled out properly, will register the user and put their information in the db as well assign them a unique ID number.
