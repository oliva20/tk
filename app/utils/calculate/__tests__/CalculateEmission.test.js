import calculateEmission from '../CalculateEmission.js';

var testMarkers = [
  {
    "id": 1,
    "latitude": 50.912690206320136,
    "longitude": -1.4122939613313579,
    "type": "car",
  },
  {
    "id": 11,
    "latitude": 50.91266207484321,
    "longitude": -1.4125339603590081,
    "type": "car",
  },
  {
    "id": 22,
    "latitude": 50.91270600724641,
    "longitude": -1.4125757733868323,
    "type": "bus",
  },
  {
    "id": 33,
    "latitude": 50.91267416057555,
    "longitude": -1.4126361703916515,
    "type": "bus",
  },
];

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

test('Should return null since there are no markers', () => {
    expect(calculateEmission.getCO2FromMarkers([])).toBeNull();
});

test('Shoud return not null', () => {
    expect(calculateEmission.getCO2FromMarkers(testMarkers)).not.toBeNull();
});



