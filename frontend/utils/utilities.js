import regression from 'regression';


export function withComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatPercent(barKey, value){
    if(barKey == '% Households below 200% FPL') {
       return Math.ceil(value * 100); 
    } else {
        return `${withComma(value)} `;
    }
}

export function generateRegressionData(selectedCountyData, title){
    const regressionData = Object.keys(selectedCountyData).map(key => {
        return [ Number(key), Number(selectedCountyData[key][title]) ]
    });
    const result = regression.linear(regressionData);

    let regressionArray = [];
    result.points.map(point => {
        regressionArray.push({x: point[0], y: point[1]})
    })
    return regressionArray;
}


export function formatData(selectedCountyData, title){
    return Object.keys(selectedCountyData).map(key => {
        return { x: key, y: Number(selectedCountyData[key][title]) }
    });
}


export function minMax(selectedCountyData, yValues, yValuesAlt){
    const minXValue = Math.min(...Object.keys(selectedCountyData));
    const maxXValue = Math.max(...Object.keys(selectedCountyData));

    const yValues1 = Math.max(...yValues.map(data =>  data.y));
    const yValues2 = yValuesAlt ? Math.max(...yValuesAlt.map(data =>  data.y)) : 0;
    const maxYValue = Math.max(yValues1, yValues2);

    return { minXValue, maxXValue, maxYValue }
}


export function formatTickPercent(d){
    return `${Math.ceil(d * 100)}%`
}


export function formatNumber(value){
    if(value < 1 && value !== 0){
        return Math.ceil(value * 100) + '%';
    } else {
        return withComma(value);
    }
}
