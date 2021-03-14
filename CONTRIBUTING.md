## Prerequisites

You need to have the latest versions of [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/) installed before you do anything given below.

## Coding guidelines

You should ensure that your code meets the coding guidelines listed below

- **Spacing**: <br>
  Use two spaces for indentation. No tabs.
- **Quotes**: <br>
  Single-quoted strings are preferred to double-quoted strings; however,
  please use a double-quoted string if the value contains a single-quote
  character to avoid unnecessary escaping.
- **Variable declaration**: <br/>
  Don't use `var`, use `let` and `const` to declare your variables.

Guidelines are enforced using [ESLint](https://www.npmjs.com/package/eslint):

```bash
$ npm run lint
```

## To contribute to this project

- First fork this repo on GitHub
- After that, clone the repo on your local machine
- Change your current directory to your cloned repo
- Install the necessary npm dependencies by running `npm install`
- Start the local dev server by running `npm start`
- Create a new branch that matches the change that you are doing
- Make your changes
- Test and lint your changes
- Commit your changes
- Create a pull request
