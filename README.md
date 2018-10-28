Demo app: https://dcordtroller.herokuapp.com

# For running the front-end

Use these commands before running for the first time.

- `npm install`
- `npm start` to run.

For Soundboard, go to soundboard folder and use these commands:

- `npm install`
- `node music.js`

# For running the server

- Go to `/server`: `cd server`
- Use `npm install` before running for the first time.
- Create a `.env` file and add two line: <br>
 ```
 SECRET_KEY=<YOUR_SECRET_KEY>
 DB_HOST=<YOUR_MONGODB_HOST>
 ```
>Note: No space before and after `=` <br>
>SECRET_KEY is a random string by your own, eg. `adkjs324nbjsb&+jhsdbf3b_jbkjb35n5bnm35bmnb5`
- `node index.js` to run.
