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
We used a basic wireframe to track our pages/components.

![](/screengrabs/Screenshot%202021-04-30%20at%2014.03.04.png)

Scouring the web we found examples of drum machines and sequencers. We quickly began trying to get a proof of concept and a way to save the music in a way that can be handled by our backend.

We struggled with this for a long time until we found an experimental project called Reactronica https://reactronica.com/
We started by making a very simple synth to ensure data would be storable and playable.  

After confirming this works we began working on the backend.
![Screenshot_2021-04-17 GA-LDN React Template(4)](https://user-images.githubusercontent.com/76621344/117569295-f1ae3c00-b0bc-11eb-9453-01928911cdc1.png)

# Backend development
We pair-coded most of this together as this was the first time we’ve used Python for backend development. 
The melodies are referred to as Loops in our backend.
Here we can see the Loop model.

```python

class Loop(models.Model):
    title = models.CharField(max_length=50, null=True, unique=True) #//! change to required 
    steps = models.CharField(max_length=2000000)
    bpm = models.IntegerField(default=120)
    synth = models.CharField(max_length=50, default="fmSynth")
    key = models.CharField(max_length=10, default="c")
    scale = models.CharField(max_length=50, default="major")
    effect = models.CharField(max_length=500, default="freeverb")
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        # related_name='created_loops',
        related_name='loops_created',
        on_delete = models.CASCADE
    ) 
    genres = models.ManyToManyField('genres.Genre', related_name="loops")

    # comments
    # likes 

    def __str__(self):
        return f"{self.title} by {self.owner}"

```


Here we can see how each request route is handled. 
```python
class LoopListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, _request):
        loops = Loop.objects.all() # return everything from the db
        serialized_loops = PopulatedLoopSerializer(loops, many=True) # convert the data
        return Response(serialized_loops.data, status=status.HTTP_200_OK)

    def post(self, request):
        print('🟦 request post loop:', request.data)
        request.data["owner"] = request.user.id
        loop_to_add = LoopSerializer(data=request.data)
        print('loop_to_add ->', loop_to_add)

        if loop_to_add.is_valid():
            loop_to_add.save()
            print('🟩 loops-> view: Loop has saved',loop_to_add.data)
            return Response(loop_to_add.data, status=status.HTTP_201_CREATED)
        return Response(loop_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoopDetailView(APIView):
    def get_loop(self, pk):
        try:
            print('🚀 Loop Found')
            return Loop.objects.get(pk=pk)
        except Loop.DoesNotExist:
            print("🆘 Cannot find that loop")
            raise NotFound(detail="🆘 Cannot find that loop")  

    def get(self, _request,pk):
        loop = self.get_loop(pk=pk)
        print('🟩 getting loop ->', loop)
        serialized_loop = PopulatedLoopSerializer(loop)
        return Response(serialized_loop.data, status=status.HTTP_200_OK)
```

User Model

```python
class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    profile_image = models.CharField(max_length=300, null=True)
    location = models.CharField(max_length=300, null=True)
    bio = models.TextField(max_length=600, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.username}"
```




# Front end 
My focus was on the explore page, user authentication, nav-bar, footer, about page, likes, comments, and error handling. We used Bulma to aid in styling and to streamline the build. 

# My Highlights 
##  Notifications 
Using Toastify I wrote a re-usable function that takes the error from our backend and displays a notification with a relevant message. This saved time by being reusable across multiple components! 
We could also use the custom toastifyPopUp function to show a custom message if needed, for success or failure. 
```javascript
export const getErrorsToastify = (err) =>{
  const message = Object.entries(err.response.data)
  message.map(error=>{
    const messageToSend = `Error with ${error[0]} - ${error[1].toString()}`
    toastifyPopUp(false,messageToSend)
    return null
  })
}

export const toastifyPopUp = (success = true,message = 'Success!') =>{
  console.log('🐝 ~ file: popUps.js ~ line 7 ~ ' )
  if (success === true){
    toast.success(message, {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
    })
  } else if (success === false) {
    toast.error(message, {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
    }) 
  }
}

```

Example in action! Here we can see how this function is used for both succesful and failed saves of the Loop in the front end.
```javascript
const handleSave =  async () => {
    const stringSteps = steps.join(' ')
    const formToSend = { ...formData, steps: stringSteps }
    try {
      await axios.post('/api/loops/', formToSend, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}`, 'Content-Type': 'application/json' } })
      toastifyPopUp(true,'Save successful!')
      history.push('/gallery')
    } catch (err) {
      toastifyPopUp(false,'Could not save!')
      getErrorsToastify(err)
    }
  }
```
![Screenshot 2021-04-30 at 15 04 14](https://user-images.githubusercontent.com/76621344/119320745-ce19f280-bc73-11eb-952b-e7cef59d90b9.png)



## Explore
For the explore page we had the loops shown on the MelodySpheres, where the first genre is displayed and the whole list is shown via ticker. 

![](/screengrabs/Screenshot%202021-04-30%20at%2015.14.07.png)

Users may also filter and if a Loop contains any genre it will be shown!
In order to do this we had to first get all genres used and map through these to create the buttons. 
The user can toggle multiple genres in the filter. We used an array to capture these and loop through to find loops which contain any of these genres. 


```javascript
const Gallery = () => {
  const [data, setData] = useState(null)
  const [genres, setGenres] = useState(null)
  const [genreFilter, setGenreFilter] = useState(null) //should be ids to check 
  //____________________________________________________________________
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/loops/')
      setData(response.data)
    }
    const getGenres = async () => {
      const response = await axios.get('/api/genres/')
      const dataArray = response.data
      const arrayOfGenreNames = []
      const arrayOfGenreId = []
      dataArray.map(genre =>{
        arrayOfGenreNames.push(genre.name)
        arrayOfGenreId.push(genre.id)
      })
      setGenres(response.data)
    }
    getData()
    getGenres()
  },[])
  //____________________________________________________________________
  const handleGenreSelect = (event) => {
    const genreId =  Number(event.target.value)
    let genreArray = []
    !genreFilter ? genreArray = [] :
      genreArray = [...genreFilter]
    const preventDuplicate = genreArray.findIndex(e => e === genreId)
    if (preventDuplicate === -1){
      genreArray.push(genreId)
      setGenreFilter(genreArray)
    } else {
      genreArray.splice(preventDuplicate, 1)
      setGenreFilter(genreArray)
    }
  }  
  const handleFilterReset = () => {
    setGenreFilter(null)
  }
```
and in the JSX
```javascript

  <div className='gallery-filter'> 
  
            { 
              genres.map(genre=>{ 
                const selectedFilter = {
                  backgroundColor: 'transparent',
                  color: '#ff7f08',
                  borderColor: '#ff7f08',
                  zIndex: 100,

                }
                const notSelected = {
                  backgroundColor: 'transparent',
                  color: 'white',
                  borderColor: 'white',
                  zIndex: 100,
              
                }
                let style = notSelected
                //if genre.id is in the filter array then change color 
                if (!genreFilter){
                  style = notSelected
                } else if (genreFilter.findIndex(e => e === genre.id) > -1 ){
                  style = selectedFilter
                }
                return (
                  <button
                  // style={buttonBackground}
                    className='genre-tag-button' 
                    key={genre.id} 
                    value={genre.id}
                    style={style}
                    onClick={() => {
                      handleGenreSelect(event)
                    }} 
                  >
                    {genre.name}
                  </button>
                )
              })
            }
          </div>
```


## User authentication, log in and Register
Upon successful registration, the user will be logged in automatically to create a more pleasant UX. 
```javascript
const handleSubmit = async (event) => {
    event.preventDefault()
    let wasSignupSuccess = null
    try {
      const dataToSend = formData
      const response =  await axios.post('api/auth/register/', dataToSend)
      console.log('🟢 ~ file: register.js ~ line 44 ~ response', response)
      wasSignupSuccess = true
      signupPopup(true,'Sign up success')
    } catch (err) {
      setErrors(err.response.data)
      getErrorsToastify(err)
      wasSignupSuccess = false
      signupPopup(false,'Sign up failed')
    }
    if (wasSignupSuccess){
      const loginData = {
        username: formData.username,
        password: formData.password,
      }
      try {
        const response = await axios.post('/api/auth/login/', loginData)
        loginPopUp(true)
        window.localStorage.setItem('token',response.data.token)
        history.push('/create')
      } catch (err) {
        loginPopUp(false)
        getErrorsToastify(err)
      }
    }
  }
```

## Like button
The component can be placed anywhere using Loop id as a prop.
On first render the component will check if the user has liked before and renders option to like/unlike accordingly. Unliking will send a delete request and liking sends a post request. 
The component will refresh  at a set interval and on like/unlike.


```javascript
const checkIfLiked = (likesArr) => {
    const areThereLikes = likesArr[0]
    if (!areThereLikes){ 
      setUserLikedAlready(false) 
      return null
    }
    const payload = getPayloadFromToken()
    const ownerId = payload.sub
    
    likesArr.map(like=>{
      if (like.owner.id === ownerId){
        setUserLikedAlready(true)
        setLikeId(like.id)
      } else if (like.owner.id !== ownerId){
        setUserLikedAlready(false)
      }
    })
  } 
  //__________________________________________________________________________

  const handleLike = async () => {
    const token = getTokenFromLocalStorage()
    if (!userIsAuthenticated()){
      userNeedsToLogin('Please login to like!')
      return null
    }

    if (userLikedAlready){
      //* If user has liked do delete
      try {   
        await axios.delete(`/api/like/${likeId}/`, { headers: { Authorization: `Bearer ${token}` } } ) 
        setUserLikedAlready(true)
        refreshFavourites()
      } catch (err) {
        getErrorsToastify(err)
      }
    } else if (!userLikedAlready){
      //* If user hasn't liked do post request
      try {   
        const likeLoadToSend = {
          owner: ownerId,
          loop: id,
        }
        await axios.post(`/api/like/${id}/`, likeLoadToSend, { headers: { Authorization: `Bearer ${token}` } } ) 
        refreshFavourites()

      } catch (err) {
        getErrorsToastify(err)
      }
      
    }
  }
```

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
# Bugs and future features
* On initial load, the ticker on the explore page does not render correctly.
* Need to add the delete option on the front end

# Final product walkthrough	
![](/screengrabs/Screenshot%202021-04-30%20at%2016.01.44.png)

Homepage
![](Screenshot%202021-04-30%20at%2016.01.44.png)![Screenshot 2021-04-30 at 16 01 44](https://user-images.githubusercontent.com/76621344/116895751-6dc30280-ac2b-11eb-90f8-b369216ba04c.png)

Create
![](Screenshot%202021-05-03%20at%2015.31.13.png)![Screenshot 2021-05-03 at 15 31 13](https://user-images.githubusercontent.com/76621344/116895767-71568980-ac2b-11eb-95b8-40a13f0b40ad.png)

Explore
![](Screenshot%202021-05-03%20at%2015.32.36.png)![Screenshot 2021-05-03 at 15 32 36](https://user-images.githubusercontent.com/76621344/116895776-73204d00-ac2b-11eb-9b8e-4760154c234a.png)

View  loop
![](Screenshot%202021-05-03%20at%2015.49.50.png)![Screenshot 2021-05-03 at 15 49 50](https://user-images.githubusercontent.com/76621344/116895793-761b3d80-ac2b-11eb-8dd4-e4e5c8f25366.png)





