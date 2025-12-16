require("dotenv").config();

const express = require("express");
const app = express();
const path = require("node:path");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const pool = require("./db/pool");

const assetsPath = path.join(__dirname, "public");

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body parsing + static assets
app.use(express.urlencoded({ extended: false }));
app.use(express.static(assetsPath));

// Sessions store
app.use(
    session({
        store: new pgSession({
            pool,
            tableName: "session",
            createTableIfMissing: true
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

// Passport init + session hookup
app.use(passport.initialize());
app.use(passport.session());

// Routers
const indexRouter = require("./routes/indexRouter");
const messagesRouter = require("./routes/messagesRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const clubRouter = require("./routes/clubRouter");

// Passport Local Strategy (bcrypt)
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );

            const user = rows[0];
            if (!user) return done(null, false, { message: "Incorrect username" });

            const ok = await bcrypt.compare(password, user.password_hash);
            if (!ok) return done(null, false, { message: "Incorrect password" });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        done(null, rows[0] || false);
    } catch (err) {
        done(err);
    }
});

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use((req, res, next) => {
    res.locals.activePath = req.path;
    next();
});

// Routes
app.use("/", indexRouter);
app.use("/messages", messagesRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/club", clubRouter);
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// 404
app.use((req, res) => {
    res.status(404).render("404", { title: "Page Not Found" });
});

// // 500
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).render("500", { title: "Server Error" });
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});