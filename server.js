(function () {
    'use strict';
    const express = require('express');
    const path = require('path');
    const bodyParser = require('body-parser');
    const compression = require('compression');

    const portNumber = process.env.PORT || 3000;
    function shouldCompress () {
        return true
    }

    function modifyHeaders(res) {
      res.setHeader('Cache-Control', 'private, max-age=25920000');
      res.removeHeader("X-Powered-By");
    }

    function initializeDevServer() {
      const app = express();
      app.use(compression({ filter: shouldCompress}));
      app.use(bodyParser.json());
      
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use((req, res, next) => {
        modifyHeaders(res);
        next();
      });
      app.use(express.static(path.join(__dirname, 'dist')));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
      });
  
      app.listen(portNumber, () => {
        console.log('server listening at ' + portNumber);
      });
    }
    initializeDevServer();
  })();

