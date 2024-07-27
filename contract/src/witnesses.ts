import { Ledger } from "./managed/metadata/contract/index.cjs";
import { WitnessContext } from "@midnight-ntwrk/compact-runtime";

/**
 * Defines the shape of the metadata contract's private state.
 */
export type MetadataPrivateState = {
  readonly secretKey: Uint8Array;
};

/**
 * Creates an object of type MetadataPrivateState.
 * @param secretKey - The secret key to be stored in the private state.
 * @returns The private state object.
 */
export const createMetadataPrivateState = (secretKey: Uint8Array) => ({
  secretKey,
});

/**
 * The witnesses object for the metadata contract.
 * It includes a field for each witness function, mapping the function's name to its implementation.
 * Each function takes a WitnessContext as its first argument and returns a tuple of the new private state and the declared return value.
 */
export const witnesses = {
  /**
   * Implementation of the local_secret_key witness function.
   * It returns the current private state and the user's secret key.
   * @param privateState - The current private state.
   * @returns A tuple containing the private state and the secret key.
   */
  local_secret_key: ({
    privateState,
  }: WitnessContext<Ledger, MetadataPrivateState>): [MetadataPrivateState, Uint8Array] => [
    privateState,
    privateState.secretKey,
  ],
};
