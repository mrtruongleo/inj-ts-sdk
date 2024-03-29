import BaseRestConsumer from '../../base/BaseRestConsumer';
/**
 * @category Indexer Chronos API
 */
export declare class IndexerRestLeaderboardChronosApi extends BaseRestConsumer {
    fetchLeaderboard(resolution: string): Promise<import("../types/leaderboard-rest").ChronosLeaderboard>;
}
