async function main() {
  // Configuración de las direcciones y parámetros
  const initialOwner = "0xYourOwnerAddress";  // Sustituye con la dirección del propietario inicial
  const ethUsdPriceFeedAddress = "0xYourChainlinkPriceFeedAddress"; // Direccion del feed de precios de Chainlink (por ejemplo en Goerli)
  const usdToColonRate = 512;  // Ejemplo de tasa de conversión USD a Colones

  // Obtener la fábrica del contrato
  const CRCc = await ethers.getContractFactory("CostaRicaColonCrypto");

  // Desplegar el contrato con los parámetros del constructor
  const crcc = await CRCc.deploy(initialOwner, ethUsdPriceFeedAddress, usdToColonRate);

  await crcc.deployed();
  console.log("Costa Rica Colon Crypto deployed to:", crcc.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
