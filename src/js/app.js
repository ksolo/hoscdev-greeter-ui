(async function(window){
  const App = {
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
      this.web3 = new Web3(this.web3Provder);
      window.App = this;
    },

    async initGreeter() {
      const greeterResponse = await fetch("Greeter.json");
      const greeterJSON = await greeterResponse.json();
      const Greeter = await new App.web3.eth.Contract(
        greeterJSON.abi, 
        "0xBC8fe471027f75971351b35956A3e8b29D75F9De"
      );

      Greeter.setProvider(App.web3Provder);
      window.Greeter = Greeter;
    }
  }

  await App.initWeb3();
  await App.initGreeter();
})(window);
