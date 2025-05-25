const generateFileName = (baseName, extension) => {
    if(!baseName || !extension) return;
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');

    const date = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;
    const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

    return `${baseName}_${date}_${time}.${extension}`;
};

export {
    generateFileName
};