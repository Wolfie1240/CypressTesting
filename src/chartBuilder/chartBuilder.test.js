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
 
    xInputs = domTesting.getAllByLabelText(document, "X")
    yInputs = domTesting.getAllByLabelText(document, "Y")

    const user = userEvent.setup()

    expect(xInputs[0].value).toContain('')
    expect(yInputs[0].value).toContain('')
    await user.type(xInputs[0], '1')
    await user.type(yInputs[0], '2')
    expect(xInputs[0].value).toContain('1')
    expect(yInputs[0].value).toContain('2')

    const button = domTesting.getByRole(document, 'button', { name: '+' })
    await user.click(button)

    xInputs = domTesting.getAllByLabelText(document, "X")
    yInputs = domTesting.getAllByLabelText(document, "Y")

    expect(xInputs[0].value).toContain('1')
    expect(yInputs[0].value).toContain('2')
    expect(xInputs[1].value).toContain('')
    expect(yInputs[1].value).toContain('')

    await user.type(xInputs[1], '3')
    await user.type(yInputs[1], '4')

    expect(xInputs[0].value).toContain('1')
    expect(yInputs[0].value).toContain('2')
    expect(xInputs[1].value).toContain('3')
    expect(yInputs[1].value).toContain('4')

    await user.click(button)

    xInputs = domTesting.getAllByLabelText(document, "X")
    yInputs = domTesting.getAllByLabelText(document, "Y")

    expect(xInputs[0].value).toContain('1')
    expect(yInputs[0].value).toContain('2')
    expect(xInputs[1].value).toContain('3')
    expect(yInputs[1].value).toContain('4')
    expect(xInputs[2].value).toContain('')
    expect(yInputs[2].value).toContain('')

    await user.type(xInputs[2], '5')
    await user.type(yInputs[2], '6')

    expect(xInputs[0].value).toContain('1')
    expect(yInputs[0].value).toContain('2')
    expect(xInputs[1].value).toContain('3')
    expect(yInputs[1].value).toContain('4')
    expect(xInputs[2].value).toContain('5')
    expect(yInputs[2].value).toContain('6')

    await user.click(button)
    await user.click(button)
    await user.click(button)

    xInputs = domTesting.getAllByLabelText(document, "X")
    yInputs = domTesting.getAllByLabelText(document, "Y")

    expect(xInputs[0].value).toContain('1')
    expect(yInputs[0].value).toContain('2')
    expect(xInputs[1].value).toContain('3')
    expect(yInputs[1].value).toContain('4')
    expect(xInputs[2].value).toContain('5')
    expect(yInputs[2].value).toContain('6')
    expect(xInputs[3].value).toContain('')
    expect(yInputs[3].value).toContain('')
    expect(xInputs[4].value).toContain('')
    expect(yInputs[4].value).toContain('')
    expect(xInputs[5].value).toContain('')
    expect(yInputs[5].value).toContain('')
})