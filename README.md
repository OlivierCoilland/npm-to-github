# npm-to-github

Get the GitHub repository from a npm package.

## Installation

```bash
$ npm install npm-to-github --save
```

## Usage

```js
const npmToGitHub = require('npm-to-github');
```

### Get repository name

```js
npmToGitHub.getRepositoryName('npm-to-github')
.then((name) => {
    console.log(name);
})
.catch((error) => {
    console.log(error);
});
```

### Get repository data

```js
npmToGitHub.getRepository('npm-to-github')
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.log(error);
});
```

## Incompatible API changes! (f34r)

In `1.x.x` errors where not really errors, only a message.
In `2.x.x` errors are full `Error` objects.

## License

Released under the [MIT license](https://tldrlegal.com/license/mit-license).
