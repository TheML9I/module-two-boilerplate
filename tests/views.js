import { assert } from 'chai'
import { renderAccount } from 'views'

describe('renderAccount', function() {
    const accountData = {
        nickname: 'fakename',
        account_id: 42
    };

    before(function() {
        document.body.innerHTML = `<table>${renderAccount(accountData)}</table>`
    });

    it('Should render account name and id', function() {
        const userNode = document.querySelector('.js-user');

        assert.equal(userNode.innerHTML.trim(), accountData.nickname);
        assert.equal(userNode.getAttribute('data-id'), accountData.account_id);
    });

    it('Should has appropriate style', function() {
        assert.isOk(document.querySelector('.search-results_item'));
    });
});