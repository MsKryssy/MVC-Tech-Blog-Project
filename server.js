const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./app/models'); // Import Sequelize models

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware needed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Session middleware
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: db.sequelize,
  }),
};
app.use(session(sessionOptions));

// Define routes
// Example: app.use('/api/posts', require('./app/routes/api/postRoutes'));
// Example: app.use('/', require('./app/routes/html/index'));

// Sync Sequelize models and start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
