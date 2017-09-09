# SagaSphere Backend
## TODO
### Update service
Create a micro-service that will automatically fetch news from every saga and push notification to users that follow them.
It could achieve on a news page for every users.
## Server
### Docker-Dev environment
To run only the MySQL server and PhpMyAdmin use the following command :
```
docker-compose -f docker-compose.dev.yml up -d
```
### Local development
To developp locally replace in '__./sagasphere/src/index.js__' the MySQL default connectivity by :
```
let mysqlConnection = mysql.createConnection({
    host        : process.env.SAGASPHERE_MYSQL_HOST || "localhost",
    localAddress: process.env.SAGASPHERE_MYSQL_LOCALADDRESS || "localhost",
    user        : process.env.SAGASPHERE_MYSQL_USER || "root",
    password    : process.env.SAGASPHERE_MYSQL_PASS || "xxx",
    database    : process.env.SAGASPHERE_MYSQL_DATABASE || "sagasphere"
});
```
Or with your custom environment data.

NOTE : Replace the password by the one defined in the '__.env__' file for the environment variable '__SAGASPHERE_MYSQL_PASSWORD__'