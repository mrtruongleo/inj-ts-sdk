import { GrpcValidator, GrpcValidatorCommission, GrpcValidatorDescription, BondStatus, Validator, ValidatorCommission, ValidatorDescription, Delegation, UnBondingDelegation, ReDelegation, Pool, StakingModuleParams } from '../types/staking';
import { Pagination } from '../../../types';
import { CosmosStakingV1Beta1Query } from '@injectivelabs/core-proto-ts';
/**
 * @category Chain Grpc Transformer
 */
export declare class ChainGrpcStakingTransformer {
    static moduleParamsResponseToModuleParams(response: CosmosStakingV1Beta1Query.QueryParamsResponse): StakingModuleParams;
    static validatorResponseToValidator(response: CosmosStakingV1Beta1Query.QueryValidatorResponse): Validator;
    static validatorsResponseToValidators(response: CosmosStakingV1Beta1Query.QueryValidatorsResponse): {
        validators: Validator[];
        pagination: Pagination;
    };
    static delegationResponseToDelegation(response: CosmosStakingV1Beta1Query.QueryDelegationResponse): Delegation;
    static delegationsResponseToDelegations(response: CosmosStakingV1Beta1Query.QueryDelegatorDelegationsResponse): {
        delegations: Delegation[];
        pagination: Pagination;
    };
    static unBondingDelegationsResponseToUnBondingDelegations(response: CosmosStakingV1Beta1Query.QueryDelegatorUnbondingDelegationsResponse): {
        unbondingDelegations: UnBondingDelegation[];
        pagination: Pagination;
    };
    static reDelegationsResponseToReDelegations(response: CosmosStakingV1Beta1Query.QueryRedelegationsResponse): {
        redelegations: ReDelegation[];
        pagination: Pagination;
    };
    static grpcValidatorToValidator(validator: GrpcValidator): Validator;
    static poolResponseToPool(response: CosmosStakingV1Beta1Query.QueryPoolResponse): Pool;
    static grpcValidatorDescriptionToDescription(description?: GrpcValidatorDescription): ValidatorDescription;
    static grpcValidatorCommissionToCommission(commission?: GrpcValidatorCommission): ValidatorCommission;
    static grpcValidatorStatusToStatus(status: number): BondStatus;
}
