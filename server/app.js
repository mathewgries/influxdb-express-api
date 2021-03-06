/** 
 * SET UP THE SERVER
 * This set up is based on the exmple provided at:
 *  https://github.com/node-influx/node-influx/tree/master/examples/express_response_times
*/
const express = require("express");
const cors = require('../server/cors-config')
const routes = require('../routes')

// Initialize the app
const app = express();

/**
 *  Allow post requests for preflight response
 *  Might take an array of endpoints as first argument,
 *  or state once for each end point - (I don't know yet) 
 */
app.options('/times', cors)

/** 
 *  Allow content-type for json
*/
app.use(express.json({ type: ['application/json', 'text/plain'] }))

/**
 *  routes is an array of routes imported from ../routes/index.js
 */
 app.use('/', routes)

/**
 *  Handle 404 errors 
 */
app.use((res, req, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

/**
 *  Return errors to the client
 */
app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({ error: { message: err.message } })
})

/**
 *  Basic HTML page - Test The server is running
 *  http://localhost:3001
 */
app.get("/", function (req, res) {
    setTimeout(() => res.end("Hello world!"), Math.random() * 500);
});

/**
 *  Start the server
 */
app.listen(3001, () => console.log('Influx API listening on port 3001!'));