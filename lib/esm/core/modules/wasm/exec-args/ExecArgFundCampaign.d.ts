import { ExecArgBase, ExecDataRepresentation } from '../ExecArgBase';
export declare namespace ExecArgFundCampaign {
    interface Params {
        campaignId: number;
    }
    interface Data {
        campaign_id: number;
    }
}
/**
 * @category Contract Exec Arguments
 */
export default class ExecArgFundCampaign extends ExecArgBase<ExecArgFundCampaign.Params, ExecArgFundCampaign.Data> {
    static fromJSON(params: ExecArgFundCampaign.Params): ExecArgFundCampaign;
    toData(): ExecArgFundCampaign.Data;
    toExecData(): ExecDataRepresentation<ExecArgFundCampaign.Data>;
}
