import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Servers from "./components/Servers";
import Channels from "./components/Channels";
import Messages from "./components/Messages";

// ABIs
import Dappcord from "./abis/Dappcord.json";

// Config
import config from "./config.json";
import { network } from "hardhat";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappcord, setDappcord] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = provider.getNetwork();
    const dappcord = new ethers.Contract(
      config[network].Dappcord.address,
      Dappcord,
      provider
    );
    setDappcord(dappcord);

    console.log(dappcord.address, 123);

    window.ethereum.on("accountsChanged", async () => {
      window.location.reload();
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <main>
        <Servers />
        <Channels />
        <Messages />
      </main>
    </div>
  );
}

export default App;
