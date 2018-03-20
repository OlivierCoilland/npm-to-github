'use strict';

const npmToGitHub = require('../index');
const assert = require('assert');

describe('npm-to-github', function() {
    it('should return the repository name', function(done) {
        npmToGitHub.getRepositoryName('npm-to-github')
            .then((name) => {
                assert.equal(name, 'OlivierCoilland/npm-to-github');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('should return the repository', function(done) {
        npmToGitHub.getRepository('npm-to-github')
            .then((repository) => {
                assert.equal(repository.id, 66943137);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('should fail with a fake repository', function(done) {
        npmToGitHub.getRepositoryName('fake-repository')
            .then((name) => {
                done(new Error('This repository should not exist!'));
            })
            .catch((error) => {
                done();
            });
    });
});
