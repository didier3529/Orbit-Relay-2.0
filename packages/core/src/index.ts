import {
  baseFee,
  compressionFee,
  computeUnitLimit,
  computeUnitPrice,
  maxAddressesPerTransaction,
  saga2PreOrderTokenMintAddress,
  databaseFile,
  MICRO_LAMPORTS_PER_LAMPORT,
  sampleTransaction,
} from "./config/constants";

import { isSolanaAddress, normalizeTokenAmount, sleep } from "./utils/common";
import { csvToPublicKeys } from "./utils/csvToPublicKeys";
import {
  AirdropError,
  AirdropErrorMessage,
  AirdropErrorCode,
} from "./utils/airdropError";

// Import the new utility functions
import { estimateCost, estimateCostJSON, getSendablePercentage } from "./utils/estimateCost";

import { init } from "./services/init";
import { create } from "./services/create";
import { exist } from "./services/exist";
import { send } from "./services/send";
import { poll } from "./services/poll";
import { status } from "./services/status";
import { logger } from "./services/logger";

import { getCollectionHolders } from "./services/getCollectionHolders";
import { getTokenAccounts } from "./services/getTokenAccounts";
import { getTokensByOwner, Token } from "./services/getTokensByOwner";
import { isFungibleToken } from "./services/isFungibleToken";
import { isNFTCollection } from "./services/isNFTCollection";
import { NodeDatabase, BrowserDatabase } from "./services/db";
import { getPriorityFeeEstimate } from "./services/getPriorityFeeEstimate";

export {
  init,
  create,
  exist,
  send,
  poll,
  status,
  logger,
  csvToPublicKeys,
  isNFTCollection,
  isFungibleToken,
  getTokensByOwner,
  getCollectionHolders,
  getTokenAccounts,
  isSolanaAddress,
  normalizeTokenAmount,
  sleep,
  saga2PreOrderTokenMintAddress,
  maxAddressesPerTransaction,
  computeUnitLimit,
  computeUnitPrice,
  baseFee,
  compressionFee,
  AirdropError,
  AirdropErrorMessage,
  AirdropErrorCode,
  MICRO_LAMPORTS_PER_LAMPORT,
  databaseFile,
  getPriorityFeeEstimate, 
  sampleTransaction,
  // Export the new utility functions
  estimateCost,
  estimateCostJSON,
  getSendablePercentage,
};

export type { Token, NodeDatabase, BrowserDatabase };