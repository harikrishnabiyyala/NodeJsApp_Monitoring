const express = require("express");
const responseTime = require("response-time");
const client = require("prom-client");   // Metric Collection
const { doSomeHeavyTask } = require("./util");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");


const options = {
    
    transports: [
      new LokiTransport({
        host: "http://loki:3100",
        labels: {
            appName: "express",
        }
      })
    ]

  };

const logger = createLogger(options);



const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "This tells how much time is taken by req and res",
    labelNames: ['method', 'route', 'status_code'],
    buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000]
});


const httpRequestCounter = new client.Counter({
    name: 'http_request_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route']
});

app.use(responseTime((req, res, time) => {

    //if (req.path !== '/metrics') {

        httpRequestCounter.labels(req.method, req.path).inc();
   
        reqResTime.labels({
            method: req.method,
            route: req.url,
            status_code: res.statusCode
        }).observe(time);
       
  //  }
}));

app.get("/", (req, res) => {
    logger.info("request came to / route");
    return res.json({ message : `Hello from Express Server`});
});

app.get("/slow", async (req, res) => {
    logger.info("request came to /slow route");
    try{
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "Success",
            message: `Heavy task Completed in ${timeTaken} ms`, 
        });
    } catch (error){
        logger.error(error, error.message);
        return res
            .status(500)
            .json( { status: "Error", error: "Internal Server Error"});
    }
});

app.get("/metrics", async (req, res) => {
    logger.info("request came to /metrics route");
    res.setHeader("Content-Type" , client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
})

app.listen(PORT, () => {
  console.log(`Express Server Started at http://localhost:${PORT}`);
});