const axios = require('axios');
const assert = require('assert');
const fs = require('fs');
const chai = require('chai');

describe('DELETE method tests', () => {
    it('Delete users from the https://jsonplaceholder.typicode.com/users', async function () {
        let expectedResponse = JSON.parse(fs.readFileSync('./test/resources/delete_rs.json'));
        let deleteRequest = JSON.parse(fs.readFileSync('./test/resources/delete_rq.json'));
        await axios({
            method: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/users/1',
            data: deleteRequest
        })
            .then(function (response) {
                let expectedDataString = JSON.stringify(expectedResponse);
                let actualDataString = JSON.stringify(response.data);
                assert.equal(response.status, 200);
                assert.equal(response.statusText, 'OK');
                assert.equal(actualDataString, expectedDataString);
                chai.expect(response.data).to.contains(expectedResponse);
            })
            .catch((error) => Promise.reject(error));
    });
});
