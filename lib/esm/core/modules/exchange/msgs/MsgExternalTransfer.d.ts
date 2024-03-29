import { CosmosBaseV1Beta1Coin, InjectiveExchangeV1Beta1Tx } from "@injectivelabs/core-proto-ts";
import { MsgBase } from "../../MsgBase";
export declare namespace MsgExternalTransfer {
    interface Params {
        srcSubaccountId: string;
        dstSubaccountId: string;
        injectiveAddress: string;
        amount: {
            amount: string;
            denom: string;
        };
    }
    type Proto = InjectiveExchangeV1Beta1Tx.MsgExternalTransfer;
}
/**
 * @category Messages
 */
export default class MsgExternalTransfer extends MsgBase<MsgExternalTransfer.Params, MsgExternalTransfer.Proto> {
    static fromJSON(params: MsgExternalTransfer.Params): MsgExternalTransfer;
    toProto(): InjectiveExchangeV1Beta1Tx.MsgExternalTransfer;
    toData(): {
        sender: string;
        sourceSubaccountId: string;
        destinationSubaccountId: string;
        amount: CosmosBaseV1Beta1Coin.Coin | undefined;
        "@type": string;
    };
    toAmino(): {
        type: string;
        value: any;
    };
    toWeb3(): any;
    toDirectSign(): {
        type: string;
        message: InjectiveExchangeV1Beta1Tx.MsgExternalTransfer;
    };
    toBinary(): Uint8Array;
}
