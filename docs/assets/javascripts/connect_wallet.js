async function connect_wallet(tutorial_name) {
    const button = document.getElementById(tutorial_name + '-connect');
    const output = document.getElementById(tutorial_name + '-output').getElementsByTagName('code')[0];
    button.textContent = 'Connect Wallet';
    button.classList.remove('wallet-connected');
    if (!window.ethereum) {
        output.textContent = 'No wallet browser extension detected.';
        return;
    }
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (window.ethereum.chainId !== "0x72") {
            output.textContent = 'Please connect wallet to the Coston2 network (chain ID 114 or 0x72)\n' +
                'and click this button again.';
            return;
        }
        output.textContent = `Connected to account ${accounts[0]}`;
        button.textContent = 'Wallet Connected';
        button.classList.add('wallet-connected');
        window.tutorialData = {
            account: accounts[0],
            provider: window.ethereum
        };
    } catch (error) {
        output.textContent = error.message;
    }
}
