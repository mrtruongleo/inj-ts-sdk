"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcMitoStreamTransformer = void 0;
const IndexerGrpcMitoTransformer_1 = require("./IndexerGrpcMitoTransformer");
/**
 * @category Indexer Stream Transformer
 */
class IndexerGrpcMitoStreamTransformer {
    static transfersStreamCallback = (response) => ({
        transfer: response.data
            ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoTransferHistoryToTransferHistory(response.data)
            : undefined,
        opType: response.opType,
    });
    static vaultStreamCallback = (response) => ({
        vault: response.data
            ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoVaultToVault(response.data)
            : undefined,
        opType: response.opType,
    });
    static vaultHolderSubscriptionStreamCallback = (response) => ({
        subscription: response.data
            ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoSubscriptionToSubscription(response.data)
            : undefined,
        opType: response.opType,
    });
    static stakingRewardByAccountStreamCallback = (response) => ({
        stakingReward: response.data
            ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoStakingRewardToStakingReward(response.data)
            : undefined,
        opType: response.opType,
    });
    static historicalStakingStreamCallback = (response) => ({
        historicalStaking: response.data
            ? IndexerGrpcMitoTransformer_1.IndexerGrpcMitoTransformer.mitoStakingActivityToStakingActivity(response.data)
            : undefined,
        opType: response.opType,
    });
}
exports.IndexerGrpcMitoStreamTransformer = IndexerGrpcMitoStreamTransformer;
//# sourceMappingURL=IndexerGrpcMitoStreamTransformer.js.map