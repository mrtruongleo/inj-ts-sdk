"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcMitoApi = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const mito_proto_ts_1 = require("@injectivelabs/mito-proto-ts");
const indexer_proto_ts_1 = require("@injectivelabs/indexer-proto-ts");
const BaseIndexerGrpcConsumer_1 = __importDefault(require("../../base/BaseIndexerGrpcConsumer"));
const types_1 = require("../types");
const transformers_1 = require("../transformers");
/**
 * @category Indexer Grpc API
 */
class IndexerGrpcMitoApi extends BaseIndexerGrpcConsumer_1.default {
    module = types_1.IndexerModule.Mito;
    client;
    constructor(endpoint) {
        super(endpoint);
        this.client = new mito_proto_ts_1.MitoApi.MitoAPIClientImpl(this.getGrpcWebImpl(endpoint));
    }
    async fetchVault({ contractAddress, slug, }) {
        const request = mito_proto_ts_1.MitoApi.GetVaultRequest.create();
        if (slug) {
            request.slug = slug;
        }
        if (contractAddress) {
            request.contractAddress = contractAddress;
        }
        try {
            const response = await this.retry(() => this.client.GetVault(request));
            return transformers_1.IndexerGrpcMitoTransformer.vaultResponseToVault(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "GetVault",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "GetVault",
                contextModule: this.module,
            });
        }
    }
    async fetchVaults({ limit, codeId, pageIndex, }) {
        const request = mito_proto_ts_1.MitoApi.GetVaultsRequest.create();
        if (codeId) {
            request.codeId = codeId;
        }
        if (limit) {
            request.limit = limit;
        }
        if (pageIndex) {
            request.pageIndex = pageIndex;
        }
        try {
            const response = await this.retry(() => this.client.GetVaults(request));
            return transformers_1.IndexerGrpcMitoTransformer.vaultsResponseToVaults(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "GetVaults",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "GetVaults",
                contextModule: this.module,
            });
        }
    }
    async fetchLpTokenPriceChart({ to, from, vaultAddress, }) {
        const request = mito_proto_ts_1.MitoApi.LPTokenPriceChartRequest.create();
        request.vaultAddress = vaultAddress;
        if (from) {
            request.fromTime = from;
        }
        if (to) {
            request.toTime = to;
        }
        try {
            const response = await this.retry(() => this.client.LPTokenPriceChart(request));
            return transformers_1.IndexerGrpcMitoTransformer.lpTokenPriceChartResponseToLPTokenPriceChart(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "LPTokenPriceChart",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "LPTokenPriceChart",
                contextModule: this.module,
            });
        }
    }
    async fetchTVLChartRequest({ to, from, vaultAddress, }) {
        const request = mito_proto_ts_1.MitoApi.TVLChartRequest.create();
        request.vaultAddress = vaultAddress;
        if (to) {
            request.toTime = to;
        }
        if (from) {
            request.fromTime = from;
        }
        try {
            const response = await this.retry(() => this.client.TVLChart(request));
            return transformers_1.IndexerGrpcMitoTransformer.lpTokenPriceChartResponseToLPTokenPriceChart(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "TVLChart",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "TVLChart",
                contextModule: this.module,
            });
        }
    }
    async fetchVaultsByHolderAddress({ skip, limit, holderAddress, vaultAddress, }) {
        const request = mito_proto_ts_1.MitoApi.VaultsByHolderAddressRequest.create();
        request.holderAddress = holderAddress;
        if (vaultAddress) {
            request.vaultAddress = vaultAddress;
        }
        if (skip) {
            request.skip = skip;
        }
        if (limit) {
            request.limit = limit;
        }
        try {
            const response = await this.retry(() => this.client.VaultsByHolderAddress(request));
            return transformers_1.IndexerGrpcMitoTransformer.vaultsByHolderAddressResponseToVaultsByHolderAddress(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "VaultsByHolderAddress",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "VaultsByHolderAddress",
                contextModule: this.module,
            });
        }
    }
    async fetchLPHolders({ skip, limit, vaultAddress, stakingContractAddress, }) {
        const request = mito_proto_ts_1.MitoApi.LPHoldersRequest.create();
        request.vaultAddress = vaultAddress;
        request.stakingContractAddress = stakingContractAddress;
        if (skip) {
            request.skip = skip;
        }
        if (limit) {
            request.limit = limit;
        }
        try {
            const response = await this.retry(() => this.client.LPHolders(request));
            return transformers_1.IndexerGrpcMitoTransformer.lpHoldersResponseToLPHolders(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "LPHolders",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "LPHolders",
                contextModule: this.module,
            });
        }
    }
    async fetchHolderPortfolio({ holderAddress, stakingContractAddress, }) {
        const request = mito_proto_ts_1.MitoApi.PortfolioRequest.create();
        request.holderAddress = holderAddress;
        request.stakingContractAddress = stakingContractAddress;
        try {
            const response = await this.retry(() => this.client.Portfolio(request));
            return transformers_1.IndexerGrpcMitoTransformer.portfolioResponseToPortfolio(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "Portfolio",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "Portfolio",
                contextModule: this.module,
            });
        }
    }
    async fetchLeaderboard(epochId) {
        const request = mito_proto_ts_1.MitoApi.LeaderboardRequest.create();
        if (epochId) {
            request.epochId = epochId;
        }
        try {
            const response = await this.retry(() => this.client.Leaderboard(request));
            return transformers_1.IndexerGrpcMitoTransformer.leaderboardResponseToLeaderboard(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "Leaderboard",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "Leaderboard",
                contextModule: this.module,
            });
        }
    }
    async fetchTransferHistory({ vault, account, limit, toNumber, fromNumber, }) {
        const request = mito_proto_ts_1.MitoApi.TransfersHistoryRequest.create();
        if (vault) {
            request.vault = vault;
        }
        if (account) {
            request.account = account;
        }
        if (limit) {
            request.limit = limit;
        }
        if (toNumber) {
            request.toNumber = toNumber;
        }
        if (fromNumber) {
            request.fromNumber = fromNumber;
        }
        try {
            const response = await this.retry(() => this.client.TransfersHistory(request));
            return transformers_1.IndexerGrpcMitoTransformer.transferHistoryResponseToTransfer(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "TransfersHistory",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "TransfersHistory",
                contextModule: this.module,
            });
        }
    }
    async fetchLeaderboardEpochs({ limit, toEpochId, fromEpochId, }) {
        const request = mito_proto_ts_1.MitoApi.LeaderboardEpochsRequest.create();
        if (limit) {
            request.limit = limit;
        }
        if (toEpochId) {
            request.toEpochId = toEpochId;
        }
        if (fromEpochId) {
            request.fromEpochId = fromEpochId;
        }
        try {
            const response = await this.retry(() => this.client.LeaderboardEpochs(request));
            return transformers_1.IndexerGrpcMitoTransformer.leaderboardEpochsResponseToLeaderboardEpochs(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "LeaderboardEpochs",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "LeaderboardEpochs",
                contextModule: this.module,
            });
        }
    }
    async fetchStakingPools({ staker, stakingContractAddress, }) {
        const request = mito_proto_ts_1.MitoApi.GetStakingPoolsRequest.create();
        request.stakingContractAddress = stakingContractAddress;
        if (staker) {
            request.staker = staker;
        }
        try {
            const response = await this.retry(() => this.client.GetStakingPools(request));
            return transformers_1.IndexerGrpcMitoTransformer.stakingPoolsResponseToStakingPools(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "GetStakingPools",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "GetStakingPools",
                contextModule: this.module,
            });
        }
    }
    async fetchStakingHistory({ staker, toNumber, limit, fromNumber, } = {}) {
        const request = mito_proto_ts_1.MitoApi.StakingHistoryRequest.create();
        if (limit) {
            request.limit = limit;
        }
        if (staker) {
            request.staker = staker;
        }
        if (toNumber) {
            request.toNumber = toNumber;
        }
        if (fromNumber) {
            request.fromNumber = fromNumber;
        }
        try {
            const response = await this.retry(() => this.client.StakingHistory(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoStakingHistoryResponseTpStakingHistory(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "StakingHistory",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "StakingHistory",
                contextModule: this.module,
            });
        }
    }
    async fetchStakingRewardsByAccount({ staker, stakingContractAddress, }) {
        const request = mito_proto_ts_1.MitoApi.StakingRewardByAccountRequest.create();
        request.staker = staker;
        request.stakingContractAddress = stakingContractAddress;
        try {
            const response = await this.retry(() => this.client.StakingRewardByAccount(request));
            return transformers_1.IndexerGrpcMitoTransformer.stakingRewardByAccountResponseToStakingRewardByAccount(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "StakingReward",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "StakingReward",
                contextModule: this.module,
            });
        }
    }
    async fetchMissions({ accountAddress }) {
        const request = mito_proto_ts_1.MitoApi.MissionsRequest.create();
        request.accountAddress = accountAddress;
        try {
            const response = await this.retry(() => this.client.Missions(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoMissionsResponseMissions(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "Missions",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "Missions",
                contextModule: this.module,
            });
        }
    }
    async fetchMissionLeaderboard(userAddress) {
        const request = mito_proto_ts_1.MitoApi.MissionLeaderboardRequest.create();
        if (userAddress) {
            request.userAddress = userAddress;
        }
        try {
            const response = await this.retry(() => this.client.MissionLeaderboard(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoMissionLeaderboardResponseToMissionLeaderboard(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "MissionLeaderboard",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "MissionLeaderboard",
                contextModule: this.module,
            });
        }
    }
    async fetchIDO({ contractAddress, accountAddress, }) {
        const request = mito_proto_ts_1.MitoApi.GetIDORequest.create();
        request.contractAddress = contractAddress;
        if (accountAddress) {
            request.accountAddress = accountAddress;
        }
        try {
            const response = await this.retry(() => this.client.GetIDO(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoIDOResponseToIDO(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "GetIDO",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "GetIdo",
                contextModule: this.module,
            });
        }
    }
    async fetchIDOs({ status, limit, toNumber, accountAddress, ownerAddress, } = {}) {
        const request = mito_proto_ts_1.MitoApi.ListIDOsRequest.create();
        if (status) {
            request.status = status;
        }
        if (limit) {
            request.limit = limit;
        }
        if (toNumber) {
            request.toNumber = toNumber;
        }
        if (accountAddress) {
            request.accountAddress = accountAddress;
        }
        if (ownerAddress) {
            request.ownerAddress = ownerAddress;
        }
        try {
            const response = await this.retry(() => this.client.ListIDOs(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoListIDOsResponseToIDOs(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "ListIDOs",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "ListIDOs",
                contextModule: this.module,
            });
        }
    }
    async fetchIDOSubscribers({ skip, limit, sortBy, contractAddress, }) {
        const request = mito_proto_ts_1.MitoApi.GetIDOSubscribersRequest.create();
        request.contractAddress = contractAddress;
        if (limit) {
            request.limit = limit;
        }
        if (skip) {
            request.skip = skip;
        }
        if (sortBy) {
            request.sortBy = sortBy;
        }
        try {
            const response = await this.retry(() => this.client.GetIDOSubscribers(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoIDOSubscribersResponseToIDOSubscribers(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "GetIDOSubscribers",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "GetIDOSubscribers",
                contextModule: this.module,
            });
        }
    }
    async fetchIDOSubscription({ contractAddress, accountAddress, }) {
        const request = mito_proto_ts_1.MitoApi.GetIDOSubscriptionRequest.create();
        request.accountAddress = accountAddress;
        request.contractAddress = contractAddress;
        try {
            const response = await this.retry(() => this.client.GetIDOSubscription(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoIDOSubscriptionResponseToIDOSubscription(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "GetIDOSubscription",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "GetIDOSubscription",
                contextModule: this.module,
            });
        }
    }
    async fetchIDOActivities({ contractAddress, accountAddress, limit, toNumber, } = {}) {
        const request = mito_proto_ts_1.MitoApi.GetIDOActivitiesRequest.create();
        if (contractAddress) {
            request.contractAddress = contractAddress;
        }
        if (accountAddress) {
            request.accountAddress = accountAddress;
        }
        if (limit) {
            request.limit = limit;
        }
        if (toNumber) {
            request.toNumber = toNumber;
        }
        try {
            const response = await this.retry(() => this.client.GetIDOActivities(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoIDOActivitiesResponseToIDOActivities(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "GetIDOActivities",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "GetIDOActivities",
                contextModule: this.module,
            });
        }
    }
    async fetchIDOWhitelist({ skip, limit, idoAddress, }) {
        const request = mito_proto_ts_1.MitoApi.GetWhitelistRequest.create();
        request.idoAddress = idoAddress;
        if (skip) {
            request.skip = skip;
        }
        if (limit) {
            request.limit = limit;
        }
        try {
            const response = await this.retry(() => this.client.GetWhitelist(request));
            return transformers_1.IndexerGrpcMitoTransformer.mitoWhitelistAccountResponseToWhitelistAccount(response);
        }
        catch (e) {
            if (e instanceof indexer_proto_ts_1.InjectiveMetaRpc.GrpcWebError) {
                throw new exceptions_1.GrpcUnaryRequestException(new Error(e.toString()), {
                    code: e.code,
                    context: "GetWhitelist",
                    contextModule: this.module,
                });
            }
            throw new exceptions_1.GrpcUnaryRequestException(e, {
                code: exceptions_1.UnspecifiedErrorCode,
                context: "GetWhitelist",
                contextModule: this.module,
            });
        }
    }
}
exports.IndexerGrpcMitoApi = IndexerGrpcMitoApi;
//# sourceMappingURL=IndexerGrpcMitoApi.js.map