
const formatCurrency = (number, symbol = '$') => {
    // Add thousands separator
    const formattedNumber = number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "--";
  
    // Format the number as a currency string
    return `${symbol}${formattedNumber}`;
  };

  export {formatCurrency}