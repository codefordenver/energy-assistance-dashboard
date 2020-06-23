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


export function generateTickValues(tickIteration, maxY){
    let dynamicTickValues = [];
    let i = 0;
    do {
        dynamicTickValues.push((i * tickIteration * 10).toFixed(2) / 10);
        i++;
    } while ((i * tickIteration) < (maxY + tickIteration));
    return dynamicTickValues;
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

