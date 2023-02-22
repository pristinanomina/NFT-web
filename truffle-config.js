const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
require("dotenv").config();
const mnemonic = process.env.MNEMONIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },

    sepolia: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://sepolia.infura.io/v3/a9644b086ff540aaa657ba759d83de4e`
        ),
      network_id: 11155111,
      confirmations: 1,
      timeoutBlocks: 10000,
      skipDryRun: true,
    },

    goerli: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/a9644b086ff540aaa657ba759d83de4e`
        ),
      network_id: 5,
      confirmations: 1,
      timeoutBlocks: 10000,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
