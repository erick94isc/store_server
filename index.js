var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.set('port', (process.env.PORT || 5000));
app.use(cors());

//models of Sequelize
const models = require('./models');

//initialize firebase admin here

const routes = require('./routes/index');
routes(app);


//If a PostgreSQL database will be used
// models.sequelize.sync().then(function () {
//   app.listen(app.get('port'), function () {
//     console.log('Node app is running on port', app.get('port'));
//   });
// });

// if no PostgreSQL database is needed
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});


