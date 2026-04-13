import { useMutation, useQueryClient } from "@tanstack/react-query";
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

interface OperateParams {
  colAmount: number;
  debtAmount: number;
  preInstructions?: TransactionInstruction[];
}

export function useOperateMutation(vaultId: number, positionId: number) {
  const wallet = useWallet();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ colAmount, debtAmount, preInstructions = [] }: OperateParams) => {
      if (!wallet.publicKey) throw new Error("Wallet not connected");

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
            units: 1_400_000,
          }),
          ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 1000,
          }),
          ...preInstructions,
          ...ixs,
        ],
      }).compileToV0Message(addressLookupTableAccounts);

      const transaction = new VersionedTransaction(messageV0);

      if (!wallet.signTransaction) {
        throw new Error("Wallet does not support transaction signing");
      }

      const signedTx = await wallet.signTransaction(transaction);
      const txid = await RpcConnection.sendRawTransaction(signedTx.serialize());
      
      const confirmation = await RpcConnection.confirmTransaction({
        signature: txid,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
      }, "confirmed");

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err}`);
      }

      return txid;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["position", vaultId, positionId] });
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
    },
    onError: async (error) => {
      if (error instanceof SendTransactionError) {
        const logs = await error.getLogs(RpcConnection);
        console.error("Transaction logs:", logs);
        throw new Error(`Transaction failed: ${error.message}\nLogs: ${logs?.join("\n")}`);
      }
      throw error;
    },
  });
}
