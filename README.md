This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Make sure to add GENERATE_SOURCEMAP=false in the .env file

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Tech and Tools used

- CSS: CSS module with tailwind
- Routing with React Router: https://reacttraining.com/react-router/web/guides/quick-start
- PWA: https://create-react-app.dev/docs/making-a-progressive-web-app
- Fetch for API calls

### BUILD and Deploy

```
npm install -g firebase-tools
firebase login

```

- `yarn build-prod`
- `firebase deploy`
