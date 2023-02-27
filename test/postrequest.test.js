const axios = require('axios');
const assert = require('assert');
const fs = require('fs');
const chai = require('chai');
chai.use(require('chai-json-schema'));

describe('POST method tests', () => {
    let expectedNewId = 11;
    let postRequest = JSON.parse(fs.readFileSync('./test/resources/post_rq.json'));
    let expectedResponse = JSON.parse(fs.readFileSync('./test/resources/post_rs.json'));
    let expectedSchema = JSON.parse(fs.readFileSync('./test/resources/post_rs.schema'));

    it('Create new user on the https://jsonplaceholder.typicode.com/users', async function () {
        await axios({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/users',
            data: postRequest
        })
            .then(function (response) {
                let expectedDataString = JSON.stringify(expectedResponse);
                let actualDataString = JSON.stringify(response.data);
                assert.equal(response.status, 201);
                assert.equal(response.statusText, 'Created');
                assert.deepEqual(response.data.id, expectedNewId);
                assert.equal(actualDataString, expectedDataString);
                chai.expect(response.data).to.be.jsonSchema(expectedSchema);
            })
            .catch((error) => Promise.reject(error));
    });
    it('Create new user with mising name and username', async function () {
        delete postRequest.name;
        delete postRequest.username;
        await axios({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/users',
            data: postRequest
        })
            .then(function (response) {
                assert.equal(response.status, 201);
                assert.equal(response.statusText, 'Created');
                assert.deepEqual(response.data.id, expectedNewId);
                chai.expect(response.data).to.be.jsonSchema(expectedSchema);
                chai.expect(response.data).to.not.have.property("name");
                chai.expect(response.data).to.not.have.property("username");
            })
            .catch((error) => Promise.reject(error));
    });
});
