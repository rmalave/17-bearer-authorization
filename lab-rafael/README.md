# MongoDB RESTful API

**Author** : Rafael Malave

## Overview

This is a simple example of bearer authorization using nodejs and express with jasonwebtokens.
## Getting started

Clone this repository to your local computer. Run `npm install` to install the necessary packages. Start the server with npm start and start mongodb on your local machine with `mongod`. run the tests by running `npm test`.

To manually send requests, use [HTTPie](https://httpie.org/) or [Postman](https://www.getpostman.com/).

## HTTP Methods


### User endpoints

- POST endpoint `/api/signup` Supported fields: `username` (string, required, unique) `email` (string, required, unique); 

- GET endpoints `/api/signin` Pass the username and password to the server using a `Authorization: Basic Base64(username:password)` header  
### Article endpoints: use `Authorization Bearer`

- POST `/api/articles` with a valid token to be able to post an article Supported fields: `title` (string, required) `body` (string, required) userId: (string, required)
- GET `/api/articles` returns all articles
- DELETE `/api/article/:_id` delete article

The server responds with status **200** for legitimate usernames and correct password.
The server should respond with status **401 Unauthorized** for non-authenticated user. 

## Technologies

- Nodejs
- Express
- npm
- MongoDB




