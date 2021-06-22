
# Workbloc

PPH DID's work log tracking system. Made with Node.js and Next.js. Users can 
add and create items to their daily work log. Admin and team leaders can 
check, approve or dissparove work log. Organize users with teams.




## Installation 

To run the app locally, make sure you have a Node.js installed. You can download 
the installer or binary [here](https://nodejs.org/en/download/).

Download or clone the repository.

```bash
  git clone https://github.com/abevince/workbloc.git
```
After cloning, install the dependencies of the server and client

Server

```bash 
  cd workbloc/server
  npm install
```

Client
```bash 
  cd workbloc/client
  npm install
```
Before running the app, make sure to run Docker first. As the database 
(Postgres) and Redis containers needs to be running before starting the app.

To run the containers, go to the docker folder and run
```bash
  docker-compose up -d
```
This will download and run the containers.

You can now run the server and client.

Server

```bash 
  cd workbloc/server
  npm run server
```
To access the server/GraphQL playgroun, go to
[http://localhost:4001/graphiql](http://localhost:4001/graphiql)

Client
```bash 
  cd workbloc/client
  npm run dev
```
To access the client, go to
[http://localhost:3000](http://localhost:3000)


## Screenshots
Dashboard
![Dashboard](https://github.com/abevince/workbloc/blob/main/images/dashboard.png?raw=true)

Signup
![Signup](https://github.com/abevince/workbloc/blob/main/images/signup.png?raw=true)

Login
![Login](https://github.com/abevince/workbloc/blob/main/images/login.png?raw=true)

GraphiQL Playground
![Playground](https://github.com/abevince/workbloc/blob/main/images/graphql-explorer-server.png?raw=true)

