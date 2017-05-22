# SagaSphere Backend
## Server
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

NOTE : Replace the password by the one defined in the '__.env__' file for the environment variable '__SAGASPHERE_MYSQL_PASSWORD__'