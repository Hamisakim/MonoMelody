# MonoMelody.readme
### Team members
Sami Hakim 
Eric Petso
# - Project overview 7-days
*Note - no extra work has been done to this apart from deployment. This is to give an accurate representation of what can be accomplished in a set time frame.

MonoMelody. is a music minded social media platform. Users can use  our bespoke sequencer to craft your melodies and share them for others to enjoy! This is a full stack app and our first experience with Python and Django for server-side development. 

## **Deployed app here [MonoMelody.](https://monomelody.herokuapp.com/)**
Create an account and login to see the full features! 

## Initialisation
* Inside server directory Install back-end dependencies: `pipenv install --dev`
* Enter Shell for project: `pipenv shell`
* Make Migrations: `python3 manage.py makemigrations`
* Migrate: `python3 manage.py migrate`
* * Load Seed data for Task Categories: `python3 manage.py loaddata jwt_auth/seeds.json`
* Seed Loops: `python3 manage.py loaddata loops/seeds.json`
* Start back-end server: `python3 manage.py runserver`
* **In client directory** 
* Install front-end dependencies: `yarn`
* Start front-end server: `yarn start`

![](/screengrabs/Screenshot%202021-04-29%20at%2022.04.10.png)

## Project brief
* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Be deployed online** so it’s publicly accessible

## Technologies used
* Django 
* Python
* Django rest framework
* Psycopg2
* pyJWT
* PostgreSQL
* React.js (hooks)
* SCSS
* Axios
* HTTP-proxy-middleware
* Bulma
* Toastify
* React- Ticker
* ParticlesBG
* Reactronica
* Git/GitHub
* Trello
* Slack
* Zoom

## Approach Taken
Eric and I worked together on a previous project and had good chemistry. So we decided to join forces. 
We both wanted an app that was interactive, and both being keen music fans we had a direction.
We used a basic wireframe to track our pages / componenets 
![](/screengrabs/Screenshot%202021-04-30%20at%2014.03.04.png)

Scouring the web we found examples of drum machines and sequencers. We quickly began trying to get a proof of concept and a way to save the music in a way that can handled by our backend.

We struggled with this for a long time until we found an experimental project called Reactronica https://reactronica.com/
We started by making a very simple synth to ensure data would be storable and playable.  

![](/screengrabs/Screenshot%202021-04-30%20at%2013.05.08.png)

![](/screengrabs/Screenshot%202021-04-30%20at%2013.03.12.png)
After confirming this works we began working on the backend.

## Backend development
We pair-coded most of this together as this was the first time we’ve used Python for backend development. 
The melodies are referred to as  Loops
Loop Views.py

![](/screengrabs/Screenshot%202021-04-30%20at%2013.10.58.png)

User Model
![](/screengrabs/Screenshot%202021-04-30%20at%2014.26.26.png)


## Front end 
My focus was on the explore page, user authentication, nav-bar, footer, about page, likes, comments and  error handling. We used Bulma to aid in styling and to streamline the build. 
###  Notifications 
## Highlights 
Using Toastify I wrote a re-usable function which takes the error from our backend and displays a notification with relevant message. This really saved time by being reusable across multiple components! 
We could also use the custom toastifyPopUp function to show a custom message if needed, for success or failure. 
![](/screengrabs/Screenshot%202021-04-30%20at%2014.57.08.png)

Example in action! 
Lines 372, 375, 376

![](/screengrabs/Screenshot%202021-04-30%20at%2015.01.11.png)
![](/screengrabs/Screenshot%202021-04-30%20at%2015.04.14.png)

### Explore
For the explore page we had the loops shown on the MelodySpheres, where the first genre is displayed and the whole list is shown via ticker. 
![](/screengrabs/Screenshot%202021-04-30%20at%2015.14.07.png)
Users may also filter and if a Loop contains any genre it will be shown!
![](/screengrabs/Screenshot%202021-04-30%20at%2015.16.49.png)

### User authentication, Login and Register
Upon successful registration the user will be logged in automatically to create a more pleasant UX. 
![](/screengrabs/Screenshot%202021-04-30%20at%2015.21.24.png)

### Like button
Component can be placed placed anywhere using Loop id as prop.
Checks if user has liked before and renders option to like/unlike accordingly. Unliking will delete the like from the database.
Will refresh counter at set interval and on like/unlike.
![](/screengrabs/Screenshot%202021-04-30%20at%2016.07.30.png)

## Final product walkthrough	
![](/screengrabs/Screenshot%202021-04-30%20at%2016.01.44.png)






