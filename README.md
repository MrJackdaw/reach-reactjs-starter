# React + Reach Application Scaffold

## What is it? 

Inspired by [@zetsuboii's starter pack](https://github.com/Zetsuboii/reach-react-starter). This is a quick scaffold/template for building a `ReactJS` and `Reach Lang` DApp. The development env and build process are handled by **webpack**.\
If you need to add or modify Webpack config overrides, consider using [@craco](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation)

## What does it contain? 

* [ReactJS](https://github.com/facebook/create-react-app) with [Typescript support](https://www.typescriptlang.org/): A popular front-end framework for building web applications 
* [Reach Language](https://docs.reach.sh/): A compiled language for building multi-chain smart contracts. This template includes **the JS dependency**, and [not the CLI](#installing-the-reach-cli).
* [RaphsDucks](https://github.com/JACK-COM/raphsducks): a simplified, unopinonated application state manager.
* [Google's Material Icons](https://fonts.google.com/icons) for quick UI sugar

Like the ReactJS version, this includes support for SASS. There are no pre-defined styles: you can `npm install` any additional dependencies.


## How do I use it?

1. Clone the project
2. `cd path/to/my-project`
3. `npm install` 
4. `npm run start` (launches at `localhost:3000`) 

Take a look at [Available Scripts](#available-scripts) for additional CLI commands.

### Installing the Reach CLI

The scaffold doesn't include the `reach-sh` cli, so (if you don't already have that globally) you will need to install that. If you are using a linux based system, I recommend you `cd` into a directory in your `$PATH` variable (e.g. `/usr/local/bin/`) and follow Reach-sh's instructions to install the CLI there. This should allow you to run 

```
$: reach < command >
```

from any terminal instance, although you will have to go back in there to update it. 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

HMR (Hot module reload) is enabled; aside from **@craco**, the development UX is identical to any **create-react-app**-bootstrapped application. 

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
