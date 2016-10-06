'use strict';

var express = require('express');
var moment = require('moment');
var app = express();
var fs = require('fs');
var path = require('path');
var storedDate = null;

var port = process.env.PORT || 8080;

  app.listen(port, function() {
    console.log("Listening on port: " + port);
  });

  app.get('/', function(req, res) {
    var fileName = path.join(__dirname, 'index.html');
    res.sendFile(fileName, function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log('Sent:', fileName);
      }
    });
  });

  app.get('/:dateString', function(req, res) {
    if (/^\d{9,}$/.test(req.params.dateString)) {
      storedDate = moment(req.params.dateString, "x");
    } else {
      storedDate = moment(req.params.dateString, "MMMM D, YYYY");
    }

    if (storedDate.isValid()) {
      res.json({
        unix: storedDate.format("x"),
        natural: storedDate.format("MMMM D, YYYY")
      });
    } else {
      res.json({
        unix: null,
        natural: null
      });
    }
  });
