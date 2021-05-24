# MonoMelody. Read Me
### Team members
* [Sami Hakim](https://github.com/hamisakim)
* [Eric Petsopoulos](https://github.com/ericpesto)
# Project overview
#### Timeframe 7 days
*Note - no extra work has been done to this apart from deployment. This is to give an accurate representation of what can be accomplished in a set time frame.

MonoMelody. is a music-minded social media platform. Users can use our bespoke sequencer to craft their melodies and share them for others to enjoy! This is a full-stack app and our first experience with Python and Django for server-side development. 

## **Deployed app here [MonoMelody.](https://monomelody.herokuapp.com/)**
Create an account and log in to see the full features! 

# Initialisation
* Inside server directory Install back-end dependencies: `pipenv install --dev`
* Enter Shell for project: `pipenv shell`
* Make Migrations: `python3 manage.py makemigrations`
* Migrate: `python3 manage.py migrate`
* Load Seed data for Task Categories: `python3 manage.py loaddata jwt_auth/seeds.json`
* Seed Loops: `python3 manage.py loaddata loops/seeds.json`
* Start back-end server: `python3 manage.py runserver`
* **In client directory** 
* Install front-end dependencies: `yarn`
* Start front-end server: `yarn start`

![](/screengrabs/Screenshot%202021-04-29%20at%2022.04.10.png)

# Project brief
* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Be deployed online** so it’s publicly accessible

# Technologies used
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

# Approach Taken
Eric and I worked together on a previous project and had good chemistry. So we decided to join forces. 
We both wanted an interactive app, and both being keen music fans we had a direction.
We used a basic wireframe to track our pages/components 

![](/screengrabs/Screenshot%202021-04-30%20at%2014.03.04.png)

Scouring the web we found examples of drum machines and sequencers. We quickly began trying to get a proof of concept and a way to save the music in a way that can be handled by our backend.

We struggled with this for a long time until we found an experimental project called Reactronica https://reactronica.com/
We started by making a very simple synth to ensure data would be storable and playable.  

After confirming this works we began working on the backend.
![Screenshot_2021-04-17 GA-LDN React Template(4)](https://user-images.githubusercontent.com/76621344/117569295-f1ae3c00-b0bc-11eb-9453-01928911cdc1.png)

# Backend development
We pair-coded most of this together as this was the first time we’ve used Python for backend development. 
The melodies are referred to as  Loops
Loop Views.py

![](/screengrabs/Screenshot%202021-04-30%20at%2013.10.58.png)

User Model

![](/screengrabs/Screenshot%202021-04-30%20at%2014.26.26.png)




# Front end 
My focus was on the explore page, user authentication, nav-bar, footer, about page, likes, comments, and error handling. We used Bulma to aid in styling and to streamline the build. 

# My Highlights 
##  Notifications 
Using Toastify I wrote a re-usable function that takes the error from our backend and displays a notification with a relevant message. This saved time by being reusable across multiple components! 
We could also use the custom toastifyPopUp function to show a custom message if needed, for success or failure. 
![Screenshot 2021-04-30 at 14 57 08](https://user-images.githubusercontent.com/76621344/119320712-c65a4e00-bc73-11eb-837b-7c8e205295c6.png)

Example in action! 
Lines 372, 375, 376![Screenshot 2021-04-30 at 15 01 11](https://user-images.githubusercontent.com/76621344/119320727-cb1f0200-bc73-11eb-8297-8b6de9283b6a.png)
![Screenshot 2021-04-30 at 15 04 14](https://user-images.githubusercontent.com/76621344/119320745-ce19f280-bc73-11eb-952b-e7cef59d90b9.png)



## Explore
For the explore page we had the loops shown on the MelodySpheres, where the first genre is displayed and the whole list is shown via ticker. 

![](/screengrabs/Screenshot%202021-04-30%20at%2015.14.07.png)

Users may also filter and if a Loop contains any genre it will be shown!


## User authentication, log in and Register
Upon successful registration, the user will be logged in automatically to create a more pleasant UX. 
![Screenshot 2021-04-30 at 15 21 24](https://user-images.githubusercontent.com/76621344/119320779-d7a35a80-bc73-11eb-9433-5fc3f6dbaf44.png)

## Like button
The component can be placed anywhere using Loop id as a prop.
Checks if the user has liked before and renders option to like/unlike accordingly. Unliking will delete the like from the database.
Will refresh counter at a set interval and on like/unlike.
![Screenshot 2021-04-30 at 16 07 30](https://user-images.githubusercontent.com/76621344/119320798-dd00a500-bc73-11eb-8e1a-5c5ab6991602.png)


# Wins and challenges 
## Wins
* Implementing Django and Python.
* Happy about the overall final product built within the timeframe.
* Collaboration - always a blessing to work with like-minded individuals and learn new things. 
## Challenges
* Implementing Django and Python.
* Using audio as the data was a challenge. In both creating and handling.

# Key takeaways
* Python fundamentals. Chance to practice another language and framework. 
*  Experience in implementing interactive user experiences.

# Final product walkthrough	
![](/screengrabs/Screenshot%202021-04-30%20at%2016.01.44.png)

# Bugs and future features
* On initial load, the ticker on the explore page does not render correctly.
* Need to add the delete option on the front end

Homepage
![](Screenshot%202021-04-30%20at%2016.01.44.png)![Screenshot 2021-04-30 at 16 01 44](https://user-images.githubusercontent.com/76621344/116895751-6dc30280-ac2b-11eb-90f8-b369216ba04c.png)

Create
![](Screenshot%202021-05-03%20at%2015.31.13.png)![Screenshot 2021-05-03 at 15 31 13](https://user-images.githubusercontent.com/76621344/116895767-71568980-ac2b-11eb-95b8-40a13f0b40ad.png)

Explore
![](Screenshot%202021-05-03%20at%2015.32.36.png)![Screenshot 2021-05-03 at 15 32 36](https://user-images.githubusercontent.com/76621344/116895776-73204d00-ac2b-11eb-9b8e-4760154c234a.png)

View  loop
![](Screenshot%202021-05-03%20at%2015.49.50.png)![Screenshot 2021-05-03 at 15 49 50](https://user-images.githubusercontent.com/76621344/116895793-761b3d80-ac2b-11eb-8dd4-e4e5c8f25366.png)





