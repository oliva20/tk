import emissionManager from '../EmissionManager.js';

//An emission object should have a date and a total emission. It should have a date
//because we want to restart the emission count every day.
//Emissions are evaluated day by day.

test('Should return 0', () => {
    expect(emissionManager.getEmissionTotalToday()).resolves.toBe(0); 
});

test('Should return true when storing emission', () => {
    expect(emissionManager.storeEmission(3)).toBeTruthy(); 
});

test('Should return 3', () => {
    expect(emissionManager.getEmissionTotalToday()).resolves.toBe(3); 
});

test('Storing an emission again', () => {
    expect(emissionManager.storeEmission(3)).toBeTruthy(); 
});

test('Should return 6 because it added 3', () => {
    expect(emissionManager.getEmissionTotalToday()).resolves.toBe(6); 
});

test('Should clear all emissions', () => {
    expect(emissionManager.clearEmissions()).toBeTruthy(); 
});


