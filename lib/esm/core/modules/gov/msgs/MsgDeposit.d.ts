import { CosmosBaseV1Beta1Coin, CosmosGovV1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgDeposit {
    interface Params {
        proposalId: number;
        amount: {
            denom: string;
            amount: string;
        };
        depositor: string;
    }
    type Proto = CosmosGovV1Tx.MsgDeposit;
}
/**
 * @category Messages
 */
export default class MsgDeposit extends MsgBase<MsgDeposit.Params, MsgDeposit.Proto> {
    static fromJSON(params: MsgDeposit.Params): MsgDeposit;
    toProto(): CosmosGovV1Tx.MsgDeposit;
    toData(): {
        proposalId: string;
        depositor: string;
        amount: CosmosBaseV1Beta1Coin.Coin[];
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: CosmosGovV1Tx.MsgDeposit;
    };
    toBinary(): Uint8Array;
}
