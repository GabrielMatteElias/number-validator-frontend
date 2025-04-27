const truncateFileName = (fileName, maxLength = 15) => {
    if (fileName.length > maxLength) {
        const extension = fileName.slice(fileName.lastIndexOf('.'));
        const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
        return nameWithoutExtension.slice(0, maxLength - extension.length) + '... ' + extension;
    }
    return fileName;
};

const formatPhoneNumber = (phone) => {
    // Remove qualquer caracter não numérico
    const cleanPhone = phone.replace(/\D/g, '');

    // Verifica se o número tem 10 ou 11 dígitos
    if (cleanPhone.length === 11) {
        // Formato (DDD) 9XXXX-XXXX
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 3)}${cleanPhone.slice(3, 7)}-${cleanPhone.slice(7)}`;
    } else if (cleanPhone.length === 10) {
        // Formato (DDD) XXXX-XXXX
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
    }

    // Se não for 10 ou 11 dígitos, retorna o número como está
    return phone;
};

//yyyy-mm-dd ---> dd-mm-yyyy
const formatDate = (date) => {
    if (!date || typeof date !== 'string') return '';

    const parts = date.split('-');

    if (parts.length !== 3) return '';

    const [year, month, day] = parts;

    const isValid =
        (year.length === 4 || year.length === 2) &&
        month.length === 2 &&
        day.length === 2 &&
        !isNaN(Number(year)) &&
        !isNaN(Number(month)) &&
        !isNaN(Number(day));

    if (!isValid) return '';

    return `${day}/${month}/${year}`;
};


export {
    truncateFileName,
    formatPhoneNumber,
    formatDate
};
