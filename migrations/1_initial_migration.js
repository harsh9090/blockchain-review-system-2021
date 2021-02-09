const Migrations = artifacts.require("myContract");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
