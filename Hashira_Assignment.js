const fs = require('fs');


const fileContent = fs.readFileSync('input.json');
const jsonData = JSON.parse(fileContent);

function extractRoots(data) {
    const { n: totalRoots, k: requiredRoots } = data.keys;
    const rootValues = [];

    let collected = 0;
    for (let entry in data) {
        if (entry === "keys") continue;
        if (collected >= requiredRoots) break;

        const base = parseInt(data[entry].base);
        const value = data[entry].value;
        const decimal = parseInt(value, base);
        rootValues.push(decimal);
        collected++;
    }

    return rootValues;
}

function computeCoefficients(rootsArray) {
    const degree = rootsArray.length;
    let coefficients = Array(degree + 1).fill(0);
    coefficients[degree] = 1;

    for (let i = degree - 1; i >= 0; i--) {
        for (let j = degree - i; j >= 1; j--) {
            coefficients[degree - j] -= rootsArray[i] * coefficients[degree - j + 1];
        }
    }

    return coefficients;
}

const parsedRoots = extractRoots(jsonData);
const polynomialCoefficients = computeCoefficients(parsedRoots);

console.log(polynomialCoefficients[0]);
