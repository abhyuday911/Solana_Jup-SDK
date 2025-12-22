import { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { RpcConnection } from "@/lib/solana";
import { BN } from "bn.js";
import { getOperateIx } from "@jup-ag/lend/borrow";
import {
  ComputeBudgetProgram,
  TransactionMessage,
  VersionedTransaction,
  SendTransactionError,
  TransactionInstruction,
} from "@solana/web3.js";

export function useOperate(vaultId: number, positionId: number) {
  const wallet = useWallet();

  const operate = useCallback(
    async (
      colAmount: number,
      debtAmount: number,
      preInstructions: TransactionInstruction[] = []
    ) => {
      if (!wallet.publicKey) throw new Error("wallet not connected");

      try {
        const { ixs, addressLookupTableAccounts } = await getOperateIx({
          vaultId,
          positionId,
          colAmount: new BN(colAmount),
          debtAmount: new BN(debtAmount),
          signer: wallet.publicKey,
          connection: RpcConnection,
        });

        const latestBlockhash = await RpcConnection.getLatestBlockhash();

        const messageV0 = new TransactionMessage({
          payerKey: wallet.publicKey,
          recentBlockhash: latestBlockhash.blockhash,
          instructions: [
            ComputeBudgetProgram.setComputeUnitLimit({
              units: 1_000_000,
            }),
            ...preInstructions,
            ...ixs,
          ],
        }).compileToV0Message(addressLookupTableAccounts);

        const transaction = new VersionedTransaction(messageV0);

        if (!wallet.signTransaction) {
          throw new Error("wallet does not support transaction signing");
        }

        const signedTx = await wallet.signTransaction(transaction);
        const txid = await RpcConnection.sendRawTransaction(
          signedTx.serialize()
        );
        console.log(txid);
        return txid;
      } catch (error) {
        // handle SendTransactionError
        if (error instanceof SendTransactionError) {
          const logs = await error.getLogs(RpcConnection);
          console.error("Transaction logs:", logs);

          throw new Error(
            `Transaction failed: ${error.message}\nLogs: ${logs?.join("\n")}`
          );
        } else {
          throw error;
        }
      }
    },
    [vaultId, positionId, wallet]
  );

  return { operate };
}
