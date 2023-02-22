// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

pragma solidity >=0.7.0 <0.9.0;

contract ERC721Token is ERC721URIStorage, ERC721Enumerable {
event tradeLog(address owner, address sender, uint256 tokenId, uint256 price, uint256 time);

function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    function minting(string memory _tokenURI) public {

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function transfer(address from, address to, uint256 _tokenId) public payable {
        
        transferFrom(from, to, _tokenId);
    }  

    mapping(uint256 => uint256) public TokenPrice;
    uint256[] public onSaleArray;

    function tokenSale(uint256 _tokenId, uint256 _price) public {
        address TokenOwner = ownerOf(_tokenId);

        require(TokenOwner == msg.sender, "not token owner");
        require(_price > 0, "price error");
        require(TokenPrice[_tokenId] == 0, "on sale");

        TokenPrice[_tokenId] = _price;
        onSaleArray.push(_tokenId);
    }

    function tokenBuy(uint256 _tokenId) public payable {
        uint256 price = TokenPrice[_tokenId];
        address TokenOwner = ownerOf(_tokenId);

        require(price > 0, "not on sale");
        require(price <= msg.value, "not enough ETH");
        require(TokenOwner != msg.sender, "owner can't buy");

        payable(TokenOwner).transfer(msg.value);
        _transfer(TokenOwner, msg.sender, _tokenId);

        emit tradeLog(TokenOwner, msg.sender, _tokenId, msg.value, block.timestamp);
        TokenPrice[_tokenId] = 0;

        for(uint256 i =0; i<onSaleArray.length; i++) {
            if (TokenPrice[onSaleArray[i]] == 0) {
                onSaleArray[i] = onSaleArray[onSaleArray.length - 1];
                onSaleArray.pop();
            }
        }
    }

    function onSaleArrayLength() view public returns (uint256) {
        return onSaleArray.length;
    }
}
