const downloadBase64File = (base64Data, fileName) => {
    if (!base64Data || !fileName) return

    // Verifica se tem prefixo "data:"
    let mimeType = 'application/octet-stream';
    let base64 = base64Data;

    if (base64Data.startsWith('data:')) {
        const matches = base64Data.match(/^data:(.*?);base64,(.*)$/);
        if (matches) {
            mimeType = matches[1];
            base64 = matches[2];
        }
    }

    // Converte base64 para array de bytes
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);

    // Cria o Blob com tipo correto
    const blob = new Blob([byteArray], { type: mimeType });

    // Cria o link e aciona o download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export {
    downloadBase64File
};
