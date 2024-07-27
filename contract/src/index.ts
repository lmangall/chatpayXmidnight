import { deployContract, DeployedContract, MidnightProviders } from "midnight-sdk";
import { MetadataPrivateState, createMetadataPrivateState } from "./witnesses";
import { utils } from "./utils";

// Function to deploy the contract
async function deployMetadataContract(providers: MidnightProviders): Promise<DeployedContract> {
  return deployContract(
    providers,
    "metadataPrivateState",
    createMetadataPrivateState(utils.randomBytes(32)),
    createMetadataContract(providers.walletProvider.coinPublicKey)
  );
}

// Function to store metadata
async function storeMetadata(
  age: number,
  gender: string,
  nationality: string,
  language: string,
  meta_tags: string,
  deployedContract: DeployedContract
) {
  const { txHash, blockHeight } = await deployedContract.contractCircuitsInterface
    .store_metadata(age, gender, nationality, language, meta_tags)
    .then((tx) => tx.submit());

  console.log(`Transaction successful with hash: ${txHash} at block: ${blockHeight}`);
}

// Function to update metadata
async function updateMetadata(
  age: number,
  gender: string,
  nationality: string,
  language: string,
  meta_tags: string,
  deployedContract: DeployedContract
) {
  const { txHash, blockHeight } = await deployedContract.contractCircuitsInterface
    .update_metadata(age, gender, nationality, language, meta_tags)
    .then((tx) => tx.submit());

  console.log(`Transaction successful with hash: ${txHash} at block: ${blockHeight}`);
}

export { deployMetadataContract, storeMetadata, updateMetadata };
