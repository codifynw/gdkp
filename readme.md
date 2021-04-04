brew services start mongodb-community@4.4
brew services list

CONFIG ENV
MONGO_URI=mongodb+srv://USER:PW@DBTABLE.9wnxc.mongodb.net/DBCLUSTERNAME?retryWrites=true&w=majority
CLIENT_ID=YOUR_CLIENT_ID_HERE
CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
OAUTH_TOKEN_HOST=https://us.battle.net

LOCAL:
run the dev script to start the backend, run `npm start` in the frontend. Frontend will be able to access BE routes through the router.

HEROKU BUILD (logged in using CLI):
git push heroku master
