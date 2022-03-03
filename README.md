# React + Reach Application Scaffold

## What is it? 

Inspired by [@zetsuboii's starter pack](https://github.com/Zetsuboii/reach-react-starter). This is a quick scaffold/template for building a `ReactJS` and `Reach Lang` DApp. The development env and build process are handled by **webpack**.\
If you need to add or modify Webpack config overrides, consider using [@craco](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation)

## What does it contain? 

* [ReactJS](https://github.com/facebook/create-react-app) with [Typescript support](https://www.typescriptlang.org/): A popular front-end framework for building web applications 
* [Reach Language](https://docs.reach.sh/): A compiled language for building multi-chain smart contracts. This template includes **the JS dependency**, and [not the CLI](#installing-the-reach-cli).
* [Cryptocurrency Icons](https://github.com/spothq/cryptocurrency-icons) as well as a single-file API (and ReactJS component) for using them
* [Google's Material Icons](https://fonts.google.com/icons) for quick UI sugar
* SASS (no pre-defined style libraries: you can `npm install` any additional dependencies.)
* Typescript
* [🦆 raphsducks](https://github.com/JACK-COM/raphsducks): an unopinonated state manager.
* [🦆 reachduck](https://github.com/JACK-COM/reachduck): a simple API for interacting with the blockchain and/or a reach `stdlib` instance

---
## How do I use it?

1. Clone the project
2. `cd path/to/my-project`
3. `rm -rf .git && git init` (create a fresh git repository for your project)
4. `npm install` 
5. `npm run start` (launches at `localhost:3000`) 

Take a look at [Available Scripts](#available-scripts) for additional CLI commands.

### Reach Helpers
This project includes some helpful bits, including 
* A self-contained [state instance](https://github.com/JACK-COM/raphsducks). You can subscribe to it like any other state.
* A `connect` button that will automatically trigger a wallet connection.\
    Default network is Algorand, but if your `stdlib` instance is using `ETH`, it will trigger MetaMask.
* A stub `Reach` application to get you started on your multichain smart contracts. I personally use the directory to store my compiled contracts. 
* A [light API](https://www.npmjs.com/package/@jackcom/reachduck#methods) for interacting with your `@reach/stdlib` instance.


---
## Additional Notes
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It does not use any `react-script` or `webpack` configuration overrides. 

### Reach CLI
**Note:** If you don't have the `reach` compiler installed, run this in your project directory to download it (and make the downloaded item executable)
```
  $ curl https://docs.reach.sh/reach -o reach ; chmod +x reach
```

Learn more [here](https://docs.reach.sh/index.html).

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode at [http://localhost:3000](http://localhost:3000).


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). Some other helpful topics:

* [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
* [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
* [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
* [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
* [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
* [`npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
