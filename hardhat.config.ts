import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-upgradable";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const privKey = process.env.WALLET_PRIVATE_KEY

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const config: HardhatUserConfig = {
  defaultNetwork: "zkSyncSepoliaTestnet",
  networks: {
    // https://sepolia.zksync.io
    // https://sepolia.era.zksync.dev
    // https://eth-sepolia.g.alchemy.com/v2/3ui4skpB5vLfZtLX8pF7vyP3Vx7kHJ5t
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/3ui4skpB5vLfZtLX8pF7vyP3Vx7kHJ5t", // The Ethereum Web3 RPC URL (optional).
      zksync: false, // disables zksolc compiler
    },
    zkSyncSepoliaTestnet: {
      url: "https://sepolia.era.zksync.dev",
      ethNetwork:
        "sepolia",
      zksync: true,
      gas: 20000000,
      // gasLimit: 500000,
      verifyURL:
        "https://explorer.sepolia.era.zksync.dev/contract_verification",
        accounts: [String(privKey)]
    },
    zkSyncMainnet: {
      url: "https://mainnet.era.zksync.io",
      ethNetwork: "mainnet",
      zksync: true,
      verifyURL:
        "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
        accounts: [String(privKey)]
    },
    dockerizedNode: {
      url: "http://localhost:3050",
      ethNetwork: "http://localhost:8545",
      zksync: true,
    },
    inMemoryNode: {
      url: "http://127.0.0.1:8011",
      ethNetwork: "localhost", // in-memory node doesn't support eth node; removing this line will cause an error
      zksync: true,
    },
    hardhat: {
      zksync: true,
    },
  },
 zksolc: {
    version: "latest",
    settings: {
      // compilerPath: "zksolc", // optional. Ignored for compilerSource "docker". Can be used if compiler is located in a specific folder
      libraries: {
              "maci-contracts/contracts/crypto/PoseidonT3.sol": {
                "PoseidonT3": "0x1447872E09b36eB3Bc49cF930c47175Da46139fE"
              },
              "maci-contracts/contracts/crypto/PoseidonT6.sol": {
                "PoseidonT6": "0x5BfcF5A1b1e0e0D5E1B4d352f8eCF8f29913008D"
              },
              "maci-contracts/contracts/crypto/PoseidonT4.sol": {
                "PoseidonT4": "0x8Aba44ee35A51c51F271D68c5dc936c529f762BC"
              },
              "maci-contracts/contracts/crypto/PoseidonT5.sol": {
                "PoseidonT5": "0xbFcb4f0fa5F3831998408d63882E0f6E2095C49F"
              }
            }, // optional. References to non-inlinable libraries
      missingLibrariesPath:
        "./.zksolc-libraries-cache/missingLibraryDependencies.json", // optional. This path serves as a cache that stores all the libraries that are missing or have dependencies on other libraries. A `hardhat-zksync-deploy` plugin uses this cache later to compile and deploy the libraries, especially when the `deploy-zksync:libraries` task is executed
      enableEraVMExtensions: false, // optional.  Enables Yul instructions available only for ZKsync system contracts and libraries
      forceEVMLA: false, // optional. Falls back to EVM legacy assembly if there is a bug with Yul
      optimizer: {
        enabled: true, // optional. True by default
        mode: "3", // optional. 3 by default, z to optimize bytecode size
        fallback_to_optimizing_for_size: false, // optional. Try to recompile with optimizer mode "z" if the bytecode is too large
      },
    },
  },
  
  solidity: {
    version: "0.8.20",
  },
};

export default config;
