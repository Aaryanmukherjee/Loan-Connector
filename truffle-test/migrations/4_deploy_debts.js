const Debts = artifacts.require("Debts");

module.exports = function (deployer) {
  deployer.deploy(Debts);
};
