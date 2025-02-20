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

```shell
    docker compose up
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
