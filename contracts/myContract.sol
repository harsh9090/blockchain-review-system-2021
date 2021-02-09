pragma solidity ^0.5.16;
contract MyContract{
    
    struct reviewFile{
        uint rating;
        string reviewFile_hash;
    }
    
    struct review{
        address reviewer;
        string review_hash;
    }
    
    string[] public products; //stores name of product in array
    mapping(string => string) product_hash;
    address payable owner;
    mapping(string => reviewFile) reviewFileByProduct; //mapping from product to review
    mapping(string => review[]) reviewsByProduct; //mapping from product to user to review
    mapping(address => string[]) reviewerToProduct;
    uint ipfs_length=46;
    mapping(address => uint) points;
    uint balanceRequiredForProductOwner;
    uint balanceRequiredForReviewr;
    uint8 pointsPerReview;
    
    event Reviewstored(string);
    // event check_ij(uint,uint);
    
    modifier onlyOwner{
        require(msg.sender == owner);// Only allow owner to delete a product
        _;
    }
    
    constructor() payable public{
       owner = msg.sender;
    }
    
    function change_ipfs_length(uint8 _length) public {
        ipfs_length=_length;
    }
    
    function getProductHash(uint index) public view returns(string memory){
        return product_hash[products[index]];
    }
    
    function getBalance() public view returns(uint){
        return address(this).balance;
    }
    
    function getProductLength() public view returns(uint){
        return products.length;
    }
    
    function setBalanceRequiredForProductOwner(uint value) public{
        balanceRequiredForProductOwner = value;
    }
    
    function setBalanceRequiredForReviewr(uint value) public{
        balanceRequiredForReviewr = value;
    }
    
    function setPointsPerReview(uint8 value) public{
        pointsPerReview = value;
    }
    
    function getBalanceRequiredForProductOwner() public view returns(uint){
        return balanceRequiredForProductOwner;
    }
    
    function getBalanceRequiredForReviewr() public view returns(uint){
        return balanceRequiredForReviewr;
    }
    
    function getPointsPerReview() public view returns(uint){
        return pointsPerReview;
    }
    
    function getProducts() public view returns(byte[46][] memory){
        uint length=products.length;
        byte[46][] memory productHash = new byte[46][](length);
        for(uint i=0;i<length;i++){
            byte[46] memory temp;
            bytes memory product_hash_inBytes = bytes(product_hash[products[i]]);
            for(uint j=0;j<46;j++){
                temp[j]=product_hash_inBytes[j];
            }
            productHash[i]=temp;
        }
        return productHash;
    }
    
    function addProduct(string memory _product_name,string memory _ipfs_hash) public payable{
        require(msg.value >= balanceRequiredForProductOwner,"insufficient balance"); // just to save network from fraud products some nominal amount
        require(bytes(_ipfs_hash).length == ipfs_length,"Invalid hash");
        products.push(_product_name);
        product_hash[_product_name]=_ipfs_hash;
    }
    
    function deleteProduct(string memory ipfs_hash) public onlyOwner{
        for(uint i=0;i<products.length;i++){
            if(keccak256(bytes(products[i])) == keccak256(bytes(ipfs_hash))){
                products[i]=products[products.length-1];
                delete products[products.length-1];
            }
        }
    }
    
    function checkIfAlreadyReviewed(string memory _product_name) public view returns(bool){
        string[] memory temp=reviewerToProduct[msg.sender];
        bytes memory b = bytes(_product_name);
        for(uint i=0;i<temp.length;i++){
            bytes memory c = bytes(temp[i]);
            if(keccak256(c) == keccak256(b))
                return true;
        }
        return false;
    }
    
    function addReview(string memory _product_name,string memory _reviewFile_hash,string memory _review_hash,uint _rating) public {
        //balance need to check in front_end
        require(bytes(_review_hash).length == ipfs_length,"Invalid hash of review");
        require(bytes(_reviewFile_hash).length == ipfs_length,"Invalid hash of reviewfile");
        require(bytes(product_hash[_product_name]).length > 0,"This product does not exist");
        uint current_rating = reviewFileByProduct[_product_name].rating;
        uint length=reviewsByProduct[_product_name].length;
        uint updated_rating = (current_rating*length + _rating)/(length+1);
        reviewFile memory temp = reviewFile(updated_rating,_reviewFile_hash);
        reviewFileByProduct[_product_name]=temp;
        reviewsByProduct[_product_name].push(review(msg.sender,_review_hash));
        points[msg.sender] += pointsPerReview;
        reviewerToProduct[msg.sender].push(_product_name);
        emit Reviewstored("Review stored");
    }
    
    
    function getProductReviewFile(string memory _product_name) public view returns(string memory,uint){
        return (reviewFileByProduct[_product_name].reviewFile_hash,reviewFileByProduct[_product_name].rating);
    }
    
    function getAllTheReviewsForProduct(string memory _product_name) public view returns(byte[46][] memory,address[] memory){
        uint length=reviewsByProduct[_product_name].length;
        byte[46][] memory reviewsOfProduct = new byte[46][](length);
        address[] memory reviewers = new address[](length);
        for(uint i=0;i<length;i++){
            byte[46] memory temp;
            bytes memory review_hash_inBytes = bytes(reviewsByProduct[_product_name][i].review_hash);
            reviewers[i] = (reviewsByProduct[_product_name][i].reviewer);
            for(uint j=0;j<46;j++){
                temp[j]=review_hash_inBytes[j];
            }
            reviewsOfProduct[i]=temp;
        }
        return(reviewsOfProduct,reviewers);
    }
    
    function redeemPrice() public returns(string memory){
        require(points[msg.sender] >= 100,"Insufficient funds");
        points[msg.sender] -= 100;
        return("A coupen code");
    }
}