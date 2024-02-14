# inj-ts-sdk

Injective TypeScript SDK working with @cosmjs/stargate.
There are many errors when using the native library of @injectivelabs/sdk-ts together with @cosmjs/stargate, so I will separate the sdk-ts part and make some adjustments to make it compatible and consistent with @cosmjs/stargate.

# Contributions and Bug Fixes:

This SDK is a work in progress, and as such, there may be bugs or areas for improvement. Hobbyists are encouraged to contribute to the project by identifying bugs, suggesting enhancements, or submitting fixes. Together, we can improve the SDK and create a more robust and enjoyable development experience for all hobbyists.

# Getting Started:

Begin your hobby project by installing the SDK via npm:

`npm install @mrtruongleo/inj-ts-sdk`

Explore the SDK’s modules and start experimenting with blockchain features in your projects.

# Example send inj transaction:

```
//1.Import
import {
  EthermintStargateClient,
  EthermintSecp256k1Wallet,
} from "@mrtruongleo/inj-ts-sdk";
import { BigNumberInBase } from "@injectivelabs/utils";
import { StdFee, calculateFee, GasPrice } from "@cosmjs/stargate";

//2.Main scripts
(async () => {
  //define chain's details.
  const network = {
    rest: "https://injective-api.polkachu.com",
    chainId: "injective-1",
    rpc: "https://injective-rpc.polkachu.com",
  };
  //define wallet info, I prefer to use private key on my transaction instead of mnemonic
  let privateKeyHex = "your_private_key";
  //check if private key start with '0x' (be cause it's evm account)
  privateKeyHex = privateKeyHex.startsWith("0x")
    ? privateKeyHex.substring(2)
    : privateKeyHex;

  //define transaction detail
  const recipient = "inj19tccj2r6l979xmyydhjhq3d8d8dncm404xrjf3";
  const realAmount = 0.001; //inj in real amount
  const amount = {
    denom: "inj",
    amount: new BigNumberInBase(realAmount).toWei().toFixed(), //you can just use amount string like: "1000000000000000"
  };
  const memo = "test inj transaction";

  //define signer and client : this part is only thing has different with other chain of cosmos ecosystem
  const signer = (await EthermintSecp256k1Wallet.fromKey(
    Buffer.from(privateKeyHex, "hex")
  )) as any;
  const signerAddress = (await signer.getAccounts())[0].address;
  const client =
    await EthermintStargateClient.EthSigningStargateClient.connectWithSigner(
      network.rpc as string,
      signer
    );

  //All the rest of the code is the same when working with @cosmjs/stargate
  //You just need define other type of Msg to execute different type of transaction like deleage, claim...
  const sendMsg = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: signerAddress,
      toAddress: recipient,
      amount: [amount],
    },
  };
  const simulate = await client.simulate(signerAddress, [sendMsg], memo);
  console.log("simulated gas limit: ", simulate);

  const usedFee: StdFee = calculateFee(
    Math.round(simulate * 1.5),
    GasPrice.fromString("700000000inj") //this is avarage gasprice from cosmos chain registry
  );
  const txResponse = await client.signAndBroadcast(
    signerAddress,
    [sendMsg],
    usedFee ?? "auto",
    memo
  );
  // const txResponse = await client.sendTokens(
  //   signerAddress,
  //   recipient,
  //   [amount],
  //   usedFee,
  //   memo
  // );
  if (txResponse.code !== 0) {
    console.log(`Transaction failed: ${txResponse.rawLog}`);
  } else {
    console.log(`Broadcasted transaction hash: ${txResponse.transactionHash}`);
    console.log(`gas used: `, {
      gasUsed: txResponse.gasUsed,
      gasWanted: txResponse.gasWanted,
    });
  }
})();

```
