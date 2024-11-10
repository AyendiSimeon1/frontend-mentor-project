const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDatabase } = require('./src/config/db');
const helmet = require('helmet');
const routes = require('./src/routes');


const app = express();

app.use(helmet());
app.use(cors());


app.use(routes);



const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if(isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
};


const port = normalizePort(process.env.PORT || '4000' );


const server = () => {
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`)
    })
}
server();