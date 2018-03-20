'use strict';

const LOG_LEVEL = 'warn';
const NPM_REGISTRY_ROOT = 'https://registry.npmjs.org/';
const GITHUB_REPOSITORY_RE = /github\.com\/(.*?)(\.git)?$/;

const log = require('npmlog');
log.level = LOG_LEVEL;
const RegClient = require('npm-registry-client');
const npmClient = new RegClient({
    log: log
});
const github = require('octonode');

let githubClient = github.client();

function getRepositoryName(pkg) {
    return new Promise((resolve, reject) => {
        npmClient.get(NPM_REGISTRY_ROOT + pkg, {}, (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            const repository = data.repository;
            if (!repository) {
                reject(new Error('No repository defined in package.json'));
                return;
            }

            const repositoryUrl = repository.url;
            if (!repositoryUrl) {
                reject(new Error('No repository URL present in package.json'));
                return;
            }

            const matches = repositoryUrl.match(GITHUB_REPOSITORY_RE);
            if (!matches) {
                reject(new Error('No GitHub repository found in ' + repositoryUrl));
                return;
            }

            const githubRepository = matches[1];
            resolve(githubRepository);
        });
    });
}

function getRepository(pkg) {
    return new Promise((resolve, reject) => {
        getRepositoryName(pkg)
            .then((name) => {
                githubClient.repo(name).info((error, data) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(data);
                });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function setToken(token) {
    githubClient = github.client(token);
}

module.exports.getRepositoryName = getRepositoryName;
module.exports.getRepository = getRepository;
module.exports.setToken = setToken;
