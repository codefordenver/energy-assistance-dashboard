export function withComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function formatPercent(barKey, value){
    if(barKey == '% Households below 200% FPL') {
       return Math.ceil(value * 100) + '.0%' 
    } else {
        return withComma(value)
    }
}
