/**
 * @jest-environment jsdom
 */

const fs = require('fs')
const domTesting = require('@testing-library/dom')
const path = require('path');
require('@testing-library/jest-dom')
const userEvent = require('@testing-library/user-event').default

function initDomFromFiles(htmlPath, jsPath){
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function(){
        require(jsPath)
    })
}

test('Add values to chart builder', async function(){
    const htmlPath = path.join(__dirname, '..', 'bar', 'bar.html')
    const jsPath = path.join(__dirname, '..', 'bar', 'bar.js')
    initDomFromFiles(htmlPath, jsPath)
 

    const user = userEvent.setup()

    const button = domTesting.getByRole(document, 'button', { name: '+' })
    await user.click(button)
    await user.click(button)
    await user.click(button)
    await user.click(button)
    await user.click(button)

    xInputs = domTesting.getAllByLabelText(document, "X")
    yInputs = domTesting.getAllByLabelText(document, "Y")
    chartTitle = domTesting.getByLabelText(document, "Chart title")
    xLabel = domTesting.getByLabelText(document, "X label")
    yLabel = domTesting.getByLabelText(document, "Y label")
    
    await user.type(chartTitle, 'Cats vs. Dogs')
    await user.type(xLabel, 'Cats')
    await user.type(yLabel, 'Dogs')

    const colorInput = domTesting.getByLabelText(document, "Chart color");
    colorInput.value = "#00ff00"
    expect(colorInput.value).toBe("#00ff00")

    await user.type(xInputs[0], '1')
    await user.type(yInputs[0], '3')
    await user.type(xInputs[1], '2')
    await user.type(yInputs[1], '7')
    await user.type(xInputs[2], '3')
    await user.type(yInputs[2], '15')
    await user.type(xInputs[3], '4')
    await user.type(yInputs[3], '25')
    await user.type(xInputs[4], '5')
    await user.type(yInputs[4], '40')

    const clear = domTesting.getByRole(document, 'button', { name: 'Clear chart data' })
    await user.click(clear)

    xInputs = domTesting.getByLabelText(document, "X")
    yInputs = domTesting.getByLabelText(document, "Y")
    chartTitle = domTesting.getByLabelText(document, "Chart title")
    xLabel = domTesting.getByLabelText(document, "X label")
    yLabel = domTesting.getByLabelText(document, "Y label")

    expect(xInputs.value).toBe('')
    expect(yInputs.value).toBe('')
    expect(chartTitle.value).toBe('')
    expect(xLabel.value).toBe('')
    expect(yLabel.value).toBe('')
    expect(colorInput.value).toBe("#ff4500")
})