const nameDisplayClass = 'jstest-editable-text-span';

function getFirstElementByClassName(className) {
    return document.getElementsByClassName(className)[0];
}

function updateName(text) {
    //We need to click the parent element first to show the text input
    //and done button elements
    let textSpanElement = getFirstElementByClassName(nameDisplayClass);
    textSpanElement.click();

    const doneButtonClass = 'jstest-editable-text-btn';
    const textInputClass = 'jstest-editable-text-input';

    let textInput = getFirstElementByClassName(textInputClass);
    let doneBtn = getFirstElementByClassName(doneButtonClass);

    textInput.focus();
    document.execCommand('delete', false);
    document.execCommand('insertText', false, text);

    doneBtn.focus();
    document.execCommand('click', false);
}

function updateLife(numberToUpdateBy) {
    let textSpanElement = getFirstElementByClassName(nameDisplayClass);
    let text = textSpanElement.innerText;
    let re = /([a-zA-Z\s]+)(\d+)/gm;
    let regexed = re.exec(text);

    let name = regexed[1];
    let lifeTotalAsText = regexed[2];
    let lifeTotal = parseInt(lifeTotalAsText);

    lifeTotal = lifeTotal + numberToUpdateBy;

    updateName(name + lifeTotal);
}


function createButtons(element) {
    const parentVideoContainer = '.gridVideoCell-3Ztk';

    let parent = element.closest(parentVideoContainer)

    addPlusButton(parent);
    addMinusButton(parent);
}

function addLifeChangingButton(parentElement, buttonText, className, amountOfLife) {
    let button = document.createElement("button");
    button.classList.add('fab');
    button.classList.add(className);

    let text = document.createTextNode(buttonText);
    button.appendChild(text);
    button.onclick = function (event) {
        updateLife(amountOfLife);
    }
    parentElement.appendChild(button);
}

function addMinusButton(parent) {
    addLifeChangingButton(parent, '-1', 'minus', -1);
}

function addPlusButton(parent) {
    addLifeChangingButton(parent, '+1', 'plus', 1);
}

var observer = new MutationObserver(function (mutations, me) {
    let textSpanElements = document.getElementsByClassName(nameDisplayClass);
    if (textSpanElements.length > 0) {
        element = textSpanElements[0];
        createButtons(textSpanElements[0]);
        me.disconnect();
        return;
    }
});

observer.observe(document, {
    childList: true,
    subtree: true
});