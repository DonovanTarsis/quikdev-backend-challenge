const formatPhone = (primaryPhone) => {
    if (primaryPhone) {
        let formattedPhone = primaryPhone.toString();
        if (formattedPhone.length === 11) {
            formattedPhone = `(${formattedPhone.substr(0, 2)}) ${formattedPhone.substr(2, 5)}-${formattedPhone.substr(7)}`;
        } else if (formattedPhone.length === 10) {
            formattedPhone = `(${formattedPhone.substr(0, 2)}) ${formattedPhone.substr(2, 4)}-${formattedPhone.substr(6)}`;
        } else {
            return { error: 'The phone must have a min of 10 digits and a max of 11 digits.' };
        }
        return formattedPhone;
    }
}

module.exports = formatPhone;