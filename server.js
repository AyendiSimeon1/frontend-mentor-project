const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDatabase } = require('./config/database');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandlers');
const { createLogger } = require('./config/logger');
const routes = require('./src/routes');


const logger = createLogger();

const app = require('./app');


app.use(helmet());
app.use(cors());
app.use(compression());

app.user(routes);
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim())}}));

app.use(notFoundHandler);
app.use(errorHandler);

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if(isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
};


const port = normalizePort(process.env.PORT || '3000' );

const server = appl.listen(port, () => {
    logger.info(`Server is listening on port ${port} `)
});

