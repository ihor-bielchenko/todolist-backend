'use strict';
require('dotenv').config();

const express = require('express');
const expressSubdomain = require('express-subdomain');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const xssClean = require('xss-clean');

const onWarning = require('./handlers/onWarning.js');
const onExit = require('./handlers/onExit.js');
const onUncaughtException = require('./handlers/onUncaughtException.js');
const onUncaughtExceptionMonitor = require('./handlers/onUncaughtExceptionMonitor.js');

const middlewareCheckHasJWTRefreshToken = require('./middlewares/checkHasJWTRefreshToken.js');
const middlewareCheckHasJWTAccessToken = require('./middlewares/checkHasJWTAccessToken.js');
const middlewareCheckJWTRefreshToken = require('./middlewares/checkJWTRefreshToken.js');
const middlewareCheckJWTAccessToken = require('./middlewares/checkJWTAccessToken.js');
const middlewareCheckHasPassword = require('./middlewares/checkHasPassword.js');
const middlewareCheckHasLogin = require('./middlewares/checkHasLogin.js');
const middlewareTaskListParseQueryProperties = require('./middlewares/taskListParseQueryProperties.js');
const middlewareTaskDataValidate = require('./middlewares/taskDataValidate.js');

const controllerLogin = require('./controllers/login.js');
const controllerRefresh = require('./controllers/refresh.js');
const controllerTaskList = require('./controllers/taskList.js');
const controllerTaskCreate = require('./controllers/taskCreate.js');
const controllerTaskUpdate = require('./controllers/taskUpdate.js');
const controllerTaskStatus = require('./controllers/taskStatus.js');
const controllerTaskDelete = require('./controllers/taskDelete.js');

const port = process.env.APP_EXPRESS_PORT || 3012;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', [
	middlewareCheckHasLogin,
	middlewareCheckHasPassword,
], controllerLogin);
app.post('/refresh', [
	middlewareCheckHasJWTAccessToken, 
	middlewareCheckHasJWTRefreshToken, 
	middlewareCheckJWTRefreshToken,
], controllerRefresh);

app.get('/task', middlewareTaskListParseQueryProperties, controllerTaskList);
app.post('/task', middlewareTaskDataValidate, controllerTaskCreate);
app.patch('/task/:id', middlewareTaskDataValidate, controllerTaskUpdate);
app.patch('/task/:id/status', [
	middlewareCheckHasJWTAccessToken,
	middlewareCheckJWTAccessToken,
], controllerTaskStatus);
app.delete('/task/:id', controllerTaskDelete);

app.listen(port, () => {
	console.log(`Service successfully started at http://127.0.0.1:${port}`);
});

process.on('exit', onExit);
process.on('warning', onWarning);
process.on('uncaughtException', onUncaughtException);
process.on('uncaughtExceptionMonitor', onUncaughtExceptionMonitor);
