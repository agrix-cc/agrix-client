const formatNumber = (num) => {
    const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formatter.format(num);
}

export default formatNumber;