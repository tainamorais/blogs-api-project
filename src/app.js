const express = require('express');

const userRoutes = require('./routes/user.routes');
const loginRoutes = require('./routes/login.routes');
const categoryRoutes = require('./routes/category.routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`

app.use('/user', userRoutes);

app.use('/login', loginRoutes);

app.use('/categories', categoryRoutes);

module.exports = app;
