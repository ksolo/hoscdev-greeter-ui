(function(window){
  class App {
    constructor() {
      this.initWeb3()
    }

    async initWeb3() {
      // modern browsers use the ethereum provider
      if (window.ethereum) {
        this.web3Provider = window.ethereum;
        try {
          await this.web3Provider.enable();
        } catch(error) {
          console.error("User denied account access");
        }
      }
      else if (window.web3) {
        this.web3Provider = window.web3.curentProvider;
      }
      else {
        this.web3Provder = new Web3.providers.HttpProvider("http://localhost:8545");
      }
      window.web3 = new Web3(this.web3Provder);
    }
  }
}(window)
