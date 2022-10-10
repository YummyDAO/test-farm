import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/mediaQuery.css';
//import { Pool1 } from "./components/LoadingIndicator";
import twitterLogo from './assets/puffy_logo.png';
import {ethers} from "ethers";
import contractAbi from './utils/StakingRewards.json';
import lpcontractAbi1 from './utils/UniswapV2ERC20.json';//change to real abi
import pairAbi from './utils/UniswapV2ERC20.json';
//import polygonLogo from './assets/polygonlogo.png';
//import ethLogo from './assets/ethlogo.png';
//import { networks } from './utils/networks';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

// Constants
//const TWITTER_HANDLE = 'blackluv10';
//const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
//const tld = '.learnweb3dao';
const CONTRACT_ADDRESS = '0xDc5C5eFb38E74a94149c9bC03b739D6758397b4F';//puffy/ethw
const CONTRACT_ADDRESS2 = '0x0aC8F437A5A2454B7A7cdfF3606a1198a35374CD';//realp/ethw
const CONTRACT_ADDRESS3 = '0x54a01C3d84c9100e525E852c67Ac93DBEde54CFE';//hex/usdw
const CONTRACT_ADDRESS4 = '0x4F12bD0a1A1C63f2C60d84BD95DAc0E06F814AC4';//lfg/usdw  ... //change to lfg
const lpCONTRACT_ADDRESS1 = '0x9105de8cabaaee7192724b20baea4668e666e9db';//change to real lp address
const lpCONTRACT_ADDRESS2='0xf50bf8195c72dfd49fff75d39aed0fd92f706c35';
const lpCONTRACT_ADDRESS3='0x6C06f81AaFffc4Fb6552ee6f73bc5c42e7DDc85a';
//const lpCONTRACT_ADDRESS3='';
const pairCONTRACT_ADDRESS ='0x9105de8cabaaee7192724b20baea4668e666e9db';
const pairCONTRACT_ADDRESS2 ='0xf50bf8195c72dfd49fff75d39aed0fd92f706c35';
const pairCONTRACT_ADDRESS3 ='0x6C06f81AaFffc4Fb6552ee6f73bc5c42e7DDc85a';
//const pairCONTRACT_ADDRESS4 ='';

/*const OpenSeaLink = (props) => {
	return (
		<a className="link" href={`https://testnets.opensea.io/assets/mumbai/${props.contract}/${props.mintId}`} target="_blank" rel="noopener noreferrer">
			<p className="underlined">{' '}{props.linkName}{' '}</p>
		</a>
	);
}*/

const App = () => {

	const [currentAccount, setCurrentAccount] = useState('');
	// Add some state data propertie
	//const [domain, setDomain] = useState('');
	//const [record, setRecord] = useState('');
	//const [network, setNetwork] = useState('');
	//const [editing, setEditing] = useState(false);
	//const [mints, setMints] = useState([]);
	//const [loading, setLoading] = useState(false);
	const [lpbal1, setlpbal1] = useState('');
	const [lpbal2, setlpbal2] = useState('');
	const [lpbal3, setlpbal3] = useState('');
	const [lpbal4, setlpbal4] = useState('');
	const [earned1, setearned1] = useState('');
	const [earned2, setearned2] = useState('');
	const [earned3, setearned3] = useState('');
	const [earned4, setearned4] = useState('');
	const [contract1, setcontract1] = useState('');
	const [contract2, setcontract2] = useState('');
	const [contract3, setcontract3] = useState('');
	const [contract4, setcontract4] = useState('');
	const [show, setShow] = useState(false);
	const [value, setValue] = useState('');
	console.log(value);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	};

	const switchNetwork = async () => {
		if (window.ethereum) {
			try {
				// Try to switch to the Mumbai testnet
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
				});
			} catch (error) {
				// This error code means that the chain we want has not been added to MetaMask
				// In this case we ask the user to add it to their MetaMask
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{	
									chainId: '0x13881',
									chainName: 'Polygon Mumbai Testnet',
									rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
									nativeCurrency: {
											name: "Mumbai Matic",
											symbol: "MATIC",
											decimals: 18
									},
									blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
								},
							],
						});
					} catch (error) {
						console.log(error);
					}
				}
				console.log(error);
			}
		} else {
			// If window.ethereum is not found then MetaMask is not installed
			alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
		} 
	};

	/*const checkIfWalletIsConnected = async () => {
		// First make sure we have access to window.ethereum
		const { ethereum } = window;
	
		if (!ethereum) {
			console.log("Make sure you have MetaMask!");
			return;
		} else {
			console.log("We have the ethereum object", ethereum);
		}

		// Check if we're authorized to access the user's wallet
		const accounts = await ethereum.request({ method: 'eth_accounts' });

		// Users can have multiple authorized accounts, we grab the first one if its there!
		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}

		// This is the new part, we check the user's network chain ID
		const chainId = await ethereum.request({ method: 'eth_chainId' });
		setNetwork(networks[chainId]);
		
		ethereum.on('chainChanged', handleChainChanged);
				
		// Reload the page when they change networks
		function handleChainChanged(_chainId) {
		window.location.reload();
		}
	};*/

	const Stake = async () => {
		// Don't run if the domain is empty
		//if (!domain) { return }
		// Alert the user if the domain is too short
		//if (domain.length < 3) {
			//alert('Domain must be at least 3 characters long');
			//return;
		//}
		// Calculate price based on length of domain (change this to match your contract)	
		// 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
		//const price = domain.length === 3 ? '0.3' : domain.length === 5 ? '0.5' : '0.2';
		//console.log("Minting domain", domain, "with price", price);
	  try {
		const { ethereum } = window;
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.stake(value);
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);//change to oklink
					
					// Set the record for the domain
					//tx = await contract.setDetails (domain, record);
					//await tx.wait();
	
					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					// Call fetchMints after 2 seconds
				    //setTimeout(() => {
					    //fetchMints();
				    //}, 5000);
					
					//setRecord('');
					//setDomain('');
				}
				else {
					alert("Transaction failed! Please try again");
				}
		}
	  }
	  catch(error){
		console.log(error);
	  }
	};	



	const Unstake = async () => {
		// Don't run if the domain is empty
		//if (!domain) { return }
		// Alert the user if the domain is too short
		//if (domain.length < 3) {
			//alert('Domain must be at least 3 characters long');
			//return;
		//}
		// Calculate price based on length of domain (change this to match your contract)	
		// 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
		//const price = domain.length === 3 ? '0.3' : domain.length === 5 ? '0.5' : '0.2';
		//console.log("Minting domain", domain, "with price", price);
	  try {
		const { ethereum } = window;
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.withdraw(value);
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);//change to oklink
					
					// Set the record for the domain
					//tx = await contract.setDetails (domain, record);
					//await tx.wait();
	
					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					// Call fetchMints after 2 seconds
				    //setTimeout(() => {
					    //fetchMints();
				    //}, 5000);
					
					//setRecord('');
					//setDomain('');
				}
				else {
					alert("Transaction failed! Please try again");
				}
		}
	  }
	  catch(error){
		console.log(error);
	  }
	};

	const Withdrawreward = async () => {
		// Don't run if the domain is empty
		//if (!domain) { return }
		// Alert the user if the domain is too short
		//if (domain.length < 3) {
			//alert('Domain must be at least 3 characters long');
			//return;
		//}
		// Calculate price based on length of domain (change this to match your contract)	
		// 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
		//const price = domain.length === 3 ? '0.3' : domain.length === 5 ? '0.5' : '0.2';
		//console.log("Minting domain", domain, "with price", price);
	  try {
		const { ethereum } = window;
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.getReward();
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);//change to oklink
					
					// Set the record for the domain
					//tx = await contract.setDetails (domain, record);
					//await tx.wait();
	
					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					// Call fetchMints after 2 seconds
				    //setTimeout(() => {
					    //fetchMints();
				    //}, 5000);
					
					//setRecord('');
					//setDomain('');
				}
				else {
					alert("Transaction failed! Please try again");
				}
		}
	  }
	  catch(error){
		console.log(error);
	  }
	};

	//async function getapproval1() {
		//try {
			//const { ethereum } = window;
			//if (ethereum) {
				//const provider = new ethers.providers.Web3Provider(ethereum);
				//const signer = provider.getSigner();
				//console.log(signer);
				//const contract = new ethers.Contract(pairCONTRACT_ADDRESS, pairAbi.abi, signer);
	
				//let tx = await contract.approve("0xDc5C5eFb38E74a94149c9bC03b739D6758397b4F", 1000);
				//await tx.wait();
				//console.log(tx)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			//}
		  //} catch(error) {
			//console.log(error);
		  //}
	//}

	const Approve1 = async () => {
		// Don't run if the domain is empty
		//if (!domain) { return }
		// Alert the user if the domain is too short
		//if (domain.length < 3) {
			//alert('Domain must be at least 3 characters long');
			//return;
		//}
		// Calculate price based on length of domain (change this to match your contract)	
		// 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
		//const price = domain.length === 3 ? '0.3' : domain.length === 5 ? '0.5' : '0.2';
		//console.log("Minting domain", domain, "with price", price);
	  try {
		const { ethereum } = window;
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(pairCONTRACT_ADDRESS, pairAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
		  //let tx = await contract.stake(value);
		  let tx = await contract.approve(CONTRACT_ADDRESS, 1000);
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);//change to oklink
					
					// Set the record for the domain
					//tx = await contract.setDetails (domain, record);
					//await tx.wait();
	
					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					// Call fetchMints after 2 seconds
				    //setTimeout(() => {
					    //fetchMints();
				    //}, 5000);
					
					//setRecord('');
					//setDomain('');
				}
				else {
					alert("Transaction failed! Please try again");
				}
		}
	  }
	  catch(error){
		console.log(error);
	  }
	};


	const Fetchearnings1 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
	
				let tx = contract.earned(signer.address);
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setearned1('')
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};
	const lpbalance1 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(lpCONTRACT_ADDRESS2, lpcontractAbi1.abi, signer);//change to lp address
	
				let tx = contract.balanceOf(signer.address);
				console.log(tx);
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setlpbal1('tx')
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};
	const Stakedbalance1 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
	
				let tx = contract.balanceOf(signer.address);
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setcontract1('')
				console.log(tx)
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};

	useEffect(() => {
		Fetchearnings1()
		Stakedbalance1()
	})

	/*useEffect(() => {
		fetchMints()
	}*/

  return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<header>
                        <div className="left">
							<img alt='logo' src={twitterLogo} className="puffylogo"/>
                            <p className="title">Puffy Farm</p>
                        </div>
						<div className="right">
							{ currentAccount ? <p> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p> : 						<Button  onClick={connectWallet }>
                            Connect wallet
                       </Button>}
						</div>
					</header>
					<div style={{display: "flex", width:'100%', justifyContent: "center", alignItems:"center", borderRadius:"15px"}} className="outline">
            <p style={{width:"16%", textAlign:"center", fontSize:"1.3rem", fontWeight:"500"}} className="out">Image</p>
            <p style={{width:"16%", textAlign:"center", fontSize:"1.3rem", fontWeight:"500"}} className="out">Name</p>
            <p style={{width:"16%", textAlign:"center", fontSize:"1.3rem", fontWeight:"500"}} className="out">Apr</p>
            <p style={{width:"16%", textAlign:"center", fontSize:"1.3rem", fontWeight:"500"}} className="out">Rate/Day</p>
            <p style={{width:"16%", textAlign:"center", fontSize:"1.3rem", fontWeight:"500"}} className="out">staked</p>
            <p style={{width:"16%", textAlign:"center", fontSize:"1.3rem", fontWeight:"500"}} className="out">Earned</p>
			<p style={{width:"16%", textAlign:"center", fontSize:"1.3rem", fontWeight:"500"}} className="out"></p>
          </div>
          <div style={{display: "flex", width:'100%', justifyContent: "center", alignItems:"center", background:"white", borderRadius:"15px", padding:"20px", boxShadow:"4px 2px 5px 0px rgb(0 0 0 / 48%)"}} className="outline">
		  <img style={{width:"16%", textAlign:"center"}} alt='pairimage' className="out"/>
            <p style={{width:"16%", textAlign:"center"}} className="out">PUFFY/ETHW</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">Apr</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">160,000</p>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {earned1 ? <p >{earned1}</p>: 0}
			</div>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {contract1 ? <p>{contract1}</p>: 0}
			</div>
            <Button variant="primary" onClick={handleShow} className="out">Manage</Button>
            <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Puffy/Ethw pair staking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="number" name='stakeamount' placeholder='Enter stake amount...' onChange={e => setValue(e.target.value)}/>
          <p>Your returns in one year would be equals to</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Stake}>
            Stake
          </Button>
          <Button variant="primary" onClick={Approve1}>
            Approve Puff lp
          </Button>
          <Button variant="secondary" onClick={Unstake}>
            Unstake
          </Button>
          <Button variant="secondary" onClick={Withdrawreward}>
            Harvest
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
				</div>
			</div>
		</div>
	);
}

export default App;
