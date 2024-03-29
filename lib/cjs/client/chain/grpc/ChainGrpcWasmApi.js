"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainGrpcWasmApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const core_proto_ts_1 = require("@injectivelabs/core-proto-ts");
const BaseGrpcConsumer_1 = __importDefault(require("../../base/BaseGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
const pagination_1 = require("../../../utils/pagination");
const utf8_1 = require("../../../utils/utf8");
/**
 * @category Chain Grpc API
 */
class ChainGrpcWasmApi extends BaseGrpcConsumer_1.default {
    module = types_1.ChainModule.Wasm;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new core_proto_ts_1.CosmwasmWasmV1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchContractAccountsBalance({ contractAddress, pagination, }) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryAllContractStateRequest.create();
        request.address = contractAddress;
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.AllContractState(request));
            return transformers_1.ChainGrpcWasmTransformer.allContractStateResponseToContractAccountsBalanceWithPagination(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'AllContractState',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'AllContractState',
                contextModule: this.module,
            });
        }
    }
    async fetchContractState({ contractAddress, pagination, }) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryAllContractStateRequest.create();
        request.address = contractAddress;
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.AllContractState(request));
            return transformers_1.ChainGrpcWasmTransformer.allContractStateResponseToContractState(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'AllContractState',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'AllContractState',
                contextModule: this.module,
            });
        }
    }
    async fetchContractInfo(contractAddress) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryContractInfoRequest.create();
        request.address = contractAddress;
        try {
            const response = await this.retry(() => this.client.ContractInfo(request));
            const contractInfo = response.contractInfo;
            if (!contractInfo) {
                return;
            }
            return transformers_1.ChainGrpcWasmTransformer.contactInfoResponseToContractInfo(contractInfo);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'ContractInfo',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'ContractInfo',
                contextModule: this.module,
            });
        }
    }
    async fetchContractHistory(contractAddress) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryContractHistoryRequest.create();
        request.address = contractAddress;
        try {
            const response = await this.retry(() => this.client.ContractHistory(request));
            return transformers_1.ChainGrpcWasmTransformer.contactHistoryResponseToContractHistory(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'ContractHistory',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'ContractHistory',
                contextModule: this.module,
            });
        }
    }
    async fetchSmartContractState(contractAddress, query) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QuerySmartContractStateRequest.create();
        request.address = contractAddress;
        if (query) {
            request.queryData = Buffer.from(typeof query === 'string' ? query : (0, utf8_1.toBase64)(query), 'base64');
        }
        try {
            const response = await this.retry(() => this.client.SmartContractState(request));
            return response;
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'SmartContractState',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'SmartContractState',
                contextModule: this.module,
            });
        }
    }
    async fetchRawContractState(contractAddress, query) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryRawContractStateRequest.create();
        request.address = contractAddress;
        if (query) {
            request.queryData = Buffer.from(query, 'base64');
        }
        try {
            const response = await this.retry(() => this.client.RawContractState(request));
            return response;
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'RawContractState',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'RawContractState',
                contextModule: this.module,
            });
        }
    }
    async fetchContractCodes(pagination) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryCodesRequest.create();
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.Codes(request));
            return transformers_1.ChainGrpcWasmTransformer.contractCodesResponseToContractCodes(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Codes',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Codes',
                contextModule: this.module,
            });
        }
    }
    async fetchContractCode(codeId) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryCodeRequest.create();
        request.codeId = codeId.toString();
        try {
            const response = await this.retry(() => this.client.Code(request));
            return transformers_1.ChainGrpcWasmTransformer.contractCodeResponseToContractCode(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Code',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Code',
                contextModule: this.module,
            });
        }
    }
    async fetchContractCodeContracts(codeId, pagination) {
        const request = core_proto_ts_1.CosmwasmWasmV1Query.QueryContractsByCodeRequest.create();
        request.codeId = codeId.toString();
        const paginationForRequest = (0, pagination_1.paginationRequestFromPagination)(pagination);
        if (paginationForRequest) {
            request.pagination = paginationForRequest;
        }
        try {
            const response = await this.retry(() => this.client.ContractsByCode(request));
            return transformers_1.ChainGrpcWasmTransformer.contractByCodeResponseToContractByCode(response);
        }
        catch (e) {
            if (e instanceof core_proto_ts_1.CosmwasmWasmV1Query.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'ContractsByCode',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'ContractsByCode',
                contextModule: this.module,
            });
        }
    }
}
exports.ChainGrpcWasmApi = ChainGrpcWasmApi;
//# sourceMappingURL=ChainGrpcWasmApi.js.map