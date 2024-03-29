import { InjectiveDmmRpc } from '@injectivelabs/dmm-proto-ts';
import { GrpcEpochV2, EpochV2, MarketReward, EligibleAddress, EligibleAddresses, EpochScoresHistory, GrpcMarketReward, GrpcEligibleAddress, GrpcTotalScore, EpochScores, TotalScore, AccountVolume, TotalScores, GrpcEpochScore, EpochScore, TotalScoresHistory, GrpcRewardDistribution, RewardsDistribution, RewardDistribution, RewardsEligibility, GrpcAccountVolume } from '../types';
export declare class DmmGrpcTransformer {
    static epochsResponseToEpochs(response: InjectiveDmmRpc.GetEpochsResponse): EpochV2[];
    static grpcEpochToEpoch(epoch: GrpcEpochV2): EpochV2;
    static marketRewardsResponseToMarketRewards(response: InjectiveDmmRpc.GetMarketRewardsResponse): MarketReward[];
    static grpcMarketRewardToMarketReward(marketReward: GrpcMarketReward): MarketReward;
    static eligibleAddressesResponseToEligibleAddresses(response: InjectiveDmmRpc.GetEligibleAddressesResponse): EligibleAddresses;
    static grpcEligibleAddresssesToEligibileAddresses(eligibleAddress: GrpcEligibleAddress): EligibleAddress;
    static epochScoresResponseToEpochScores(response: InjectiveDmmRpc.GetEpochScoresResponse): EpochScores;
    static grpcEpochScoresToEpochScores(score: GrpcEpochScore): EpochScore;
    static epochScoresHistoryResponseToEpochScoresHistory(response: InjectiveDmmRpc.GetEpochScoresHistoryResponse): EpochScoresHistory;
    static totalScoresResponseToTotalScores(response: InjectiveDmmRpc.GetTotalScoresResponse): TotalScores;
    static grpcTotalScoresToTotalScores(score: GrpcTotalScore): TotalScore;
    static totalScoresHistoryResponseToTotalScoresHistory(response: InjectiveDmmRpc.GetTotalScoresHistoryResponse): TotalScoresHistory;
    static rewardsDistributionResponseToRewardsDistribution(response: InjectiveDmmRpc.GetRewardsDistributionResponse): RewardsDistribution;
    static grpcRewardsDistributionToRewardsDistribution(reward: GrpcRewardDistribution): RewardDistribution;
    static accountVolumesResponseToAccountVolumes(response: InjectiveDmmRpc.GetAccountVolumesResponse): AccountVolume[];
    static grpcAccountVolumesToAccountVolumes(reward: GrpcAccountVolume): AccountVolume;
    static rewardsEligibilityResponseToRewardsEligibility(response: InjectiveDmmRpc.GetRewardsEligibilityResponse): RewardsEligibility;
}
