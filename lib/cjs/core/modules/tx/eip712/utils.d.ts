import { EthereumChainId } from '@injectivelabs/ts-types';
import { Eip712ConvertFeeArgs, Eip712ConvertTxArgs } from './types';
export declare const getEip712Domain: (ethereumChainId: EthereumChainId) => {
    domain: {
        name: string;
        version: string;
        chainId: string;
        salt: string;
        verifyingContract: string;
    };
};
export declare const getEip712DomainV2: (ethereumChainId: EthereumChainId) => {
    domain: {
        name: string;
        version: string;
        chainId: string;
        verifyingContract: string;
        salt: string;
    };
};
export declare const getDefaultEip712Types: () => {
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Tx: {
            name: string;
            type: string;
        }[];
        Fee: {
            name: string;
            type: string;
        }[];
        Coin: {
            name: string;
            type: string;
        }[];
        Msg: {
            name: string;
            type: string;
        }[];
    };
};
export declare const getDefaultEip712TypesV2: () => {
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Tx: {
            name: string;
            type: string;
        }[];
    };
};
export declare const getEip712Fee: (params?: Eip712ConvertFeeArgs) => {
    fee: {
        amount: {
            amount: string;
            denom: string;
        }[];
        gas: string;
        feePayer?: string | undefined;
    };
};
export declare const getEip712FeeV2: (params?: Eip712ConvertFeeArgs) => {
    fee: {
        amount: {
            denom: string;
            amount: string;
        }[];
        gas: number;
        payer?: string | undefined;
    };
};
export declare const getTypesIncludingFeePayer: ({ fee, types, }: {
    fee?: Eip712ConvertFeeArgs | undefined;
    types: ReturnType<typeof getDefaultEip712Types>;
}) => {
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Tx: {
            name: string;
            type: string;
        }[];
        Fee: {
            name: string;
            type: string;
        }[];
        Coin: {
            name: string;
            type: string;
        }[];
        Msg: {
            name: string;
            type: string;
        }[];
    };
};
export declare const getEipTxDetails: ({ accountNumber, sequence, timeoutHeight, chainId, memo, }: Eip712ConvertTxArgs) => {
    account_number: string;
    chain_id: string;
    sequence: string;
    timeout_height: string;
    memo: string;
};
export declare const getEipTxContext: ({ accountNumber, sequence, fee, timeoutHeight, chainId, memo, }: Eip712ConvertTxArgs & {
    fee?: Eip712ConvertFeeArgs | undefined;
}) => {
    account_number: number;
    chain_id: string;
    sequence: number;
    fee: Record<string, any>;
    timeout_height: number;
    memo: string;
};
