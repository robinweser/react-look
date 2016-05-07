# Contributing
Want to get involved into Look's development? **Awesome!**<br>
Please read the following guide on how to contribute, create issues and send pull requests.

If you have a feature request please create an issue. Also if you're even improving Look by any kind please don't be shy and send a pull request to let everyone benefit.

## Project setup
First of all you need to fork the project and clone it locally.
Afterwards you just need to install all the dependencies.
```sh
git clone --bare https://github.com/rofrischmann/react-look.git
cd react-look
npm install
```

## Commands
To ensure code quality we've build some simple commands to run tests and code linting.
### `npm test`
Will run all tests using [mocha](https://mochajs.org). It also automatically generates coverage information which can be visually seen at `/coverage/lcov-report/index.html` afterwards.
<br><br>
<img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/res/native-badge.png" height=15> Tests for React Native are done with a simple React Native mock and only contains functionality we used until now. If you need any additional functionality, check `/test/mocks/react-native.js` to add it.
<br>
### `npm run lint`
Uses [eslint](http://eslint.org/docs/user-guide/command-line-interface) to do code linting. We also use [eslint-config-rackt](https://www.npmjs.com/package/eslint-config-rackt) which provides an universal set of predefined React rules.

## Code Formatting
We use [esformatter](https://github.com/millermedeiros/esformatter) which supports tons of configuration options for almost every single use case. If you're using [Atom](https://atom.io) we recommend [atom-esformatter](https://github.com/sindresorhus/atom-esformatter) with the **Format on Save** option enabled. As far as I know there also are plugins for several other editors. *Alternatively try the [esformatter CLI](https://github.com/millermedeiros/esformatter#cli)*.

## Guide-Lines
1. Fork the repo and create your feature/bug branch from `develop`.
2. If you've added code that should be tested, add tests!
3. If you've changed APIs, update the documentation.
4. Ensure that all tests pass (`npm test`).
5. Ensure your code does not produce linting errors (`npm run lint`)
6. Ensure your code is formatted correctly (esformatter)

## Creating Issues
### Known Issues
Before creating an issue please make sure it has not aleady been created/solved before.
Browse both open **and** closed issues. If you feel something is unclear you might also add it to the docs or FAQ's directly.

### Bugs & Feature Requests
If you found a new bug or got a feature request feel free to file a new issue. For both we got predefined templates which you should fill out as detailed as possible.

## Sending Pull Requests
If you are creating a pull request, try to use commit messages that are self-explanatory. Be sure to meet all guide-lines from above. If you're pushing a Work in Progress, please flag it and optionally add a description if something needs to be discussed.

#### Failing Travis CI build
If you encounter a failing Travis CI build do not get worried. As long as your tests passed before sending the PR this is most likely an issue with CodeClimate which somehow is only able to run successfully if I myself do commits.<br>
If this is the only error your PR is fine and open to be merged.
