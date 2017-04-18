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

## GitHub API rate limit

GitHub API is limited to 60 requests, after which you get an error:

`API rate limit exceeded for a.b.c.d. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)`

A work around is to authenticate. npm-to-github supports [token based authentication](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). The token doesn't need any scope or permission.

```js
const npmToGitHub = require('npm-to-github');
npmToGitHub.setToken('d5ea195..........................4bde396');
```

## Incompatible API changes! (f34r)

In *1.x* errors where not really errors, only a message.
In *2.x* errors are full `Error` objects.

## License

Released under the [MIT license](https://tldrlegal.com/license/mit-license).
