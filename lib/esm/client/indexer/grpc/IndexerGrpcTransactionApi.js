"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcTransactionApi = void 0;
const utils_1 = require("@injectivelabs/utils");
const transaction_1 = require("../../../utils/transaction");
const types_1 = require("../types");
const exceptions_1 = require("@injectivelabs/exceptions");
const BaseIndexerGrpcWebConsumer_1 = require("../../base/BaseIndexerGrpcWebConsumer");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcTransactionApi {
    module = types_1.IndexerModule.Transaction;
    client;
    constructor(endpoint) {
        this.client = new indexer_proto_ts_1.InjectiveExchangeRpc.InjectiveExchangeRPCClientImpl((0, BaseIndexerGrpcWebConsumer_1.getGrpcIndexerWebImpl)(endpoint));
    }
    async prepareTxRequest({ address, chainId, message, memo, estimateGas = true, gasLimit = utils_1.DEFAULT_GAS_LIMIT, feeDenom = utils_1.DEFAULT_BRIDGE_FEE_DENOM, feePrice = utils_1.DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, }) {
        const txFeeAmount = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        txFeeAmount.denom = feeDenom;
        txFeeAmount.amount = feePrice;
        const cosmosTxFee = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosTxFee.create();
        cosmosTxFee.price = [txFeeAmount];
        if (!estimateGas) {
            cosmosTxFee.gas = gasLimit.toString();
        }
        const prepareTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.PrepareTxRequest.create();
        prepareTxRequest.chainId = chainId.toString();
        prepareTxRequest.signerAddress = address;
        prepareTxRequest.fee = cosmosTxFee;
        const arrayOfMessages = Array.isArray(message) ? message : [message];
        const messagesList = arrayOfMessages.map((message) => Buffer.from(JSON.stringify(message), 'utf8'));
        prepareTxRequest.msgs = messagesList;
        if (timeoutHeight !== undefined) {
            prepareTxRequest.timeoutHeight = timeoutHeight.toString();
        }
        if (memo) {
            prepareTxRequest.memo = typeof memo === 'number' ? memo.toString() : memo;
        }
        try {
            const response = await this.client.PrepareTx(prepareTxRequest);
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                throw new exceptions_1.TransactionException(new Error(e.toString()), {
                    code: e.code,
                    context: 'PrepareTx',
                    contextModule: 'Web3Gateway',
                    type: e.type,
                });
            }
            throw new exceptions_1.TransactionException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'PrepareTx',
                contextModule: 'Web3Gateway',
            });
        }
    }
    async prepareCosmosTxRequest({ memo, address, message, estimateGas = true, gasLimit = utils_1.DEFAULT_GAS_LIMIT, feeDenom = utils_1.DEFAULT_BRIDGE_FEE_DENOM, feePrice = utils_1.DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, }) {
        const txFeeAmount = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        txFeeAmount.denom = feeDenom;
        txFeeAmount.amount = feePrice;
        const cosmosTxFee = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosTxFee.create();
        cosmosTxFee.price = [txFeeAmount];
        if (!estimateGas) {
            cosmosTxFee.gas = gasLimit.toString();
        }
        const prepareTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.PrepareCosmosTxRequest.create();
        prepareTxRequest.fee = cosmosTxFee;
        prepareTxRequest.senderAddress = address;
        const arrayOfMessages = Array.isArray(message) ? message : [message];
        const messagesList = arrayOfMessages.map((message) => Buffer.from(JSON.stringify(message), 'utf8'));
        prepareTxRequest.msgs = messagesList;
        if (timeoutHeight !== undefined) {
            prepareTxRequest.timeoutHeight = timeoutHeight.toString();
        }
        if (memo) {
            prepareTxRequest.memo = typeof memo === 'number' ? memo.toString() : memo;
        }
        try {
            const response = await this.client.PrepareCosmosTx(prepareTxRequest);
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                throw new exceptions_1.TransactionException(new Error(e.toString()), {
                    code: e.code,
                    type: e.type,
                    context: 'CosmosPrepareTx',
                    contextModule: 'Web3Gateway',
                });
            }
            throw new exceptions_1.TransactionException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'CosmosPrepareTx',
                contextModule: 'Web3Gateway',
            });
        }
    }
    async prepareExchangeTxRequest({ address, chainId, message, memo, estimateGas = true, gasLimit = utils_1.DEFAULT_EXCHANGE_LIMIT, feeDenom = utils_1.DEFAULT_BRIDGE_FEE_DENOM, feePrice = utils_1.DEFAULT_BRIDGE_FEE_PRICE, timeoutHeight, delegatedFee, }) {
        const txFeeAmount = core_proto_ts_1.CosmosBaseV1Beta1Coin.Coin.create();
        txFeeAmount.denom = feeDenom;
        txFeeAmount.amount = feePrice;
        const cosmosTxFee = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosTxFee.create();
        cosmosTxFee.price = [txFeeAmount];
        if (delegatedFee !== undefined) {
            cosmosTxFee.delegateFee = delegatedFee;
        }
        if (!estimateGas) {
            cosmosTxFee.gas = gasLimit.toString();
        }
        const prepareTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.PrepareTxRequest.create();
        prepareTxRequest.chainId = chainId.toString();
        prepareTxRequest.signerAddress = address;
        prepareTxRequest.fee = cosmosTxFee;
        const arrayOfMessages = Array.isArray(message) ? message : [message];
        const messagesList = arrayOfMessages.map((message) => Buffer.from(JSON.stringify(message), 'utf8'));
        prepareTxRequest.msgs = messagesList;
        if (timeoutHeight !== undefined) {
            prepareTxRequest.timeoutHeight = timeoutHeight.toString();
        }
        if (memo) {
            prepareTxRequest.memo = typeof memo === 'number' ? memo.toString() : memo;
        }
        try {
            const response = await this.client.PrepareTx(prepareTxRequest);
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                throw new exceptions_1.TransactionException(new Error(e.toString()), {
                    code: e.code,
                    type: e.type,
                    context: 'PrepareTx',
                    contextModule: 'Web3Gateway',
                });
            }
            throw new exceptions_1.TransactionException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'PrepareTx',
                contextModule: 'Web3Gateway',
            });
        }
    }
    /**
     * Keep in mind that the transaction is just added
     * to the mempool, we need to query the transaction hash
     * if we want to ensure that the transaction is included
     * in the block
     */
    async broadcastTxRequest({ signature, chainId, message, txResponse, }) {
        const parsedTypedData = JSON.parse(txResponse.data);
        const publicKeyHex = (0, transaction_1.recoverTypedSignaturePubKey)(parsedTypedData, signature);
        const cosmosPubKey = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosPubKey.create();
        cosmosPubKey.type = txResponse.pubKeyType;
        cosmosPubKey.key = publicKeyHex;
        parsedTypedData.message.msgs = null;
        const broadcastTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.BroadcastTxRequest.create();
        broadcastTxRequest.mode = 'sync';
        broadcastTxRequest.chainId = chainId.toString();
        broadcastTxRequest.pubKey = cosmosPubKey;
        broadcastTxRequest.signature = signature;
        broadcastTxRequest.tx = Buffer.from(JSON.stringify(parsedTypedData.message), 'utf8');
        broadcastTxRequest.feePayer = txResponse.feePayer;
        broadcastTxRequest.feePayerSig = txResponse.feePayerSig;
        const arrayOfMessages = Array.isArray(message) ? message : [message];
        const messagesList = arrayOfMessages.map((message) => Buffer.from(JSON.stringify(message), 'utf8'));
        broadcastTxRequest.msgs = messagesList;
        try {
            const response = await this.client.BroadcastTx(broadcastTxRequest);
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                throw new exceptions_1.TransactionException(new Error(e.toString()), {
                    code: e.code,
                    type: e.type,
                    context: 'BroadcastTx',
                    contextModule: 'Web3Gateway',
                });
            }
            throw new exceptions_1.TransactionException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'BroadcastTx',
                contextModule: 'Web3Gateway',
            });
        }
    }
    /**
     * Keep in mind that the transaction is just added
     * to the mempool, we need to query the transaction hash
     * if we want to ensure that the transaction is included
     * in the block
     */
    async broadcastCosmosTxRequest({ address, signature, txRaw, pubKey, }) {
        const pubKeyInHex = Buffer.from(pubKey.value, 'base64').toString('hex');
        const signatureInHex = Buffer.from(signature, 'base64').toString('hex');
        const cosmosPubKey = indexer_proto_ts_1.InjectiveExchangeRpc.CosmosPubKey.create();
        cosmosPubKey.type = pubKey.type;
        cosmosPubKey.key = `0x${pubKeyInHex}`;
        txRaw.signatures = [];
        const broadcastTxRequest = indexer_proto_ts_1.InjectiveExchangeRpc.BroadcastCosmosTxRequest.create();
        broadcastTxRequest.senderAddress = address;
        broadcastTxRequest.pubKey = cosmosPubKey;
        broadcastTxRequest.signature = `0x${signatureInHex}`;
        broadcastTxRequest.tx = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.encode(txRaw).finish();
        try {
            const response = await this.client.BroadcastCosmosTx(broadcastTxRequest);
            return response;
        }
        catch (e) {
            if (e instanceof exceptions_1.GrpcUnaryRequestException) {
                throw new exceptions_1.TransactionException(e.toOriginalError(), {
                    code: e.code,
                    type: e.type,
                    context: 'BroadcastTx',
                    contextModule: 'Web3Gateway',
                });
            }
            throw new exceptions_1.TransactionException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'BroadcastTx',
                contextModule: 'Web3Gateway',
            });
        }
    }
    async fetchFeePayer() {
        const request = indexer_proto_ts_1.InjectiveExchangeRpc.GetFeePayerRequest.create();
        try {
            const response = await this.client.GetFeePayer(request);
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveExchangeRpc.GrpcWebError) {
                throw new exceptions_1.TransactionException(new Error(e.toString()), {
                    code: e.code,
                    type: e.type,
                    context: 'FeePayer',
                    contextModule: 'Web3Gateway',
                });
            }
            throw new exceptions_1.TransactionException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'FeePayer',
                contextModule: 'Web3Gateway',
            });
        }
    }
}
exports.IndexerGrpcTransactionApi = IndexerGrpcTransactionApi;
//# sourceMappingURL=IndexerGrpcTransactionApi.js.map