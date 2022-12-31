<h1 align="center">
    <p>TypeORM API for checking if user has all classes scheduled</p>
</h1>

# Table of Contents

-   [🚀 Tecnologies](#-tecnologies)
-   [📜 About the Project](#-about-the-project)
-   [💻 Running Application](#-running-application)
    -   [Using Docker](#using-docker)
    -   [Manual Run](#manual-run)
-   [🧪 Test Commands](#-test-commands)

# <span>🚀</span> Tecnologies

-   [Node.js](https://nodejs.org/en/)
-   [TypeScript](https://typescriptlang.org)
-   [TypeORM](https://github.com/typeorm/typeorm)
-   [Express](https://github.com/expressjs/express)
-   [Jest](https://jestjs.io/pt-BR/)
-   [Docker](https://www.docker.com/)

# <span>📜</span> About the Project

The main goal of this project is to demonstrate the use of SQL with TypeORM on a Node.js server with
TypeScript, applied to a simple real case scenario, covered by unit and integration tests using
Jest.

The route has been ejected and simplified from a bigger context, on this context it is used by a
frontend to indicate to User that whether he has the right to join more classes. A simplified
version of the scenario contains a Subscription, that belongs to an User, and holds the minutes per
week that he is entitled to. One Subscription can have multiple classes(SubscriptionClass) and each
class can have different times per week. Basically the route checks if the minutes per week holded
by Subscription is lesser than the sum of all the times associated to the classes thar are related
to the Subscription.

Furthermore the project uses some great design patterns that works well together, the Adapter
pattern and the Dependency Injection. The most important is the use of Dependency Injection for
better testability and decoupling.

# <span>💻</span> Running Application

## Using Docker

**Requirements**:

-   Docker
-   Yarn

1 - Run the Docker containers in background

```.sh
docker-compose up -d
```

2 - Run the migration on Database

```.sh
yarn docker:migrate
```

3 - [Optional] Run the seeder to populate the Database

```.sh
yarn docker:seed
```

4 - Make GET Request to
[http://localhost:7777/users/:userId/has-scheduled-classes](http://localhost:7777/users/:userId/has-scheduled-classes)
Replace :userId with the id of an User of the database, if you ran the seeder, the users created
have been printed on terminal

Extra - You can access the database on browser using [http://localhost:8080](http://localhost:8080)
The login form can be filled with the data contained in `./.env.example`

## Manual Run

**Requirements**:

-   Yarn
-   mysql

1 - Install the dependencies

```.sh
yarn
```

2 - Make a copy of `./.env.example` and name it as `.env` - Replace all the values on your new .env
file with valid ones

3 - Run the migration on Database

```.sh
yarn migrate
```

4 - [Optional] Run the seeder to populate the Database

```.sh
yarn seed
```

5 - Run the server

Watch Mode(Restart on every file change)

```.sh
yarn dev
```

Static Mode(The file changes are computed only after a new run)

```.sh
yarn build
yarn start
```

6 - Make GET Request to
[http://localhost:3000/users/:userId/has-scheduled-classes](http://localhost:3000/users/:userId/has-scheduled-classes)
Replace :userId with the id of an User of the database, if you ran the seeder, the users created
have been printed on terminal. If you change the server port on .env remember to change the URL
accordingly.

# <span>🧪</span> Test Commands

In order to run all application tests run the following command:

```.sh
yarn test
```

In order to collect the coverage of the application tests run the following command:

```.sh
yarn coverage
```
