require('dotenv').config();
const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

const indexRouter = require("./routes/indexRouter");
const messagesRouter = require("./routes/messagesRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const clubRouter = require("./routes/clubRouter");

app.use("/", indexRouter);
app.use("/messages", messagesRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/club", clubRouter);

app.use((req, res) => {
    res.status(404).render("404", { title: "Page Not Found" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});