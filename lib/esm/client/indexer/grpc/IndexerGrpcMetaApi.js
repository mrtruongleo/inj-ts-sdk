"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcMetaApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcMetaApi extends BaseIndexerGrpcConsumer_1.default {
    module = types_1.IndexerModule.Meta;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new indexer_proto_ts_1.InjectiveMetaRpc.InjectiveMetaRPCClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchPing() {
        const request = indexer_proto_ts_1.InjectiveMetaRpc.PingRequest.create();
        try {
            const response = await this.retry(() => this.client.Ping(request));
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Ping',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Ping',
                contextModule: this.module,
            });
        }
    }
    async fetchVersion() {
        const request = indexer_proto_ts_1.InjectiveMetaRpc.VersionRequest.create();
        try {
            const response = await this.retry(() => this.client.Version(request));
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Version',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Version',
                contextModule: this.module,
            });
        }
    }
    async fetchInfo() {
        const request = indexer_proto_ts_1.InjectiveMetaRpc.InfoRequest.create();
        request.timestamp = Date.now().toString();
        try {
            const response = await this.retry(() => this.client.Info(request));
            return response;
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: 'Info',
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: 'Info',
                contextModule: this.module,
            });
        }
    }
}
exports.IndexerGrpcMetaApi = IndexerGrpcMetaApi;
//# sourceMappingURL=IndexerGrpcMetaApi.js.map