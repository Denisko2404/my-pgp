document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy-button');
    const downloadButton = document.getElementById('download-button');
    const formatSelect = document.getElementById('format-select');
    const pgpKeyBlock = document.getElementById('pgp-key-block');

    if (copyButton && pgpKeyBlock) {
        copyButton.addEventListener('click', () => {
            const keyText = pgpKeyBlock.textContent;
            const originalText = copyButton.textContent; // Store original text
            navigator.clipboard.writeText(keyText).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                copyButton.textContent = 'Copy Failed!';
                 setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 2000);
            });
        });
    }

    if (downloadButton && formatSelect && pgpKeyBlock) {
        downloadButton.addEventListener('click', async () => {
            const keyText = pgpKeyBlock.textContent;
            const format = formatSelect.value;
            const filename = `public-key.${format}`;

            let blob;

            try {
                if (format === 'gpg') {
                    const publicKey = await openpgp.readKey({ armoredKey: keyText });
                    const binaryKey = publicKey.toPacketlist().write();
                    blob = new Blob([binaryKey], { type: 'application/octet-stream' });
                } else {
                    blob = new Blob([keyText], { type: 'text/plain' });
                }

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

            } catch (err) {
                console.error('Failed to create download:', err);
                alert('An error occurred while preparing the download. See console for details.');
            }
        });
    }
});