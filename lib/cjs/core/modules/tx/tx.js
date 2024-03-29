"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTxRawFromTxRawOrDirectSignResponse = exports.createTransactionAndCosmosSignDocForAddressAndMsg = exports.createTransactionAndCosmosSignDoc = exports.createTransactionForAddressAndMsg = exports.createTxRawFromSigResponse = exports.createTransactionFromMsg = exports.createTransaction = exports.createTransactionWithSigners = void 0;
const keccak256_1 = __importDefault(require("keccak256"));
const utils_1 = require("@injectivelabs/utils");
const utils_2 = require("./utils");
const utils_3 = require("@injectivelabs/utils");
const exceptions_1 = require("@injectivelabs/exceptions");
const utils_4 = require("@injectivelabs/utils");
const client_1 = require("../../../client");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const accounts_1 = require("../../accounts");
const fee_1 = require("./utils/fee");
/**
 * @typedef {Object} CreateTransactionWithSignersArgs
 * @param {CreateTransactionWithSignersArgs} params
 * @property {Msg | Msg[]} message - the Cosmos messages to wrap them in a transaction
 * @property {string} memo - the memo to attach to the transaction
 * @property {StdFee} fee - the fee to attach to the transaction
 * @property {SignerDetails} signers - the signers of the transaction
 * @property {number} number - the account number to attach to the transaction
 * @property {number} chainId - the chain-id to attach to the transaction
 * @property {string} pubKey - the account pubKey to attach to the transaction (in base64)
 *
 * @typedef {Object} CreateTransactionResult
 * @property {TxRaw} txRaw  - the Tx raw that was created
 * @property {SignDoc} signDoc  - the SignDoc that was created - used for signing of the transaction
 * @property {SignerDetails} signers  - the signers of the transaction
 * @property {Uint8Array} bodyBytes  - the body bytes of the transaction
 * @property {Uint8Array} authInfoBytes  - the auth info bytes of the transaction
 * @property {Uint8Array} signBytes  - the sign bytes of the transaction (SignDoc serialized to binary)
 * @property {Uint8Array} signHashedBytes  - the sign bytes of the transaction (SignDoc serialized to binary) and hashed using keccak256
 * @returns {CreateTransactionResult} result
 */
const createTransactionWithSigners = ({ signers, chainId, message, timeoutHeight, memo = "", fee = utils_1.DEFAULT_STD_FEE, signMode = utils_2.SIGN_DIRECT, }) => {
    const actualSigners = Array.isArray(signers) ? signers : [signers];
    const [signer] = actualSigners;
    const body = (0, utils_2.createBody)({ message, memo, timeoutHeight });
    const actualFee = typeof fee === "string" ? (0, fee_1.getStdFeeFromString)(fee) : fee;
    const feeMessage = (0, utils_2.createFee)({
        fee: actualFee.amount[0],
        // payer: actualFee?.payer,
        // granter: actualFee.granter,
        gasLimit: parseInt(actualFee.gas, 10),
    });
    const signInfo = (0, utils_2.createSigners)({
        chainId,
        mode: signMode,
        signers: actualSigners,
    });
    const authInfo = (0, utils_2.createAuthInfo)({
        signerInfo: signInfo,
        fee: feeMessage,
    });
    const bodyBytes = core_proto_ts_1.CosmosTxV1Beta1Tx.TxBody.encode(body).finish();
    const authInfoBytes = core_proto_ts_1.CosmosTxV1Beta1Tx.AuthInfo.encode(authInfo).finish();
    const signDoc = (0, utils_2.createSignDoc)({
        chainId,
        bodyBytes: bodyBytes,
        authInfoBytes: authInfoBytes,
        accountNumber: signer.accountNumber,
    });
    const signDocBytes = core_proto_ts_1.CosmosTxV1Beta1Tx.SignDoc.encode(signDoc).finish();
    const toSignBytes = Buffer.from(signDocBytes);
    const toSignHash = (0, keccak256_1.default)(Buffer.from(signDocBytes));
    const txRaw = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.create();
    txRaw.authInfoBytes = authInfoBytes;
    txRaw.bodyBytes = bodyBytes;
    return {
        txRaw,
        signDoc,
        signers,
        signer,
        signBytes: toSignBytes,
        signHashedBytes: toSignHash,
        bodyBytes: bodyBytes,
        authInfoBytes: authInfoBytes,
    };
};
exports.createTransactionWithSigners = createTransactionWithSigners;
/**
 * @typedef {Object} CreateTransactionArgs
 * @param {CreateTransactionArgs} params
 * @property {MsgArg | MsgArg[]} message - the Cosmos messages to wrap them in a transaction
 * @property {string} memo - the memo to attach to the transaction
 * @property {StdFee} fee - the fee to attach to the transaction
 * @property {string} sequence - the account sequence to attach to the transaction
 * @property {number} number - the account number to attach to the transaction
 * @property {number} chainId - the chain-id to attach to the transaction
 * @property {string} pubKey - the account pubKey to attach to the transaction (in base64)
 *
 * @typedef {Object} CreateTransactionResult
 * @property {TxRaw} txRaw  // the Tx raw that was created
 * @property {SignDoc} signDoc  // the SignDoc that was created - used for signing of the transaction
 * @property {number} accountNumber  // the account number of the signer of the transaction
 * @property {Uint8Array} bodyBytes  // the body bytes of the transaction
 * @property {Uint8Array} authInfoBytes  // the auth info bytes of the transaction
 * @property {Uint8Array} signBytes  // the sign bytes of the transaction (SignDoc serialized to binary)
 * @property {Uint8Array} signHashedBytes  // the sign bytes of the transaction (SignDoc serialized to binary) and hashed using keccak256
 * @returns {CreateTransactionResult} result
 */
const createTransaction = (args) => {
    return (0, exports.createTransactionWithSigners)({
        ...args,
        signers: {
            pubKey: args.pubKey,
            accountNumber: args.accountNumber,
            sequence: args.sequence,
        },
    });
};
exports.createTransaction = createTransaction;
/**
 * Used when we want to pass a Msg class instead of the {type, message}
 * object of the Message (using the toDirectSign() method)
 * @returns
 */
const createTransactionFromMsg = (params) => {
    const messages = Array.isArray(params.message)
        ? params.message
        : [params.message];
    return (0, exports.createTransaction)({
        ...params,
        message: messages,
    });
};
exports.createTransactionFromMsg = createTransactionFromMsg;
/**
 * Used when we get a DirectSignResponse from
 * Cosmos native wallets like Keplr, Leap, etc after
 * the TxRaw has been signed.
 *
 * The reason why we need to create a new TxRaw and
 * not use the one that we passed to signing is that the users
 * can change the gas fees and that will alter the original
 * TxRaw which will cause signature miss match if we broadcast
 * that transaction on chain
 * @returns TxRaw
 */
const createTxRawFromSigResponse = (response) => {
    if (response.signed === undefined) {
        return response;
    }
    const directSignResponse = response;
    const txRaw = core_proto_ts_1.CosmosTxV1Beta1Tx.TxRaw.create();
    txRaw.authInfoBytes = directSignResponse.signed.authInfoBytes;
    txRaw.bodyBytes = directSignResponse.signed.bodyBytes;
    txRaw.signatures = [
        Buffer.from(directSignResponse.signature.signature, "base64"),
    ];
    return txRaw;
};
exports.createTxRawFromSigResponse = createTxRawFromSigResponse;
/**
 * Used when we don't have account details and block details
 * and we pass the message and the user's address only
 * @returns
 */
const createTransactionForAddressAndMsg = async (params) => {
    const messages = Array.isArray(params.message)
        ? params.message
        : [params.message];
    // Clients
    const chainRestAuthApi = new client_1.ChainRestAuthApi(params.endpoint);
    const tendermintRestApi = new client_1.ChainRestTendermintApi(params.endpoint);
    /** Account Details * */
    const accountDetails = await chainRestAuthApi.fetchCosmosAccount(params.address);
    const baseAccount = accounts_1.BaseAccount.fromRestCosmosApi(accountDetails);
    /** Block Details */
    const latestBlock = await tendermintRestApi.fetchLatestBlock();
    const latestHeight = latestBlock.header.height;
    const timeoutHeight = new utils_3.BigNumberInBase(latestHeight).plus(utils_4.DEFAULT_BLOCK_TIMEOUT_HEIGHT);
    const pubKey = params.pubKey || baseAccount.pubKey.key;
    if (!pubKey) {
        throw new exceptions_1.GeneralException(new Error(`The pubKey for ${params.address} is missing.`));
    }
    return (0, exports.createTransaction)({
        ...params,
        pubKey: params.pubKey || Buffer.from(baseAccount.pubKey.key).toString("base64"),
        sequence: Number(baseAccount.sequence),
        accountNumber: Number(baseAccount.accountNumber),
        timeoutHeight: timeoutHeight.toNumber(),
        message: messages,
    });
};
exports.createTransactionForAddressAndMsg = createTransactionForAddressAndMsg;
const createTransactionAndCosmosSignDoc = (args) => {
    const result = (0, exports.createTransaction)(args);
    const [signer] = Array.isArray(result.signers)
        ? result.signers
        : [result.signers];
    return {
        ...result,
        cosmosSignDoc: core_proto_ts_1.CosmosTxV1Beta1Tx.SignDoc.fromPartial({
            bodyBytes: result.bodyBytes,
            authInfoBytes: result.authInfoBytes,
            accountNumber: signer.accountNumber.toString(),
            chainId: args.chainId,
        }),
    };
};
exports.createTransactionAndCosmosSignDoc = createTransactionAndCosmosSignDoc;
const createTransactionAndCosmosSignDocForAddressAndMsg = async (params) => {
    const result = await (0, exports.createTransactionForAddressAndMsg)(params);
    const [signer] = Array.isArray(result.signers)
        ? result.signers
        : [result.signers];
    return {
        ...result,
        cosmosSignDoc: core_proto_ts_1.CosmosTxV1Beta1Tx.SignDoc.fromPartial({
            bodyBytes: result.bodyBytes,
            authInfoBytes: result.authInfoBytes,
            accountNumber: signer.accountNumber.toString(),
            chainId: params.chainId,
        }),
    };
};
exports.createTransactionAndCosmosSignDocForAddressAndMsg = createTransactionAndCosmosSignDocForAddressAndMsg;
const getTxRawFromTxRawOrDirectSignResponse = (txRawOrDirectSignResponse) => {
    return txRawOrDirectSignResponse.signed === undefined
        ? txRawOrDirectSignResponse
        : (0, exports.createTxRawFromSigResponse)(txRawOrDirectSignResponse);
};
exports.getTxRawFromTxRawOrDirectSignResponse = getTxRawFromTxRawOrDirectSignResponse;
//# sourceMappingURL=tx.js.map