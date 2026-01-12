require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtGen = require("./utils/jwtGen");
const db = require("./db");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

// Initialize database
const initDb = () => {
    const sql = fs.readFileSync("./database.sql", "utf8");
    db.exec(sql, (err) => {
        if (err) {
            console.error("Error initializing database:", err);
        } else {
            console.log("Database initialized");
        }
    });
};

initDb();

app.use(cors({ origin: "https://pharma-client-ru35.onrender.com", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.post("/register", (req, res) => {
    const data = req.body.data;
    const passHash = bcrypt.hashSync(data.pass, 10);
    const sql = `INSERT INTO Pharmacist VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [data.id, data.name, data.email, data.address, data.mobile, data.gender, data.username, passHash];
    db.run(sql, params, function(err) {
        if (err) {
            console.log(err);
            res.send({ status: false });
        } else {
            res.send({ status: true });
        }
    });
});

app.post("/login", (req, res) => {
    const data = req.body.data;
    const sql = `SELECT * FROM Pharmacist WHERE User_name = ?`;
    db.get(sql, [data.username], (error, row) => {
        if (error) {
            console.log(error);
            res.send({ status: false });
        } else {
            if (!row) {
                res.send({ status: false });
            } else {
                const status = bcrypt.compareSync(data.pass, row.Password);
                if (status) {
                    res.cookie(
                        "jwt_token",
                        jwtGen(row.Pharm_id, row.Pharm_name, row.Pharm_email),
                        { maxAge: 3600000, 
						  httpOnly: true, 
						  secure: true, 
						  sameSite: 'none'
						}
                    );
                    res.send({ status: true });
                } else {
                    res.send({ status: false });
                }
            }
        }
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("jwt_token", {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    res.send({ status: true });
});

app.post("/auth", (req, res) => {
    const token = req.cookies.jwt_token;
    if (!token) {
        res.send({ status: false });
        return;
    }
    try {
        const pharmdata = jwt.verify(token, process.env.JWT_SECRET);
        res.send({ pharmdata, status: true });
    } catch (e) {
        console.log(e);
        res.send({ status: false });
    }
});

app.post("/getaccount", (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM Pharmacist WHERE Pharm_id = ?`;
    db.get(sql, [id], (error, row) => {
        if (error) {
            console.log(error);
            res.send({ results: [] });
        } else {
            res.send({ results: row ? [row] : [] });
        }
    });
});

app.post("/updateaccount", (req, res) => {
    const data = req.body.data;
    const passHash = bcrypt.hashSync(data.pass, 10);
    const sql = `UPDATE Pharmacist SET Pharm_id = ?, Pharm_name = ?, Pharm_email = ?, Pharm_address = ?, Pharm_mobile = ?, Pharm_gender = ?, User_name = ?, Password = ? WHERE Pharm_id = ?`;
    const params = [data.id, data.name, data.email, data.address, data.mobile, data.gender, data.username, passHash, data.Pharm_id];
    db.run(sql, params, function(err) {
        if (err) {
            console.log(err);
            res.send({ status: false });
        } else {
            res.send({ status: true });
        }
    });
});

app.post("/deleteaccount", (req, res) => {
    const id = req.body.id;
    const sql = `DELETE FROM Pharmacist WHERE Pharm_id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            console.log(err);
            res.send({ status: false });
        } else {
            res.send({ status: true });
        }
    });
});

//customer
app.post("/checkcust", (req, res) => {
    const id = req.body.pharmid;
    const sql = `SELECT * FROM Customer WHERE Cust_id = ?`;
    db.get(sql, [id], (error, row) => {
        if (error) {
            console.log(error);
            res.send({ status: false });
        } else {
            res.send({ status: !!row });
        }
    });
});

app.post("/addcust", (req, res) => {
    const data = req.body.data;
    const sql = `INSERT INTO Customer VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [data.id, data.name, data.age, data.gender, data.address, data.mobile];
    db.run(sql, params, function(err) {
        if (err) {
            console.log(err);
            res.send({ status: false });
        } else {
            res.send({ status: true });
        }
    });
});

//medicine
app.post("/addmed", (req, res) => {
    const data = req.body.data;
    const sql = `INSERT INTO Medicine (Med_name, Med_price, Purch_date, Pharm_id, Cust_id) VALUES (?, ?, ?, ?, ?)`;
    const params = [data.medname, data.medprice, data.date, data.pharmid, data.custid];
    db.run(sql, params, function(err) {
        if (err) {
            console.log(err);
            res.send({ status: false });
        } else {
            res.send({ status: true });
        }
    });
});

app.post("/getsales", (req, res) => {
    const id = req.body.id;
    const date = req.body.date;
    const sql = `SELECT * FROM Medicine WHERE Pharm_id = ? AND Purch_date = ?`;
    db.all(sql, [id, date], (error, rows) => {
        if (error) {
            console.log(error);
            res.send({ status: false });
        } else {
            res.send({
                results: rows,
                status: true,
            });
        }
    });
});

app.get("/ping", (req, res) => res.send("pong"));

app.get("/", (req, res) => {
    res.send("Server Working");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
