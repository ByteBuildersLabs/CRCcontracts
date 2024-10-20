async function main() {
  // Configuración de las direcciones y parámetros
  const initialOwner = "0xf89bf5Dad545572362d119B0E5b3af4cF08f1C3b";  // Sustituye con la dirección del propietario inicial
  const ethUsdPriceFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306"; // Direccion del feed de precios de Chainlink (por ejemplo en Goerli)
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
