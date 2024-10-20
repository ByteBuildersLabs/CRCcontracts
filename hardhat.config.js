require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",  // Actualización de la versión de Solidity
  networks: {
    goerli: { // Configuración para la red Goerli
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`, // Actualiza si usas otro proveedor
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    sepolia: { // Configuración para la red Sepolia
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    mainnet: { // Configuración para la red Mainnet (opcional)
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    }
  },
};
