const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const app = express();

/* connecting to mongodb-database & listen for requests */
const dbURI = "mongodb+srv://test:test123@blogs.suhphys.mongodb.net/test";

const PORT = 3000 || process.env.PORT

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

/* middleware & static files  */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

/* routes */
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

/* 404 page */
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});