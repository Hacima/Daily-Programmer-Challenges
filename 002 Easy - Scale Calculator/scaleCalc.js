/*
There's so much going on in this program that I want to change, it's ridiculous. 
I will try to document this as best as possible in the future. 
*/

//notes contains 2 octaves so that 'populate()' can grab any 8 consecutive notes without errors.
var notes = ["A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G"];

//stepPattern is the pattern that natural notes take. [0] is the number of half-steps from "A" to "B",
//[1] is the half-steps from "B" to "C", etc. Any deviation from this pattern requires accidentals.
var stepPattern = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2];

//These arrays contain the half-step patterns for various scales.
var majScale =    [2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1];
var natMinScale = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2];
var harMinScale = [2, 1, 2, 2, 1, 3, 1, 2, 1, 2, 2, 1, 3, 1];

var modes = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
var myScale = ["C", "D", "E", "F", "G", "A", "B", "C"]; //Scale to be populated.
var root = "C"; //Starting point for the scale
var scaleType = "Major";

function notePos(note, noteList) {
    "use strict";
    return noteList.indexOf(note);
}

function populateScale(rootNote, scale) {
    "use strict";
    var i = 0, //for loop iterator
        rootNotePosition = notePos(rootNote.charAt(0), notes);
    scale[0] = rootNote;
    
    for (i = 1; i < scale.length; i += 1) {
        scale[i] = notes[rootNotePosition + i];
    }
}

function setAccidental(root) {
    "use strict";
    if (root.charAt(1) === "♭") {
        return -1;
    } else if (root.charAt(1) === "♯") {
		return 1;
	} else {
        return 0;
    }
}

function getScaleType(scaleType) {
    "use strict";
    if (scaleType === "Major") {
        return majScale;
    } else if (scaleType === "Natural Minor") {
        return natMinScale;
    } else if (scaleType === "Harmonic Minor") {
        return harMinScale;
    } else {
        return "mode";
    }
}

function getMode(mode) {
    "use strict";
    var modeSteps = [0, 0, 0, 0, 0, 0, 0],
        i = 0,
        startingPoint = modes.indexOf(mode);

    for (i = 0; i < modeSteps.length; i += 1) {
        modeSteps[i] = majScale[i + startingPoint];
    }
    return modeSteps;
}

function addAccidentals(userScale, steps, scaleType) {
    "use strict";
    var rootNotePosition = notePos(userScale[0].charAt(0), notes),
        accidentalList = ['♭♭', '♭', '♮', '♯', 'x'],
        accidentalDegree = accidentalList.indexOf(userScale[0].charAt(1)),
        i = 0; //for loop iterator

    for (i = 1; i < userScale.length; i += 1) {
		accidentalDegree += scaleType[i - 1] - steps[rootNotePosition + i - 1];
        userScale[i] += accidentalList[accidentalDegree];
    }
}

function printResult(elementName, scale) {
    "use strict";
    var i = 0;
    for (i = 0; i < scale.length; i += 1) {
        document.getElementById(elementName).innerHTML += "<li class='scaleNote'>" + scale[i] + "</li>";
    }
}

function clearResult(resultID) {
    "use strict";
    var elem = document.getElementById(resultID);
    elem.innerHTML = "";
}

function run() {
    "use strict";
    var root = document.getElementById("root").value + document.getElementById("accidental").value,
        scaleType = getScaleType(document.getElementById("scaleType").value),
        i = 0;
    
    clearResult("result");
    populateScale(root, myScale);
    
    if (scaleType === "mode") {
        scaleType = document.getElementById("scaleType").value;
        addAccidentals(myScale, stepPattern, getMode(scaleType));
    } else {
        addAccidentals(myScale, stepPattern, scaleType);
    }

    printResult("result", myScale);
}