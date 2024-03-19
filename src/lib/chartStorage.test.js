/**
 * @jest-environment jsdom
 */
const domTesting = require('@testing-library/dom')
global.window = window


const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData
} = require('./chartStorage.js')

describe('saveChart function', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test('should save a new chart', () => {
        const chart = { data: [1, 2, 3] };
        saveChart(chart);
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chart]);
    });

    test('should update an existing chart', () => {
        const chart1 = { data: [1, 2, 3] };
        const chart2 = { data: [4, 5, 6] };
        saveChart(chart1);
        saveChart(chart2, 0);
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chart2]);
    });
});

describe('loadSavedChart function', () => {
    test('should load a saved chart by index', () => {
        const chart1 = { data: [1, 2, 3] };
        const chart2 = { data: [4, 5, 6] };
        saveChart(chart1);
        saveChart(chart2);
        const loadedChart = loadSavedChart(0);
        expect(loadedChart).toEqual(chart2);
    });

});

describe('updateCurrentChartData and loadCurrentChartData functions', () => {
    test('should update and load current chart data', () => {
        const chartData = { labels: ['A', 'B', 'C'], values: [10, 20, 30] };
        updateCurrentChartData(chartData);
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });
});
