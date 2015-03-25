var today = newDate(),
    seconds = today.getSeconds(),
    minutes = today.getMinutes();

function startTimer() {
    "use strict";
    seconds = today.getSeconds(),
    minutes = today.getMinutes();
}

function stopTimer() {
    "use strict";
    document.getElementById("stopwatchTime").innerHTML = "<p>" + (today.getMinutes() - minutes) + ":" + (today.getSeconds() - seconds) + "</p>";
}

function reset() {
    "use strict";
    document.getElementById("stopwatchTime").innerHTML = "";
}