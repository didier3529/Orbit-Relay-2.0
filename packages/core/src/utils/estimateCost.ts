import {
  baseFee,
  compressionFee,
  computeUnitLimit,
  computeUnitPrice,
  maxAddressesPerTransaction,
  MICRO_LAMPORTS_PER_LAMPORT,
} from '../config/constants';

export interface EstimatedCost {
  transactionCount: number;
  baseFee: number;
  compressionFee: number;
  priorityFee: number;
  total: number;
}

/**
 * Estimates the cost of an airdrop in SOL
 * @param recipientCount The number of recipients
 * @param priorityFeeEstimate Priority fee estimate in microLamports
 * @returns Estimated cost in SOL
 */
export const estimateCost = (
  recipientCount: number,
  priorityFeeEstimate: number = computeUnitPrice
): EstimatedCost => {
  const transactionCount = Math.ceil(recipientCount / maxAddressesPerTransaction);

  // Convert lamports to SOL
  const baseFeeSol = (transactionCount * baseFee) / 1e9;
  const compressionFeeSol = (transactionCount * compressionFee) / 1e9;
  const priorityFeeSol =
    (transactionCount * computeUnitLimit * priorityFeeEstimate) / (MICRO_LAMPORTS_PER_LAMPORT * 1e9);

  return {
    transactionCount,
    baseFee: baseFeeSol,
    compressionFee: compressionFeeSol,
    priorityFee: priorityFeeSol,
    total: baseFeeSol + compressionFeeSol + priorityFeeSol,
  };
};

/**
 * Estimates the cost of an airdrop and returns the result as a JSON string
 * @param recipientCount The number of recipients
 * @param priorityFeeEstimate Priority fee estimate in microLamports
 * @returns JSON string with the estimated cost
 */
export const estimateCostJSON = (
  recipientCount: number,
  priorityFeeEstimate: number = computeUnitPrice
): string => {
  return JSON.stringify(estimateCost(recipientCount, priorityFeeEstimate));
};

/**
 * Calculates the percentage of recipients that can be sent tokens with a given SOL balance
 * @param recipientCount The number of recipients
 * @param solBalance The SOL balance in lamports
 * @param priorityFeeEstimate Priority fee estimate in microLamports
 * @returns Percentage of recipients that can be sent tokens (0-100)
 */
export const getSendablePercentage = (
  recipientCount: number,
  solBalance: number,
  priorityFeeEstimate: number = computeUnitPrice
): number => {
  const cost = estimateCost(recipientCount, priorityFeeEstimate);
  const totalCostInLamports = cost.total * 1e9;
  
  if (totalCostInLamports <= 0) return 0;
  if (solBalance >= totalCostInLamports) return 100;
  
  const percentage = (solBalance / totalCostInLamports) * 100;
  return Math.min(Math.max(0, percentage), 100);
};