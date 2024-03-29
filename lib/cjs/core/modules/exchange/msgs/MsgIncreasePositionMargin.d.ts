import { InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgIncreasePositionMargin {
    interface Params {
        marketId: string;
        injectiveAddress: string;
        srcSubaccountId: string;
        dstSubaccountId: string;
        amount: string;
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin;
}
/**
 * @category Messages
 */
export default class MsgIncreasePositionMargin extends MsgBase<MsgIncreasePositionMargin.Params, MsgIncreasePositionMargin.Proto> {
    static fromJSON(params: MsgIncreasePositionMargin.Params): MsgIncreasePositionMargin;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin;
    toData(): {
        sender: string;
        sourceSubaccountId: string;
        destinationSubaccountId: string;
        marketId: string;
        amount: string;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgIncreasePositionMargin;
    };
    toBinary(): Uint8Array;
}
