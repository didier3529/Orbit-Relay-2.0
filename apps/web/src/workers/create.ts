import * as airdropsender from "core";
import { SQLocalDrizzle } from "sqlocal/drizzle";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { databaseFile } from "core";
import { PublicKey } from "@solana/web3.js";
import { configureDatabase } from "@/lib/utils";

const { driver, batchDriver } = new SQLocalDrizzle({
  databasePath: databaseFile,
  verbose: false,
});

const db = drizzle(driver, batchDriver);

export async function create(
  signer: string,
  addresses: string[],
  amount: bigint,
  mintAddress: string
) {
  await configureDatabase(db);

  if (addresses.length > 0) {
    await airdropsender.create({
      db,
      signer: new PublicKey(signer),
      addresses: addresses.map((address) => new PublicKey(address)),
      amount,
      mintAddress: new PublicKey(mintAddress),
    });
  }
}

