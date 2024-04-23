let account;
const connectMetamask = async () => {
  if (window.ethereum !== 'undefined') {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
  }
};

const connectContract = async () => {
  const ABI = [
    {
      inputs: [],
      name: 'deposit',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address payable',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getAddress',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  const Address = '0xee33b5a0c23d5936788c5609435dac62e7c9094b';
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
};

const joinBaristaDelight = async () => {
  await connectMetamask();
  if (!window.contract) {
    await connectContract();
  }
  const amount = '500000000000000000'; // Value to 0.5 Sepolia ETH
  await window.contract.methods
    .deposit()
    .send({ from: account, value: amount });
  await checkWalletDetails();
};

const joinBrewMaster = async () => {
  await connectMetamask();
  if (!window.contract) {
    await connectContract();
  }
  const amount = '1000000000000000000'; // Value to 1.0 Sepolia ETH
  await window.contract.methods
    .deposit()
    .send({ from: account, value: amount });
  await checkWalletDetails();
};

const withdrawBrewMaster = async () => {
  const amount = '1000000000000000000';
  const address = account;
  await window.contract.methods
    .withdraw(address, amount)
    .send({ from: account });
  await checkWalletDetails();
};

const withdrawBaristaDelight = async () => {
  const amount = '500000000000000000';
  const address = account;
  await window.contract.methods
    .withdraw(address, amount)
    .send({ from: account });
  await checkWalletDetails();
};

const checkWalletDetails = async () => {
  await connectContract();
  await getContractAccount();
};

window.addEventListener('load', async () => {
  await checkWalletDetails();
});

//API Credit: SampleAPIs.com
fetch('https://api.sampleapis.com/coffee/hot')
  .then((response) => response.json())
  .then((data) => {
    const coffeeList = document.getElementById('coffeeList');

    data.forEach((coffee) => {
      const coffeeImage = document.createElement('img');
      coffeeImage.src = coffee.image;
      coffeeList.appendChild(coffeeImage);
    });

    const images = coffeeList.querySelectorAll('img');
    let currentIndex = 0;

    function showRandomImage() {
      images[currentIndex].style.display = 'none';

      let newIndex = currentIndex;
      while (newIndex === currentIndex) {
        newIndex = Math.floor(Math.random() * images.length);
      }
      currentIndex = newIndex;

      images[currentIndex].style.display = 'block';

      setTimeout(showRandomImage, 3000);
    }

    showRandomImage();
  })
  .catch((error) => console.error('Error recovering api data:', error));

const displayWalletAddress = async () => {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  const compactAddress = `${account.substring(0, 6)}...${account.substring(
    account.length - 5,
  )}`;
  document.getElementById(
    'walletAddress',
  ).innerHTML = `Wallet Address: <strong>${compactAddress}</strong>`;
};
