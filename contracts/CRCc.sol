// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/// @custom:security-contact security@freerunner.org
contract CostaRicaColonCrypto is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    AggregatorV3Interface internal ethUsdPriceFeed;
    uint256 public usdToColonRate;  // Manual input or updated with an oracle if available.

    event USDToColonRateUpdated(uint256 newRate);

    constructor(
        address initialOwner,
        address _ethUsdPriceFeedAddress,
        uint256 _usdToColonRate
    ) ERC20("Costa Rica Colon Crypto", "CRCc") Ownable(initialOwner) {
        ethUsdPriceFeed = AggregatorV3Interface(_ethUsdPriceFeedAddress);
        usdToColonRate = _usdToColonRate;
    }

    receive() external payable {
        revert("Direct ETH transfers not allowed. Use mintWithETH().");
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function updateUSDToColonRate(uint256 newRate) external onlyOwner {
        require(newRate > 0, "Rate must be positive.");
        usdToColonRate = newRate;
        emit USDToColonRateUpdated(newRate);
    }

    function getLatestETHPriceInUSD() public view returns (uint256) {
        (
            , // roundID
            int256 price,
            , // startedAt
            , // updatedAt
            // answeredInRound
        ) = ethUsdPriceFeed.latestRoundData();
        require(price > 0, "Invalid ETH price from oracle.");
        return uint256(price); // ETH/USD price with 8 decimals.
    }

    function calculateCRCForETH(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPriceInUSD = getLatestETHPriceInUSD();
        uint256 ethAmountInUSD = (ethAmount * ethPriceInUSD) / 1e18; // Adjust for ETH decimals.
        uint256 crcAmount = (ethAmountInUSD * usdToColonRate) / 1e8; // Adjust for USD price decimals.
        return crcAmount;
    }

    function mintWithETH() external payable {
        require(msg.value > 0, "ETH amount must be greater than zero.");

        uint256 crcToMint = calculateCRCForETH(msg.value);
        _mint(msg.sender, crcToMint);
    }


    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // The following functions are overrides required by Solidity.
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
