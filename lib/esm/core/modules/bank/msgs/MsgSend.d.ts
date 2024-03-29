import { MsgBase } from "../../MsgBase";
import { CosmosBankV1Beta1Tx, CosmosBaseV1Beta1Coin } from "@injectivelabs/core-proto-ts";
export declare namespace MsgSend {
    interface Params {
        amount: {
            denom: string;
            amount: string;
        } | {
            denom: string;
            amount: string;
        }[];
        srcInjectiveAddress: string;
        dstInjectiveAddress: string;
    }
    type Proto = CosmosBankV1Beta1Tx.MsgSend;
}
/**
 * @category Messages
 */
export default class MsgSend extends MsgBase<MsgSend.Params, MsgSend.Proto> {
    static fromJSON(params: MsgSend.Params): MsgSend;
    toProto(): CosmosBankV1Beta1Tx.MsgSend;
    toData(): {
        fromAddress: string;
        toAddress: string;
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
        message: CosmosBankV1Beta1Tx.MsgSend;
    };
    toBinary(): Uint8Array;
}
