var flexParent = document.querySelector('.flex-parent');
var controlsContainer = document.querySelector('.controls-container');
var propertyInputs = Array.prototype.slice.call(document.querySelectorAll('input[type="radio"]'));

var preview = document.querySelector('.preview');
var styleObj = {display: 'flex'};

var flexChildren = Array.prototype.slice.call(document.querySelectorAll('.flex-child'));
var childCount = document.getElementById('ChildCount');
var childrenText = document.querySelector('.children-text');

var updateFlexParent = function(input) {
    flexParent.style[input.name] = input.value;
}

var updateExplanations = function() {
    var flexDirectionValue = document.querySelector('input[name="flex-direction"]:checked').value;
    
    // some parts of the explanation text depend on the flex-direction selection
    if (flexDirectionValue.match('row')) {
        // when `flex-direction: row`
        controlsContainer.classList.add('row-is-selected');
        controlsContainer.classList.remove('column-is-selected');
    }
    else if (flexDirectionValue.match('column')) {
        // when `flex-direction: column`
        controlsContainer.classList.add('column-is-selected');
        controlsContainer.classList.remove('row-is-selected');
    }
}

function updateCodePreview(input) {
    styleObj[input.name] = input.value;
    
    var previewCss = JSON.stringify(styleObj, null, '\t');
    preview.innerHTML = previewCss
                            .replace(/"/g, '')
                            .replace(/,/g, ';')
                            .replace(/(align-content.*)(\n)/, '$1;\n')
}

var inputListener = function(evt) {
    updateFlexParent(evt.target);
    updateExplanations();
    updateCodePreview(evt.target);
};

// initial setup
propertyInputs.forEach(function(input) {
    // event listener for each input
    input.addEventListener('change', inputListener);
    // inputs might not be on the default when page loads
    if (input.checked) {
        updateFlexParent(input);
        updateCodePreview(input);
    }
});
childCount.value = 8;
// set up change of child counts
childCount.addEventListener('change', function(evt) {
    var count = evt.target.value;
    
    flexChildren.forEach(function(child, i) {
        if (i >= count) {
            child.classList.add('hide');
        }
        else {
            child.classList.remove('hide');
        }
    });
    
    if (count > 1) {
        childrenText.innerHTML = 'children';
    }
    else {
        childrenText.innerHTML = 'child';
    }
    
});
updateExplanations();