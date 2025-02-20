# Notes


``` shell
    npm init 
    npm install express
    npm install prom-client
```

For Running use

```shell
    node index.js
```

Execute below to start the infrastructure

when we change some code of application we want to rebuild image and use that images so use --build 

```shell
    docker compose up --build
```

Default user name and password of grafana 

userName : admin
password : admin

Log into grafana and on left menu add connections 
search for prometheus

add url http://prometheus:9090 and save and test

now go to home > explore > prometheus    select prometheus as data source .

now in select metric select which metric u want to visualize graph and run query

---

we have the example how to monitor node js app by official grafana team 

https://grafana.com/grafana/dashboards/11159-nodejs-application-dashboard/

and we can download pre developed dashboards from that website and import them to our grafana

check the json file 11159_rev1.json

or we can just copy the dashboard ID from the website and give that as input it automatically takes it


## Adding custom Metrics

check using client. in auto suggestions u can see histogram , counter , guage .. etc

```shell
    npm install response-time
```

Go to Dashboard 
create new Dashboard and use the below query in new visualization

``` shell
    histogram_quantile(0.95, sum by(le, route) (rate(http_express_req_res_time_bucket{route!="/metrics"}[$__rate_interval])))
```

Add request counter as well if need 

if need to ignore the metric route in request counter use if and increase count if not /metric


## Logs collection 

 winston and winston-loki is the log exporter from our node js app to grafana loki  
 then from grafana loki  grafana will pull to visulaize

https://www.npmjs.com/package/winston-loki

```shell
 npm install winston winston-loki
```

After adding the required code and looger messages 

go to the connectiosn and add loki data source there 

url : http://loki:3100 



To list any process listening to the port 8080:

lsof -i:8080
To kill any process listening to the port 8080:

kill $(lsof -t -i:8080)
or more violently:

kill -9 $(lsof -t -i:8080)


Ref Video : https://youtu.be/ddZjhv66o_o?si=ZMah2HCNdGQIQNYj