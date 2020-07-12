const CurrencyService = {
    get: (data) => {
        if(!(Intl && Intl.NumberFormat)) throw 'The browser does not support Intl.NumberFormat';
        if(!(data && data.currency && data.amount)) throw 'An object with the currency and amount properties is missing';
        return new Intl.NumberFormat('es', { style: 'decimal', currency: data.currency }).format(data.amount);
    }
};

export default CurrencyService;
