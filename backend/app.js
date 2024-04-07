const express = require('express');
const chartController = require('./controllers/Anthogram');
const userController = require('./controllers/User');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const layer8 = require('layer8_middleware');
const cors = require('cors');
const app = express();


app.use(layer8.tunnel);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async function (req, res, next) {
  res.json({error: "Doesn't exist"})
});

// ANTHOGRAMS
app.get('/api/anthograms', async function (req, res, next) {
try {
    const charts = await chartController.getCharts()
    res.status(201).json({charts})
} catch (e) {
  console.error("ERROR:", e)
  res.status(500).json({error: e.message})
}
});

app.post('/api/anthogram', async function (req, res, next) {
  try {
    const body = req.body
    const newChart = await chartController.createChart(body)
    res.status(201).json({success: "Chart added", newChart})
  } catch (error) {
    console.error("ERROR:", error.message)
    res.status(500).json({error: error.message})
  }
})


// =====> USERS
app.get('/api/users', async function (req, res, next) {
  try {
    const users = await userController.getAllUserData()
    res.status(201).json({users})
  } catch (e) {
    console.error("ERROR", e)
    res.status(500).json({error: e.message})
  }
});

//Get user by id
app.get('/api/user/:id', async function (req, res, next) {
  const userId = req.params.id
  console.log(" =========>>>>>>");

  try {
    const user = await userController.getSingleUser(Number(userId))
    if (user === null) {
      res.status(201).json({message: 'User doesn\'t exist'})
    } else {
      res.status(201).json({user})
    }
  } catch (e) {
    console.error("ERROR", e)
    res.status(500).json({error: e.message})
  }
});

//Create user data
app.post('/api/user', async function (req, res, next) {
  const body = req.body
  const currentTime = new Date()

  try {
    const userIpRequest = await fetch("https://api.ipify.org?format=json", {
      method: 'GET'
    })

    const userIp = await userIpRequest.json()
    console.log(" =========>>>>>>");
    const userData = await userController.postUserData({
      ...body,
      id: userIp.ip,
          // "192.222.222.222",
      visitTime: currentTime
    })
    const { id, visitTime, ...newUserData} = userData

    res.status(201).json({success: "User added", data: {id: userIp.ip, visitTime: currentTime, ...newUserData,
      }})
  } catch (e) {
    console.error("ERROR", e)
    res.status(500).json({error: e.message})
  }
})

//Remove user data
app.delete('/api/user', async function (req, res, next) {
  const id = req.body.id
  try {
    const user = await userController.deleteUser(id)
    res.status(201).json({success: "User removed", user: user})
  } catch (e) {
    if(e.code === 'P2025') {
      res.status(500).json({error: "User doesn\'t exist"})

    } else {
    res.status(500).json({error: e.code})
    }
  }
})

  app.listen(3004, async () => {
    console.log('Server is running on port 3004');
  })
module.exports = app;
