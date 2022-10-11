import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/mediaQuery.css';
//import { Pool1 } from "./components/LoadingIndicator";
import twitterLogo from './assets/puffy_logo.png';
import lp1 from './assets/lp1.png';
import lp2 from './assets/lp2.png';
import lp3 from './assets/lp3.png';
import lp4 from './assets/lp4.png';
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
const CONTRACT_ADDRESS4 = '0x3c914a5c6F1DcC3c9F1277499868b0297F0B749d';//lfg/usdw  ... //change to lfg
const lpCONTRACT_ADDRESS1 = '0x9105de8cabaaee7192724b20baea4668e666e9db';//change to real lp address
const lpCONTRACT_ADDRESS2='0xf50bf8195c72dfd49fff75d39aed0fd92f706c35';
const lpCONTRACT_ADDRESS3='0x6C06f81AaFffc4Fb6552ee6f73bc5c42e7DDc85a';
const lpCONTRACT_ADDRESS4='0x18Ac5Ab2F1f068EE6bAD555961997E2C62433c56';
const pairCONTRACT_ADDRESS ='0x9105de8cabaaee7192724b20baea4668e666e9db';
const pairCONTRACT_ADDRESS2 ='0xf50bf8195c72dfd49fff75d39aed0fd92f706c35';
const pairCONTRACT_ADDRESS3 ='0x6C06f81AaFffc4Fb6552ee6f73bc5c42e7DDc85a';
const pairCONTRACT_ADDRESS4 ='0x18Ac5Ab2F1f068EE6bAD555961997E2C62433c56';

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
	const [show1, setShow1] = useState(false);
	const [value, setValue] = useState('');
	console.log(value);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleClose1 = () => setShow(false);
	const handleShow1 = () => setShow(true);
	const default1 = '1000000';

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

	const modal1 = async () => {
		var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
	};

	const modal2 = async () => {
		var modal = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close1")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
	};

	const modal3 = async () => {
		var modal = document.getElementById("myModal3");

// Get the button that opens the modal
var btn = document.getElementById("myBtn3");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
	}

	const checkIfWalletIsConnected = async () => {
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
	};


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
		  let amount = ethers.utils.parseUnits(value.toString(), "ether");
	
				console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.stake(amount);
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
	
	const stake2 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS2, contractAbi.abi, signer);
		  let amount = ethers.utils.parseUnits(value.toString(), "ether");
	
				console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.stake(amount);
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
	
					//console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
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

	const stake3 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS3, contractAbi.abi, signer);
		  let amount = ethers.utils.parseUnits(value.toString(), "ether");
	
				console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.stake(amount);
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
	
					//console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
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
	
	const stake4 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS4, contractAbi.abi, signer);
		  let amount = ethers.utils.parseUnits(value.toString(), "ether");
	
				console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.stake(amount);
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
	
					//console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
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
				let amount = ethers.utils.parseUnits(value.toString(), "ether");
		  let tx = await contract.withdraw(amount);
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

	const Unstake2 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS2, contractAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
				let amount = ethers.utils.parseUnits(value.toString(), "ether");
		  let tx = await contract.withdraw(amount);
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

	const Unstake3 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS3, contractAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
				let amount = ethers.utils.parseUnits(value.toString(), "ether");
		  let tx = await contract.withdraw(amount);
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

	const Unstake4 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS4, contractAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
				let amount = ethers.utils.parseUnits(value.toString(), "ether");
		  let tx = await contract.withdraw(amount);
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

	const Withdrawreward2 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS2, contractAbi.abi, signer);
	
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

	const Withdrawreward3 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS3, contractAbi.abi, signer);
	
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

	const Withdrawreward4 = async () => {
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
		  const contract = new ethers.Contract(CONTRACT_ADDRESS4, contractAbi.abi, signer);
	
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
				let amount = ethers.utils.parseUnits(default1.toString(), "ether");
		  //let tx = await contract.stake(value);
		  let tx = await contract.approve(CONTRACT_ADDRESS, amount);
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

	const Approve2 = async () => {
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
		  const contract = new ethers.Contract(pairCONTRACT_ADDRESS2, pairAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
				let amount = ethers.utils.parseUnits(default1.toString(), "ether");
		  //let tx = await contract.stake(value);
		  let tx = await contract.approve(CONTRACT_ADDRESS2, amount);
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

	const Approve3 = async () => {
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
		  const contract = new ethers.Contract(pairCONTRACT_ADDRESS3, pairAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
				let amount = ethers.utils.parseUnits(default1.toString(), "ether");
		  //let tx = await contract.stake(value);
		  let tx = await contract.approve(CONTRACT_ADDRESS3, amount);
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

	const Approve4 = async () => {
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
		  const contract = new ethers.Contract(pairCONTRACT_ADDRESS4, pairAbi.abi, signer);
	
				console.log("Going to pop wallet now to pay gas...")
				let amount = ethers.utils.parseUnits(default1.toString(), "ether");
		  //let tx = await contract.stake(value);
		  let tx = await contract.approve(CONTRACT_ADDRESS4, amount);
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
				const address1 = currentAccount;
	
				let tx = await contract.earned(address1);
				console.log(tx)
				let newvalue = tx.toString();
				console.log(newvalue)
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setearned1(ethvalue1)
	
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
				const contract = new ethers.Contract(pairCONTRACT_ADDRESS, lpcontractAbi1.abi, signer);//change to lp address
				const address1 = currentAccount;
	
				let tx = await contract.balanceOf(address1);
				const newvalue = tx.toString();
				console.log(newvalue);
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue1)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setlpbal1(ethvalue1)
	
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
				const address1 = currentAccount;
	
				let tx = await contract.balanceOf(address1);
				let newvalue = tx.toString();
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue1)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setcontract1(ethvalue1)
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

	const Fetchearnings2 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS2, contractAbi.abi, signer);
				const address1 = currentAccount;
	
				let tx = await contract.earned(address1);
				console.log(tx)
				let newvalue = tx.toString();
				console.log(newvalue)
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setearned2(ethvalue1)
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};
	const lpbalance2 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(pairCONTRACT_ADDRESS2, lpcontractAbi1.abi, signer);//change to lp address
				const address1 = currentAccount;
	
				let tx = await contract.balanceOf(address1);
				const newvalue = tx.toString();
				console.log(newvalue);
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue1)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setlpbal2(ethvalue1)
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};

	const Stakedbalance2 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS2, contractAbi.abi, signer);
				const address1 = currentAccount;
	
				let tx = await contract.balanceOf(address1);
				let newvalue = tx.toString();
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue1)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setcontract2(ethvalue1)
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
	//////////////////////////////////////////
	const Fetchearnings3 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS3, contractAbi.abi, signer);
				const address1 = currentAccount;
	
				let tx = await contract.earned(address1);
				console.log(tx)
				let newvalue = tx.toString();
				console.log(newvalue)
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setearned3(ethvalue1)
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};
	const lpbalance3 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(pairCONTRACT_ADDRESS3, lpcontractAbi1.abi, signer);//change to lp address
				const address1 = currentAccount;
	
				let tx = await contract.balanceOf(address1);
				const newvalue = tx.toString();
				console.log(newvalue);
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue1)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setlpbal3(ethvalue1)
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};

	const Stakedbalance3 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS3, contractAbi.abi, signer);
				const address1 = currentAccount;
	
				let tx = await contract.balanceOf(address1);
				let newvalue = tx.toString();
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue1)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setcontract3(ethvalue1)
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
	////////////////////////////////
	const Fetchearnings4 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS4, contractAbi.abi, signer);
				const address1 = currentAccount;
	
				let tx = await contract.earned(address1);
				console.log(tx)
				let newvalue = tx.toString();
				console.log(newvalue)
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setearned4(ethvalue1)
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};
	const lpbalance4 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(pairCONTRACT_ADDRESS4, lpcontractAbi1.abi, signer);//change to lp address
				const address1 = currentAccount;
	
				let tx = await contract.balanceOf(address1);
				const newvalue = tx.toString();
				console.log(newvalue);
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue1)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setlpbal4(ethvalue1)
	
				//fetchMints();
				//setRecord('');
				//setDomain('');
			}
		  } catch(error) {
			console.log(error);
		  }
		//setLoading(false);
	};

	const Stakedbalance4 = async () => {
		//if (!record || !domain) { return }
		//setLoading(true);
		//console.log("Updating domain", domain, "with record", record);
		//add eth pair here
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS4, contractAbi.abi, signer);
				const address1 = currentAccount;
	
				let tx = await contract.balanceOf(address1);
				let newvalue = tx.toString();
				const ethvalue = ethers.utils.formatEther(newvalue)
				const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
				console.log(ethvalue1)
				//console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
				setcontract4(ethvalue1)
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
		checkIfWalletIsConnected();
	}, [])

	useEffect(() => {
		setTimeout(() => {
		Fetchearnings1()
		Stakedbalance1()
		lpbalance1()
		Fetchearnings2()
		Stakedbalance2()
		lpbalance2()
		Fetchearnings3()
		Stakedbalance3()
		lpbalance3()
		Fetchearnings4()
		Stakedbalance4()
		lpbalance4()
		modal1()
		modal2()
		modal3()
		}, 5000)
	}, [Fetchearnings1, Stakedbalance1])

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
		  <div style={{display: "flex", width:'100%', justifyContent: "center", alignItems:"center", background:"white", borderRadius:"15px", padding:"20px", boxShadow:"4px 2px 5px 0px rgb(0 0 0 / 48%)"}} className="outline outline1">
		    <div style={{width:"16%", textAlign:"center"}} className="out"><img  alt='pairimage' src={lp1}/></div>
            <p style={{width:"16%", textAlign:"center"}} className="out">PUFFY/ETHW</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">8400%</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">160,000</p>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {contract1 ? <p>{contract1}</p>: 0}
			</div>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {earned1 ? <p >{earned1}</p>: 0}
			</div>
            <Button variant="primary" onClick={handleShow} className="out">Manage</Button>
            <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Puffy/Ethw pair staking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			<p>Your lp balance: {lpbal1}</p>
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
		  <div style={{display: "flex", width:'100%', justifyContent: "center", alignItems:"center", background:"white", borderRadius:"15px", padding:"20px", boxShadow:"4px 2px 5px 0px rgb(0 0 0 / 48%)"}} className="outline outline1 mt">
		    <div style={{width:"16%", textAlign:"center"}} className="out"><img  alt='pairimage' src={lp2}/></div>
            <p style={{width:"16%", textAlign:"center"}} className="out">REALP/ETHW</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">Apr</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">120,000</p>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {contract2 ? <p>{contract2}</p>: 0}
			</div>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {earned2 ? <p >{earned2}</p>: 0}
			</div>
            <Button variant="primary" id="myBtn" className="out">Manage</Button>
			<div id="myModal" className='modal modal-90w'>
                <div className="modal-content">
					<div className='modal-header'>
                    <p>REALP/ETHW pair staking</p>
					<span className="close">&times;</span>
					</div>
					<div className='modal-body'>
					    <p>Your lp balance: {lpbal2}</p>
                        <input type="number" name='stakeamount' placeholder='Enter stake amount...' onChange={e => setValue(e.target.value)}/>
                        <p>Your returns in one year would be equals to</p>
					</div>
					<div className='modal-footer'>
					<Button variant="secondary" onClick={stake2}>
                        Stake
                    </Button>
                    <Button variant="primary" onClick={Approve2}>
                        Approve Puff lp
                    </Button>
                    <Button variant="secondary" onClick={Unstake2}>
                        Unstake
                    </Button>
                    <Button variant="secondary" onClick={Withdrawreward2}>
                        Harvest
                    </Button>
					</div>
                </div>
            </div>
          </div>
		  <div style={{display: "flex", width:'100%', justifyContent: "center", alignItems:"center", background:"white", borderRadius:"15px", padding:"20px", boxShadow:"4px 2px 5px 0px rgb(0 0 0 / 48%)"}} className="outline outline1 mt">
		    <div style={{width:"16%", textAlign:"center"}} className="out"><img  alt='pairimage' src={lp3}/></div>
            <p style={{width:"16%", textAlign:"center"}} className="out">HEX/USDW</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">Apr</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">80,000</p>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {contract3 ? <p>{contract3}</p>: 0}
			</div>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {earned3 ? <p >{earned3}</p>: 0}
			</div>
			<Button variant="primary" id="myBtn2" className="out">Manage</Button>
			<div id="myModal2" className='modal modal-90w'>
                <div className="modal-content">
					<div className='modal-header'>
                    <p>HEX/USDW pair staking</p>
					<span className="close close1">&times;</span>
					</div>
					<div className='modal-body'>
					    <p>Your lp balance: {lpbal3}</p>
                        <input type="number" name='stakeamount' placeholder='Enter stake amount...' onChange={e => setValue(e.target.value)}/>
                        <p>Your returns in one year would be equals to</p>
					</div>
					<div className='modal-footer'>
					<Button variant="secondary" onClick={stake3}>
                        Stake
                    </Button>
                    <Button variant="primary" onClick={Approve3}>
                        Approve Puff lp
                    </Button>
                    <Button variant="secondary" onClick={Unstake3}>
                        Unstake
                    </Button>
                    <Button variant="secondary" onClick={Withdrawreward3}>
                        Harvest
                    </Button>
					</div>
                </div>
            </div>
          </div>
		  <div style={{display: "flex", width:'100%', justifyContent: "center", alignItems:"center", background:"white", borderRadius:"15px", padding:"20px", boxShadow:"4px 2px 5px 0px rgb(0 0 0 / 48%)"}} className="outline outline1 mt">
		    <div style={{width:"16%", textAlign:"center"}} className="out"><img  alt='pairimage' src={lp4}/></div>
            <p style={{width:"16%", textAlign:"center"}} className="out">LFG/USDW</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">Apr</p>
            <p style={{width:"16%", textAlign:"center"}} className="out">40,000</p>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {contract4 ? <p>{contract4}</p>: 0}
			</div>
			<div style={{width:"16%", textAlign:"center"}} className="out">
            {earned4 ? <p >{earned4}</p>: 0}
			</div>
			<Button variant="primary" id="myBtn3" className="out">Manage</Button>
			<div id="myModal3" className='modal modal-90w'>
                <div className="modal-content">
					<div className='modal-header'>
                    <p>LFG/USDW pair staking</p>
					<span className="close close2">&times;</span>
					</div>
					<div className='modal-body'>
					    <p>Your lp balance: {lpbal4}</p>
                        <input type="number" name='stakeamount' placeholder='Enter stake amount...' onChange={e => setValue(e.target.value)}/>
                        <p>Your returns in one year would be equals to</p>
					</div>
					<div className='modal-footer'>
					<Button variant="secondary" onClick={stake4}>
                        Stake
                    </Button>
                    <Button variant="primary" onClick={Approve4}>
                        Approve Puff lp
                    </Button>
                    <Button variant="secondary" onClick={Unstake4}>
                        Unstake
                    </Button>
                    <Button variant="secondary" onClick={Withdrawreward4}>
                        Harvest
                    </Button>
					</div>
                </div>
            </div>
          </div>
		  <p className='mt'>*All apy values can change at anytime due to price change</p>
		  <p>*Apy values isn't automatic for now</p>
				</div>
			</div>
		</div>
	);
}

export default App;
