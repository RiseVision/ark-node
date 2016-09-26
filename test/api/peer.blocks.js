'use strict'; /*jslint mocha:true, expr:true */

var node = require('./../node.js');

var genesisblock = require('../../genesisBlock.json');

describe('GET /peer/blocks', function () {

	it('using correct nethash in headers should be ok', function (done) {
		node.get('/peer/blocks')
			.end(function (err, res) {
				// node.debug('> Response:'.grey, JSON.stringify(res.body));
				node.expect(res.body).to.have.property('blocks').that.is.an('array');
				res.body.blocks.forEach(function (block) {
					node.expect(block).to.have.property('b_id').that.is.a('string');
					node.expect(block).to.have.property('b_version').that.is.a('number');
					node.expect(block).to.have.property('b_timestamp').that.is.a('number');
					node.expect(block).to.have.property('b_height').that.is.a('number');
					node.expect(block).to.have.property('b_previousBlock');
					node.expect(block).to.have.property('b_numberOfTransactions').that.is.a('number');
					node.expect(block).to.have.property('b_totalAmount').that.is.a('string');
					node.expect(block).to.have.property('b_totalFee').that.is.a('string');
					node.expect(block).to.have.property('b_reward').that.is.a('string');
					node.expect(block).to.have.property('b_payloadLength').that.is.a('number');
					node.expect(block).to.have.property('b_payloadHash').that.is.a('string');
					node.expect(block).to.have.property('b_generatorPublicKey').that.is.a('string');
					node.expect(block).to.have.property('b_blockSignature').that.is.a('string');
					node.expect(block).to.have.property('t_id');
					node.expect(block).to.have.property('t_rowId');
					node.expect(block).to.have.property('t_type');
					node.expect(block).to.have.property('t_timestamp');
					node.expect(block).to.have.property('t_senderPublicKey');
					node.expect(block).to.have.property('t_senderId');
					node.expect(block).to.have.property('t_recipientId');
					node.expect(block).to.have.property('t_amount');
					node.expect(block).to.have.property('t_fee');
					node.expect(block).to.have.property('t_signature');
					node.expect(block).to.have.property('t_signSignature');
					node.expect(block).to.have.property('s_publicKey');
					node.expect(block).to.have.property('d_username');
					node.expect(block).to.have.property('v_votes');
					node.expect(block).to.have.property('m_min');
					node.expect(block).to.have.property('m_lifetime');
					node.expect(block).to.have.property('m_keysgroup');
					node.expect(block).to.have.property('dapp_name');
					node.expect(block).to.have.property('dapp_description');
					node.expect(block).to.have.property('dapp_tags');
					node.expect(block).to.have.property('dapp_type');
					node.expect(block).to.have.property('dapp_link');
					node.expect(block).to.have.property('dapp_category');
					node.expect(block).to.have.property('dapp_icon');
					node.expect(block).to.have.property('in_dappId');
					node.expect(block).to.have.property('ot_dappId');
					node.expect(block).to.have.property('ot_outTransactionId');
					node.expect(block).to.have.property('t_requesterPublicKey');
					node.expect(block).to.have.property('t_signatures');
				});
				done();
		});
	});
});

describe('POST /peer/blocks', function () {

	it('using incorrect nethash in headers should fail', function (done) {
		node.post('/peer/blocks', { dummy: 'dummy' })
			.set('nethash', 'incorrect')
			.end(function (err, res) {
				// node.debug('> Response:'.grey, JSON.stringify(res.body));
				node.expect(res.body).to.have.property('success').to.be.not.ok;
				node.expect(res.body.expected).to.equal(node.config.nethash);
				done();
			});
	});
});