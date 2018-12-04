# NODE JS + EXPRESS + TYPESCRIPT RESTFUL API

## What

Our main goal is to build a WEB API based on the information provided by these 2 endpoints:
* http://www.mocky.io/v2/5808862710000087232b75ac
* http://www.mocky.io/v2/580891a4100000e8242b75c5

### FEATURES

- [x] **Authentication and authorization by roles**.
- [x] **Usage of last technologies**
- [x] **Solution properly structured**
- [x] **Usage of patterns** with Repository pattern
- [x] **Quality code**
- [x] **API documentation** with SWAGGER
- [x] **Testing (unit + e2e)**
- [x] **Error handling**
- [x] **Logs** with Morgan and Wisnton
- [x] **MYSQL Database** with Typeorm


## Table of Contents

- [Getting Started](#-getting-started)
- [Scripts and Tasks](#-scripts-and-tasks)
- [API Routes](#-api-routes)
- [Project Structure](#-project-structure)
- [Further Documentations](#-further-documentation)


## Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/).

Install yarn globally

```bash
npm install yarn -g
```
Install a MySQL database.

### Step 2: Set up the project

Fork or download this project.

Rename the env.example file to .env and edit this file with your database connection information.

Create a new database with the name provided in your .env file.

```bash
yarn install
```

> This install al the dependecies declared in the package.json file.


```bash
yarn start db.migrate
```

> This execute the migration files.

```bash
yarn start db.seed
```

> This execute the seed files and **populate our database** with the provided clients and policies data.


### Step 3: Serve your App in dev mode

Go to the project dir and start your app with this yarn script.

```bash
yarn start serve
```

> This starts a local server using `nodemon` at http://localhost:3000, .

### Step 4: Enjoy!

Go to http://localhost:3000/swagger and try out this awesome API. Because the users do not have a password set, **the password** of each one is **the name of the user**.
For example: for logging in with the (admin) user Manning. 
- Username: Manning
- Password: Manning


## Scripts and tasks

All script are defined in the `package-scripts.js` file, but the most important ones are listed here.

### Install

- Install all dependencies with `yarn install`

### Linting

- Run code quality analysis using `yarn start lint`. This runs tslint.

### Tests

- Run the unit tests using `yarn start test`.
- Run the e2e tests using `yarn start test.e2e`.

### Building the project and running it

- Run `yarn start build` 
- To start the built app use `yarn start`.

### Checking licenses

- Run `yarn licenses list` 
> Running this command will list, all of the packages that were installed by yarn or yarn install, and give you the license associated with each package

## API Routes

The route prefix is `/api` by default, but you can change this in the .env file.
The swagger route along with swagger credentials can be modified in the `.env` file.

| Route          | Description |
| -------------- | ----------- |
| **/api**       | Shows us the name, description and the version of the package.json |
| **/swagger**   | This is the Swagger UI with our API documentation |
| **/api/users** | User entity endpoint |
| **/api/policies**  | Policy entity endpoint |


## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **dist/**                         | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/api/controllers/**          | REST API Controllers |
| **src/api/errors/**               | Custom HttpErrors like 404 NotFound |
| **src/api/middlewares/**          | Express Middlewares like helmet security features |
| **src/api/models/**               | Bookshelf Models |
| **src/api/repositories/**         | Repository / DB layer |
| **src/api/services/**             | Service layer |
| **src/api/subscribers/**          | Event subscribers |
| **src/api/** swagger.json         | Swagger documentation |
| **src/auth/**                     | Authentication checkers and services |
| **src/core/**                     | The core features like logger and env variables |
| **src/database/migrations**       | Database migration scripts |
| **src/database/seeds**            | Seeds to create some data in the database |
| **src/decorators/**               | Custom decorators like @Logger & @EventDispatch |
| **src/loaders/**                  | Loader is a place where you can configure your app |
| **test**                          | Tests |
| **test/e2e/** *.test.ts           | End-2-End tests (like e2e) |
| **test/unit/** *.test.ts          | Unit tests |
| .env                      | Environment configurations |
| .env.test                         | Test environment configurations |


## Further Documentations

| Name & Link                       | Description                       |
| --------------------------------- | --------------------------------- |
| [Express](https://expressjs.com/) | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. |
| [Microframework](https://github.com/pleerock/microframework) | Microframework is a simple tool that allows you to execute your modules in a proper order, helping you to organize bootstrap code in your application. |
| [routing-controllers](https://github.com/pleerock/routing-controllers) | Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework. |
| [TypeORM](http://typeorm.io/#/) | TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework. |
