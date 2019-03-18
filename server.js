// general Imports
const express = require('express');
const util = require('util');
const sqlite = require('sqlite3').verbose();
const sqliteJson = require('sqlite-json');

//-- Helper Imports
const helper = require('./helper/helper');
const loggerHelper = require('./helper/logger');

//-- Constants to be used
const HOST = 'localhost';
const PORT = 8081;
const logger = loggerHelper.logger;
const db = new sqlite.Database('../bank-database/bank.db');
const exporter = sqliteJson(db);

var app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.write('hello');
});

app.get('/getAccountNumbers', (req, res) => {

    exporter.json('select accnum FROM accounts', (err, json) => {

        if (err) {
            logger.warn(err);
            res.status(500);
            res.json("{'error': true, 'message': '" + err + "'}");
        }

        logger.debug(json);
        res.json(JSON.parse(json));
    });

});

app.post('/createAccount', (req, res) => {

    let accnum = helper.createAccId();
    logger.debug("created new accnum: " + accnum);

    let accname = req.body.name;
    logger.debug("Add new User: " + accname);

    var stmt = db.prepare("INSERT INTO accounts (accnum, accowner, accbalance) VALUES ('" + accnum + "', '" + accname + "', 0) ");
    stmt.run();
    stmt.finalize();

    res.redirect(HOST + ':' + PORT + '/getAccount?accnum=' + accnum);
});

app.put('/closeAccount', (req, res) => {

    logger.debug("got a put request: " + JSON.stringify(req.body));

});

app.get('/getAccount', (req, res) => {

    let accnum = req.query.accnum;
    logger.debug("/getAccount: " + accnum)

    exporter.json("SELECT * from accounts where accnum = '" + accnum + "'", (err, json) => {

        if (err) {
            logger.warn(err);
            res.status(500);
            res.json("{'error': true, 'message': '" + err + "'}");
        }

        logger.debug(json);
        res.json(JSON.parse(json));
    });

});

app.post('/transfer', (req, res) => {
    let accnumfrom = req.body.accfrom;
    let accnumto = req.body.accto;
    let amount = req.body.amount;
});


app.post('/deposit', (req, res) => {

    // todo move to a function

    let amount = parseInt(req.body.amount);
    let accnum = req.body.accnum;

    var stmt = db.prepare("UPDATE accounts set accbalance = accbalance + " + amount + " where accnum = '" + accnum + "'");
    stmt.run();
    stmt.finalize();

    logger.debug("add " + amount + " to  " + accnum);
    res.redirect(HOST + ':' + PORT + '/getAccount?accnum=' + accnum);
});


app.post('/withdraw', (req, res) => {

    // todo move to a function

    let amount = parseInt(req.body.amount);
    let accnum = req.body.accnum;

    var stmt = db.prepare("UPDATE accounts set accbalance = accbalance - " + amount + " where accnum = '" + accnum + "'");
    stmt.run();
    stmt.finalize();

    logger.debug("withdrawn " + amount + " from  " + accnum);
    res.redirect(HOST + ':' + PORT + '/getAccount?accnum=' + accnum);
});


var server = app.listen(PORT, HOST, () => {
    helper.printHead();
    var host = server.address().address;
    var port = server.address().port;

    db.run('CREATE TABLE IF NOT EXISTS accounts (' +
        'accid INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'accnum TEXT NOT NULL UNIQUE, ' +
        'accowner TEXT NOT NULL, ' +
        'accbalance NUMERIC, ' +
        'accclosed	INTEGER DEFAULT 0)');

    logger.info(util.format("REST SERVER started and listening at http://%s:%s", host, port));
});