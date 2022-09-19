# M.E.R.N GraphQL Full Stack Phone Book

Apollo Server with Express middleware connected to a Mongo database serving a TS React client using react-query.

![Alt text](https://live.staticflickr.com/65535/52368178296_ca308788e8_b.jpg)

## Getting Started

### Dependencies

* Docker

### Installing Dependencies

* [How to install Docker](https://docs.docker.com/get-docker/)

### How to run the app for the first time

* Open a terminal is this project directory and run the command below
```
docker compose up -d --build
```


* To stop the app run the command below
```
docker compose down
```

## Tips

The client is externally mapped to port http://localhost:3000,
the Server is externally mapped to port http://localhost:4000/graphql,
the database is externally mapped to port https://localhost:27017

## Authors

[Jason Warner](https://jasonwarner.dev)
