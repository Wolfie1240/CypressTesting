/**
 * @jest-environment jsdom
 */

const fs = require("fs")

//require("whatwg-fetch")
require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default



function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
	//console.log(jsPath)
	jest.isolateModules(function() {
		require(jsPath)
	})
}


test("Clicking the add values button generates two new input boxes for X and Y", async function() {
	// Arrange
    initDomFromFiles(
		`${__dirname}/line.html`,
		`${__dirname}/line.js`	
	)
    const user = userEvent.setup()
    const addValuesButton = domTesting.getByText(document, "+")


    await user.click(addValuesButton);
    await user.click(addValuesButton);
    
    const xValueInputs = domTesting.getAllByLabelText(document, 'X');
    const yValueInputs = domTesting.getAllByLabelText(document, 'Y');


    // ACT
    await user.type(xValueInputs[0], '1')
    await user.type(xValueInputs[1], '3')
    await user.type(xValueInputs[2], '5')
    await user.type(yValueInputs[0], '2')
    await user.type(yValueInputs[1], '4')
    await user.type(yValueInputs[2], '6')

    await user.click(addValuesButton);

    const xValueInputsNew = domTesting.getAllByLabelText(document, 'X');
    const yValueInputsNew = domTesting.getAllByLabelText(document, 'Y');

    // Assert
    expect(xValueInputsNew[0].value).toBe('1')
    expect(xValueInputsNew[1].value).toBe('3')
    expect(xValueInputsNew[2].value).toBe('5')
    expect(yValueInputsNew[0].value).toBe('2')
    expect(yValueInputsNew[1].value).toBe('4')
    expect(yValueInputsNew[2].value).toBe('6')

    expect(xValueInputsNew[3].value).toBe('')
    expect(yValueInputsNew[3].value).toBe('')
})

