require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routes/usersRoute');
const preferencesRouter = require('./routes/preferencesRoute');
const newsRouter = require('./routes/newsRoute');

const logger = require('./middlewares/loggerMiddleware');

app.use(logger);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/preferences", preferencesRouter);
app.use("/api/v1/news", newsRouter);
app.get("/", (req, res) => {
    res.send("Welcome to the News Aggregator API");
});

const port = process.env.PORT || 3000;

mongoose.connect(mongoUri).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
    });
}).catch((err) => {
    console.log('Something bad happened', err);
});

module.exports = app;