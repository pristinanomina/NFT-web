var ERC721Token = artifacts.require("./ERC721Token.sol");
var Board = artifacts.require("./Board.sol");

module.exports = function (deployer) {
  const name = "Membership NFT";
  const symbol = "NFT";
  deployer.deploy(ERC721Token, name, symbol);
  deployer.deploy(Board);
};
