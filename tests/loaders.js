import { assert } from 'chai'
import sinon from 'sinon'
import { loadUsers } from 'loaders'

describe('loadUsers', function() {
    const dataStub = {fakekey: 'fakevalue'};

    beforeEach(function() {
        sinon.stub(window, 'fetch');
        window.fetch.returns(Promise.resolve({
            json() {
                return {status: 'ok', data: dataStub}
            }
        }));
    });

    afterEach(function() {
        window.fetch.restore();
    });

    it('Should call fetch with url', function() {
        loadUsers('fakename').then(function(resp) {
            assert.equal(resp, dataStub);
        })
        assert.equal(
            window.fetch.firstCall.args[0],
            'http://188.166.73.133/wg-api/wot/account/list/?search=fakename')
    });
});
