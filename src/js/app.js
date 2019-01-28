(async function(window){
  const App = {
    async initWeb3() {
      const provider = Web3.givenProvider || "http://localhost:8545";
      App.web3 = new Web3(provider);
    },

    async initGreeter() {
      const greeterResponse = await fetch("Greeter.json");
      const greeterJSON = await greeterResponse.json();

      const Greeter = await new App.web3.eth.Contract(
        greeterJSON.abi, 
        "0x33C152444A23Ab8bA4Ac48b13F982fe5e63f60B8"
      );

      App.Greeter = Greeter;
    },

    updateGreeting: async function() {
      const header = document.querySelector(".current-greeting header");
      const greeting = await App.Greeter.methods.greet().call();

      header.textContent = greeting;
    },

    bindFormSubmission: function() {
      const form = document.getElementById("set-greeting");
      form.onsubmit = App.handleFormSubmission;
    },

    handleFormSubmission: async function(event) {
      event.preventDefault();

      const greeting = this.querySelector("input[type=text]").value;
      const accounts = await App.web3.eth.getAccounts();

      const transaction = await App.Greeter.methods.setGreeting(greeting)
        .send({from: accounts[0]});

      await App.updateGreeting();

      this.reset();
    },

    init: async function() {
      await App.initWeb3();
      await App.initGreeter();
      await App.updateGreeting();

      App.bindFormSubmission();
    }
  }

  App.init();

  window.App = App;
})(window);
