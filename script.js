document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy-button');
    const pgpKeyBlock = document.getElementById('pgp-key-block');

    if (copyButton && pgpKeyBlock) {
        copyButton.addEventListener('click', () => {
            const keyText = pgpKeyBlock.textContent;
            navigator.clipboard.writeText(keyText).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy Key to Clipboard';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                copyButton.textContent = 'Copy Failed!';
                 setTimeout(() => {
                    copyButton.textContent = 'Copy Key to Clipboard';
                }, 2000);
            });
        });
    }
});