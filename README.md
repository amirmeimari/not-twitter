# Not Twitter

<h2 align="center">A semi twitter clone(CRUD) built with React.</h2>

## Features

- Create, comment, react to tweets in timeline.
- Instant sharing in real twitter or with a friend.
- Uses fake https://jsonplaceholder.typicode.com API's to simulate network
  request.
- Manege tweets / comments and users in localStorage.
- Uses react-redux for state management.
- Uses react-hook-forms for validations.

## Project file structure

    .
    ├── assets/
    │   ├── icons/
    │   ├── images/
    │   └── styles/
    ├── components/
    │   ├── Button/
    │   ├── Divider/
    │   ├── DropDownMenu/
    │   ├── Header/
    │   ├── Layout/
    │   ├── Modal/
    │   ├── NewTweet/
    │   ├── ReactionPopup/
    │   ├── TextField/
    │   └── Tweet/
    ├── data/
    │   ├── tweets.json
    │   └── users.json
    ├── store/
    │   └── index.js
    ├── views/
    │   ├── Details.js
    │   └── Home.js
    ├── App.js
    └── index.js

## Date structure and types

Current data structure exist on `data` directory with in two `json` files. here
is the data structure for a user

```
{
  user_id: String | Number,
  name: String,
  avatar: String,
  username: String
}
```

And a for a tweet:

```
{
  tweet_id: String | Number,
  tweet_owner_id: String | Number,
  tweet_owner_name: String,
  tweet_owner_avatar: String,
  tweet_owner_username: String,
  date: Date,
  body: String,
  reaction: Null | Number,
  comments: Array
}
```

## Data flow

For every action except reacting to tweets, an post or get request for
jsonplaceholder server will be sent using `axios` package. for most part
returned data will be ignored (except new tweet and new comment) and result will
be saved in state and localStorage trough actions in redux in `store` directory.

<br />
<hr />
<br />

## Available Scripts

In the project directory, you can run:

    npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

    npm run build

Builds the app for production to the `build` folder.
