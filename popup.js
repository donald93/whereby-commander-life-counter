
function updateName(text) {
    //We need to click the parent element first to show the text input
    //and done button elements
    var textSpanElements = document.getElementsByClassName('jstest-editable-text-span');
    element = textSpanElements[0];
    element.click();

    var textInput = document.getElementsByClassName('jstest-editable-text-input')[0];
    var doneBtn = document.getElementsByClassName('jstest-editable-text-btn')[0];

    textInput.focus();
    document.execCommand('delete', false);
    document.execCommand('insertText', false, text);

    doneBtn.focus();
    document.execCommand('click', false);
}

function updateLife(numberToUpdateBy) {
    var textSpanElements = document.getElementsByClassName('jstest-editable-text-span');
    element = textSpanElements[0];
    let text = element.innerText;
    let re = /([a-zA-Z\s]+)(\d+)/gm;
    let regexed = re.exec(text);

    let name = regexed[1];
    let lifeTotalAsText = regexed[2];
    let lifeTotal = parseInt(lifeTotalAsText);

    lifeTotal = lifeTotal + numberToUpdateBy;

    updateName(name + lifeTotal);
}


function createButtons(element) {
    var parent = element.closest('.gridVideoCell-3Ztk')
    addPlusButton(parent);
    addMinusButton(parent);
}

function addMinusButton(parent) {
    var subtractLife = document.createElement("button");
    subtractLife.classList.add('fab');
    subtractLife.classList.add('minus');
    var minus = document.createTextNode("-1");
    subtractLife.appendChild(minus);
    subtractLife.onclick = function (event) {
        updateLife(-1);
    }
    parent.appendChild(subtractLife);
}

function addPlusButton(parent) {
    var addLife = document.createElement("button");
    addLife.classList.add('fab');
    addLife.classList.add('plus');
    var plus = document.createTextNode("+1");
    addLife.appendChild(plus);
    addLife.onclick = function (event) {
        updateLife(1);
    }
    parent.appendChild(addLife);
}

var observer = new MutationObserver(function (mutations, me) {
    var textSpanElements = document.getElementsByClassName('jstest-editable-text-span');
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