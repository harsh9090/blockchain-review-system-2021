pragma solidity ^0.5.16;
contract MyContract{
    
    struct reviewFile{
        uint noOfReviews;
        uint rating; // should be a number between 0 to 100
        string reviewFile_hash;
    }
    
    struct review{
        address reviewer;
        string review_hash;
    }
    
    string[] public products; //stores name of product in array
    byte[46][5] latest5Reviews;
    byte[46][5] latest5Products;
    uint[5] last5ReviewRank;
    uint[5] last5ProductRank;
    mapping(address => string) users; // stores hash of userdetails file with metmask address
    mapping(string => string) product_hash;
    address payable owner;
    mapping(string => reviewFile) reviewFileByProduct; //mapping from product to review
    mapping(string => review[]) reviewsByProduct; //mapping from product to user to review
    mapping(address => string[]) reviewerToProduct; //mapping from reviewer to product which is reviewed by reviewer
    mapping(address => string[]) reviewerToReview; //store reviews which are given by reviewer
    mapping(address => string[]) ownerToProduct; //store products which are uploaded by owner
    uint ipfs_length=46;
    mapping(address => uint) points;
    uint balanceRequiredForProductOwner;
    uint balanceRequiredForReviewr;
    uint8 pointsPerReview;
    uint public totalProduct;
    uint public totalReview;
    
    event Reviewstored(string);
    // event check_ij(uint,uint);
    
    modifier onlyOwner{
        require(msg.sender == owner);// Only allow owner to delete a product
        _;
    }
    
    constructor() payable public{
       owner = msg.sender;
       totalReview = 0;
       totalProduct = 0;
       for(uint i=0;i<5;i++){
            last5ReviewRank[i]=5;
            last5ProductRank[i]=5;
       }
       pointsPerReview = 25;
    }
    
    function change_ipfs_length(uint8 _length) public {
        ipfs_length=_length;
    }
    
    function getProductHash(string memory name) public view returns(string memory){
        return product_hash[name];
    }
    
    function getBalance() public view returns(uint){
        return address(this).balance;
    }
    
    function getProductLength() public view returns(uint){
        return products.length;
    }
    
    function getUserProfile() public view returns(string memory){
        return users[msg.sender];
    }
    
    function setUserProfile(string memory userDetailFileHash) public {
        users[msg.sender] = userDetailFileHash;
    }
    
    function setBalanceRequiredForProductOwner(uint value) public{ //access modifier need to be set onlyOwner
        balanceRequiredForProductOwner = value;
    }
    
    function setBalanceRequiredForReviewr(uint value) public{ //access modifier need to be set onlyOwner
        balanceRequiredForReviewr = value;
    }
    
    function setPointsPerReview(uint8 value) public{ //access modifier need to be set onlyOwner
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
    
    function addProductHashToLatest5(string memory _product_hash) private {
        for(uint i=0;i<5;i++)
            last5ProductRank[i]++;
        for(uint i=0;i<5;i++){
            if(last5ProductRank[i] <= 5)
                continue;
            bytes memory b = bytes(_product_hash);
            for(uint j=0;j<46;j++)
                latest5Products[i][j]=b[j];
            last5ProductRank[i]=1;
            break;
        }
    }
    
    function addProduct(string memory _product_name,string memory _ipfs_hash) public payable{
        require(msg.value >= balanceRequiredForProductOwner,"insufficient balance"); // just to save network from fraud products some nominal amount
        require(bytes(_ipfs_hash).length == ipfs_length,"Invalid hash");
        products.push(_product_name);
        product_hash[_product_name]=_ipfs_hash;
        addProductHashToLatest5(_ipfs_hash);
        ownerToProduct[msg.sender].push(_ipfs_hash);
        totalProduct++;
    }
    
    function deleteProduct(string memory ipfs_hash) public onlyOwner{
        for(uint i=0;i<products.length;i++){
            if(keccak256(bytes(products[i])) == keccak256(bytes(ipfs_hash))){
                products[i]=products[products.length-1];
                delete products[products.length-1];
            }
        }
    }
    
    function getLatest5Products() public view returns(byte[46][5] memory){
        return latest5Products;
    }
    
    function getAllProductsUploadedByUser() public view returns(byte[46][] memory){
        address sender = msg.sender;
        string[] memory temp = ownerToProduct[sender];
        uint length=temp.length;
        byte[46][] memory productsOfUser = new byte[46][](length);
        for(uint i=0;i<length;i++){
            bytes memory b = bytes(temp[i]);
            for(uint j=0;j<46;j++)
                productsOfUser[i][j] = b[j];
        }
        return productsOfUser;
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
    
    function addReviewHashToLatest5(string memory _review_hash) private {
        for(uint i=0;i<5;i++)
            last5ReviewRank[i]++;
        for(uint i=0;i<5;i++){
            if(last5ReviewRank[i] <= 5)
                continue;
            bytes memory b = bytes(_review_hash);
            for(uint j=0;j<46;j++)
                latest5Reviews[i][j]=b[j];
            last5ReviewRank[i]=1;
            break;
        }
    }
    
    function addReview(string memory _product_name,string memory _reviewFile_hash,string memory _review_hash,uint _rating) public {
        //balance need to check in front_end
        require(bytes(_review_hash).length == ipfs_length,"Invalid hash of review");
        require(bytes(_reviewFile_hash).length == ipfs_length,"Invalid hash of reviewfile");
        require(bytes(product_hash[_product_name]).length > 0,"This product does not exist");
        uint current_rating = reviewFileByProduct[_product_name].rating;
        uint length=reviewsByProduct[_product_name].length;
        uint updated_rating = (current_rating*length + _rating)/(length+1);
        reviewFile memory temp = reviewFile(reviewFileByProduct[_product_name].noOfReviews+1,updated_rating,_reviewFile_hash);
        reviewFileByProduct[_product_name]=temp;
        reviewsByProduct[_product_name].push(review(msg.sender,_review_hash));
        addReviewHashToLatest5(_review_hash);
        points[msg.sender] += pointsPerReview;
        reviewerToProduct[msg.sender].push(_product_name);
        reviewerToReview[msg.sender].push(_review_hash);
        totalReview++;
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
    
    function getAllReviewsGivenByUser() public view returns(byte[46][] memory){
        address sender = msg.sender;
        string[] memory temp = reviewerToReview[sender];
        uint length=temp.length;
        byte[46][] memory reviewsOfUser = new byte[46][](length);
        for(uint i=0;i<length;i++){
            bytes memory b = bytes(temp[i]);
            for(uint j=0;j<46;j++)
                reviewsOfUser[i][j] = b[j];
        }
        return reviewsOfUser;
    }
    
    function getLatest5Reviews() public view returns(byte[46][5] memory){
       return latest5Reviews; 
    }
    
    function getPointsOfUser() public view returns(uint){
        return points[msg.sender];
    }
    
    function redeemPrice() public returns(string memory){
        require(points[msg.sender] >= 100,"Insufficient funds");
        points[msg.sender] -= 100;
        return("A coupen code");
    }
}