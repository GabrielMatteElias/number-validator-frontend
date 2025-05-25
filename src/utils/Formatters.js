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

//2025-05-06T21:52:10.679750 ---> 06/05/2025, 21:23
const formatDateTime = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date).replace(',', '');
};



const toCamelCase = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(v => toCamelCase(v));
    } else if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
            acc[camelKey] = toCamelCase(value);
            return acc;
        }, {});
    }
    return obj;
}



export {
    truncateFileName,
    formatPhoneNumber,
    formatDateTime,
    toCamelCase
};
