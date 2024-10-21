async function main() {
  // Configuración de las direcciones y parámetros
  const initialOwner = "0xf89bf5Dad545572362d119B0E5b3af4cF08f1C3b";  // Sustituye con la dirección del propietario inicial
  const ethUsdPriceFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306"; // Direccion del feed de precios de Chainlink (por ejemplo en Sepolia)
  const usdToColonRate = 512;  // Ejemplo de tasa de conversión USD a Colones

  // Obtener la fábrica del contrato
  const CRCc = await ethers.getContractFactory("CostaRicaColonCrypto");

  // Desplegar el contrato con los parámetros del constructor
  const crcc = await CRCc.deploy(initialOwner, ethUsdPriceFeedAddress, usdToColonRate);

  // Esperar a que la transacción de despliegue se mine (compatible con ethers v6)
  await crcc.waitForDeployment();

  console.log("Costa Rica Colon Crypto deployed to:", crcc.target); // Use `crcc.target` in ethers v6 for contract address
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
});
