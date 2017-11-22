const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bcrypt = require('./bcrypt.js')
const spicedPg = require('spiced-pg');
const dbQuery = require('./database/userQueries')
const exerciseQuery = require('./database/exerciseQueries')
const toS3 = require('./toS3').toS3;
const s3Url = require('./config.json').s3Url;
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');


const db = spicedPg(process.env.DATABASE_URL || "postgres:juliankaiser:password@localhost:5432/gymdo");

var diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

var uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  secret: 'supersecret',
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.use(express.static(__dirname + '/public'));

// ************ ROUTES ************ //

app.get('/welcome', function(req, res) {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.sendFile(__dirname + '/index.html');
  }
})

app.post('/register', (req, res) => {
  const {email,password,first,last} = req.body
  if (!email || !password || !first || !last) {
    res.json({
      success: false
    })
  } else {
    bcrypt.hashPassword(req.body.password)
      .then((hash) => {
        return dbQuery.addUser(first, last, email, hash)
        .then((result) => {
          const {first, last, id} = result.rows[0]
          req.session.user = {
            first: first,
            last: last,
            id: id,
          }
          res.json({
            success: true
          })
        }).catch(err => console.log(err));
      })
    }
  })

app.post('/login', (req, res) => {
  const {email, password} = req.body
  if (!email || !password) {
    res.json({
      success: false
    })
  } else {
    dbQuery.loginUser(email)
      .then((result) => {
        const {first,last,id,bio,password,profilepicurl} = result.rows[0];
        const data = result.rows[0];
        bcrypt.checkPassword(req.body.password, password)
          .then((doesMatch) => {
            if (doesMatch) {
              req.session.user = {
                first: first,
                last: last,
                id: id
              }
              res.json({
                success: true
              })
            } else {
              res.json({
                success: false
              })
            }
          })
      })
    }
})

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect('/welcome')
})

app.post('/uploadUserPicture', uploader.single('file'), (req, res) => {
  const {filename} = req.file
  if (req.file) {
    toS3(req.file).then(() => {
      return  dbQuery.updateUserImg(filename, req.session.user.id)
      .then(() => {
        const url = `${s3Url}${filename}`
        console.log("saved in db")
        res.json({
          success: true,
          url: url
        });
      }).catch(err => console.log(err));
    })
  } else {
    res.json({
      success: false
    });
  }
})

app.post('/uploadTitleImage', uploader.single('file'), (req, res) => {
  const {filename} = req.file
  if (req.file) {
    toS3(req.file).then(() => {
      return  dbQuery.updateTitleImg(filename, req.session.user.id)
      .then(() => {
        const url = `${s3Url}${filename}`
        console.log("saved in db")
        res.json({
          success: true,
          url: url
        });
      })
    }).catch(err => console.log(err));
  } else {
    res.json({
      success: false
    });
  }
})

app.get('/user', (req, res) => {
  const loggedInUserId = req.session.user.id

  dbQuery.getUser(loggedInUserId)
  .then((result) => {
    let {first,last,id,profilepicurl,titleimageurl} = result.rows[0]

    profilepicurl = profilepicurl == null ? 'https://api.adorable.io/avatars/285/${first}.png' : `${s3Url}${profilepicurl}`
    titleimageurl =`${s3Url}${titleimageurl}`

    res.json({
      first: first,
      last: last,
      id: id,
      profilepicurl: profilepicurl,
      titleimageurl:titleimageurl
    })
  }).catch(err => console.log(err));
})



// ************ Workout Specific Routes ************ //

app.get('/exercises', (req,res) => {
  exerciseQuery.getExercises()
    .then(result =>res.json({exercises:result.rows}))
})

app.post('/userWorkoutPlan', (req,res) => {
  const WORKOUT = req.body.data.workoutDay
  const userid = req.session.user.id
  const{workoutTitle,workoutSplit,workoutDays} = req.body.data.workoutSetup

  WORKOUT.map((day) => {
    const{id,workoutday,musclegroup,exercise,sets,reps,pause,weight} = day

    exerciseQuery.insertWorkout(userid,workoutday,workoutTitle,musclegroup,id,sets,reps,pause,weight)

    exerciseQuery.getExercises().then(result => {
      const CHECK = result.rows
      if(CHECK.find(exe => exe.external_id == id) == undefined){
        exerciseQuery.insertExercise(musclegroup,exercise,id)
      }
    })
  })
})

app.get('/userWorkouts', (req,res) => {
  const userid = req.session.user.id

  exerciseQuery.getUserWorkouts(userid)
    .then(result => {
    const data = result.rows
    res.json({data:data})
  })
})

app.get('/')


app.get('*', function(req, res) {
  if (!req.session.user) {
    res.redirect('/welcome')
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});


app.listen(8080, function() {
    console.log("I'm listening.")
});
