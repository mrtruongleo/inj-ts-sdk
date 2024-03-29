"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerGrpcAccountPortfolioTransformer = void 0;
const IndexerGrpcDerivativeTransformer_1 = require("./IndexerGrpcDerivativeTransformer");
class IndexerGrpcAccountPortfolioTransformer {
    static accountPortfolioResponseToAccountPortfolio(response, address) {
        const portfolio = response.portfolio;
        const bankBalancesList = portfolio?.bankBalances || [];
        const subaccountList = portfolio?.subaccounts || [];
        const positionsWithUpnlList = portfolio?.positionsWithUpnl || [];
        if (!portfolio) {
            return {
                accountAddress: address || '',
                bankBalancesList: [],
                subaccountsList: [],
                positionsWithUpnlList: [],
            };
        }
        return {
            accountAddress: portfolio.accountAddress,
            bankBalancesList: bankBalancesList.map(IndexerGrpcAccountPortfolioTransformer.grpcCoinToCoin),
            subaccountsList: subaccountList.map(IndexerGrpcAccountPortfolioTransformer.grpcSubaccountBalanceToSubaccountBalance),
            positionsWithUpnlList: positionsWithUpnlList.map(IndexerGrpcAccountPortfolioTransformer.grpcPositionWithUPNLToPositionWithUPNL),
        };
    }
    static accountPortfolioBalancesResponseToAccountPortfolioBalances(response, address) {
        const portfolio = response.portfolio;
        const bankBalancesList = portfolio?.bankBalances || [];
        const subaccountList = portfolio?.subaccounts || [];
        if (!portfolio) {
            return {
                accountAddress: address || '',
                bankBalancesList: [],
                subaccountsList: [],
            };
        }
        return {
            accountAddress: portfolio.accountAddress,
            bankBalancesList: bankBalancesList.map(IndexerGrpcAccountPortfolioTransformer.grpcCoinToCoin),
            subaccountsList: subaccountList.map(IndexerGrpcAccountPortfolioTransformer.grpcSubaccountBalanceToSubaccountBalance),
        };
    }
    static grpcCoinToCoin(coin) {
        return {
            amount: coin.amount,
            denom: coin.denom,
        };
    }
    static grpcPositionWithUPNLToPositionWithUPNL(positionsWithUPNL) {
        const grpcPosition = positionsWithUPNL.position;
        return {
            position: grpcPosition
                ? IndexerGrpcDerivativeTransformer_1.IndexerGrpcDerivativeTransformer.grpcPositionToPosition(grpcPosition)
                : undefined,
            unrealizedPnl: positionsWithUPNL.unrealizedPnl,
        };
    }
    static grpcSubaccountDepositToSubaccountDeposit(subaccountDeposit) {
        return {
            totalBalance: subaccountDeposit.totalBalance,
            availableBalance: subaccountDeposit.availableBalance,
        };
    }
    static grpcSubaccountBalanceToSubaccountBalance(subaccountBalance) {
        const deposit = subaccountBalance.deposit;
        return {
            subaccountId: subaccountBalance.subaccountId,
            denom: subaccountBalance.denom,
            deposit: deposit
                ? IndexerGrpcAccountPortfolioTransformer.grpcSubaccountDepositToSubaccountDeposit(deposit)
                : undefined,
        };
    }
}
exports.IndexerGrpcAccountPortfolioTransformer = IndexerGrpcAccountPortfolioTransformer;
//# sourceMappingURL=IndexerAccountPortfolioTransformer.js.map