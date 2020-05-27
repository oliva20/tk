import calculateEmission from '../CalculateEmission.js';

test('Should return 12.0 (vegetables factor = 2.0)', () => {
    expect(calculateEmission.getCO2FromFood(6.0, "vegetables")).toBe(12.0); 
});

test('Returns null if food type does not exist', () => {
    expect(calculateEmission.getCO2FromFood(6.0, "cardboard")).toBeNull(); 
});

test('Should return a value other than null', () => {
    expect(calculateEmission.getCO2FromKilometers(1000, "plane")).not.toBeNull(); 
});

test('Generate emission from car for 25km', () => {
    expect(calculateEmission.getCO2FromKilometers(25, "car")).toBe(0.006425);
});

test('Returns null if transport type does not exist', () => {
    expect(calculateEmission.getCO2FromKilometers(25, "UFO")).toBeNull(); 
});
