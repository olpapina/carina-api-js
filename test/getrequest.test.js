const axios = require('axios');
const assert = require('assert');
const fs = require('fs');
const chai = require('chai');
chai.use(require('chai-json-schema'));
describe('GET method tests', () => {
        let resultQuantity = 10;
        let rawdata = fs.readFileSync('./test/resources/get_rs.json');
        let expectedData = JSON.parse(rawdata);
        let expectedSchema = JSON.parse(fs.readFileSync('./test/resources/get_rs.schema'));
        it('Return 10 users from https://jsonplaceholder.typicode.com/', async function () {
                await axios({
                        method: 'GET',
                        url: 'https://jsonplaceholder.typicode.com/users',
                        params: {
                                _limit: resultQuantity
                        }
                })
                        .then(function (response) {
                                let expectedDataString = JSON.stringify(expectedData);
                                let actualDataString = JSON.stringify(response.data);
                                assert.equal(response.status, 200);
                                assert.equal(response.statusText, 'OK');
                                assert.equal(actualDataString, expectedDataString);
                                chai.expect(response.data).to.be.jsonSchema(expectedSchema);
                        })
                        .catch((error) => Promise.reject(error));
        });
});
