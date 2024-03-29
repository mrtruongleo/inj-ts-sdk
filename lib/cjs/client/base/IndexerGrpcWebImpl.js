"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcWebImpl = exports.GrpcWebError = void 0;
const grpc_web_1 = require("@injectivelabs/grpc-web");
const browser_headers_1 = require("browser-headers");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class GrpcWebError extends Error {
    code;
    metadata;
    constructor(message, code, metadata) {
        super(message);
        this.code = code;
        this.metadata = metadata;
    }
}
exports.GrpcWebError = GrpcWebError;
class GrpcWebImpl {
    host;
    options;
    constructor(host, options) {
        this.host = host;
        this.options = options;
    }
    unary(methodDesc, _request, metadata) {
        const request = { ..._request, ...methodDesc.requestType };
        const metadataWithCookieMetadata = new browser_headers_1.BrowserHeaders({
            ...(metadata?.headersMap || {}),
            ...(this.options?.metadata?.headersMap || {}),
        });
        return new Promise((resolve, reject) => {
            grpc_web_1.grpc.unary(methodDesc, {
                request,
                host: this.host,
                metadata: metadataWithCookieMetadata,
                transport: this.options.transport,
                debug: this.options.debug,
                onEnd: (response) => {
                    if (response.status === grpc_web_1.grpc.Code.OK) {
                        return resolve(response.message.toObject());
                    }
                    return reject(new GrpcWebError(response.statusMessage, response.status, response.trailers));
                },
            });
        });
    }
    invoke(methodDesc, _request, metadata) {
        const upStreamCodes = this.options.upStreamRetryCodes || [];
        const DEFAULT_TIMEOUT_TIME = 3_000;
        const request = { ..._request, ...methodDesc.requestType };
        const actualMetadata = new browser_headers_1.BrowserHeaders({
            ...(metadata?.headersMap || {}),
            ...(this.options?.metadata?.headersMap || {}),
        });
        return new rxjs_1.Observable((observer) => {
            const upStream = () => {
                const client = grpc_web_1.grpc.invoke(methodDesc, {
                    host: this.host,
                    request,
                    transport: this.options.streamingTransport || this.options.transport,
                    metadata: actualMetadata,
                    debug: this.options.debug,
                    onMessage: (next) => observer.next(next),
                    onEnd: (code, message, trailers) => {
                        if (code === 0) {
                            observer.complete();
                        }
                        else if (upStreamCodes.includes(code)) {
                            setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
                        }
                        else {
                            const err = new Error(message);
                            err.code = code;
                            err.metadata = trailers;
                            observer.error(err);
                        }
                    },
                });
                observer.add(() => client.close());
            };
            upStream();
        }).pipe((0, operators_1.share)());
    }
}
exports.GrpcWebImpl = GrpcWebImpl;
//# sourceMappingURL=IndexerGrpcWebImpl.js.map