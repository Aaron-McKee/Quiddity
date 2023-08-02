This project was built using React, Sass, HTML, JSX, Rest API, Node JS, Express and MongoDB with JWT and Stripe integration. 
It is a market-place outsourcing web application.

Prerequisites  - Check package.json for full list: 


NPM

Axios

Express

React

Sass

Node JS

MongoDB

Nodemon

The project repository can be found in GitHub link.


Check that you have node and npm installed.

To check if you have Node.js installed, run this command in your terminal:

node -v

To confirm that you have npm installed you can run this command in your terminal:

npm -v

To confirm that you have MongoDB installed you can run this command in your terminal:

mongo -v


To start the client side application run the following command:

npm run dev

To start the api side application run the following commmand:

nodemon 

Environment Variables:

To run this project, you will need to add the following environment variables to your .env file:

Server

JWT_SECRET e.g. this_is_secret_123

MONGODB_URI e.g. mongodb cluster URI

STRIPE_SECRET e.g. Secret key from stripe dashboard

NODE_ENV e.g. 'development' for local and 'production' for production



Client

VITE_API_URL e.g. http://localhost:3000/api or production deployed server link

VITE_STRIPE_PUBLISHABLE_KEY e.g. Publishable key from stripe dashboard

Tools used on this project:

Visual Studio Code

Vite.js

MongoDB 

Coudinary

Stripe Dashboard to monitor payments
