const sortPoints = require('./sortPoints.js')

test('Should return a sorted list', () => {
    const data = [
        {x: 2, y: 3},
        {x: 1, y: 2},
        {x: 3, y: 3},

    ]
    expect(sortPoints(data)).toEqual(
        [
            {x: 1, y: 2},
            {x: 2, y: 3},
            {x: 3, y: 3},

        ]
    )
})

test('Should return an empty array for empty input', () => {
    const data = []
    expect(sortPoints(data)).toEqual([])
})

test('Should handle negative X values', () => {
    const data = [
        {x: -3, y: 5},
        {x: -1, y: 7},
        {x: -2, y: 2},
    ]
    expect(sortPoints(data)).toEqual([
        {x: -3, y: 5},
        {x: -2, y: 2},
        {x: -1, y: 7},
    ]);
});
