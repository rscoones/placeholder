function placeholder(placeholder, connectedId) {
    if (typeof connectedId === "string") {
        connectedId = document.getElementById(connectedId);
    }
    this.connectedId = connectedId;
    this.placeholder = placeholder;

    function _createPlaceholder() {
        var placeholderSupport = ("placeholder" in document.createElement('input'));
        if (connectedId && placeholder !== "") {
            if (placeholderSupport) {
                _setupCSS3Placeholder();
            } else {
                _setupNonCSS3Placeholder();
            }
        }
    }

    function _setupCSS3Placeholder() {
        connectedId.setAttribute("placeholder", placeholder);
    }

    function _setupNonCSS3Placeholder() {
        connectedId.onblur = function () {
            _applyWatermark();
        }

        connectedId.onfocus = function () {
            _removeWatermark();
        }

        _applyWatermark();
    }

    function _applyWatermark() {
        if (connectedId.value.replace(/ /g, "") === "") {
            connectedId.value = placeholder;
            connectedId.style.color = "#888";
        }
    }

    function _removeWatermark() {
        if (connectedId.value === placeholder) {
            connectedId.value = "";
            connectedId.style.color = "";
        }
    }
    
    _createPlaceholder();
};