This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [AWS Amplify](https://aws-amplify.github.io/docs/js/start?platform=react).

### Add New Project

- Edit projects.json file in top level Projects folder. Add name [MyProject], navigation [/myproject], and description.
- Create a new folder [MyProject] under Projects.
- Create index.js file, create a react component named [MyProject] (using rcc)
- Edit App.js file, import [MyPreoject] component created in above step.
- Register new route with [/myproject] path

## Resources

[AppSync Lambda Client](https://docs.aws.amazon.com/appsync/latest/devguide/building-a-client-app-node.html)
[Lambda Layer Blog - Dependencies](https://medium.com/@anjanava.biswas/nodejs-runtime-environment-with-aws-lambda-layers-f3914613e20e)

[How to programmtically Switch Routes](https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router)

[Challenges with lambda](https://blog.hellojs.org/3-common-challenges-using-javascript-node-js-in-aws-lambda-e3fc318401ba)

[Using Promises with AWS APIs](https://github.com/KaleFive/Categorize/blob/master/src/index.js)

## Notes

Amplify CLI doesn't automatically configure AWS_IAM authentication mode for graphql. The defualt auth mode is cognito user pool.C ongnito user pool restricts the graphql endpoint access through web apps only. To enable accessing graphql
endpoint from other services like lambda, we need to customize the authentication, and set the authRole on cognito identity pool the auth role should have permission to invoke required graphql api
http://sandny.com/2018/09/24/appsync-graphql-amplify-iam/

Amplify React Native auth.signout() does not return to Sign In page
https://github.com/aws-amplify/amplify-js/issues/1529

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
