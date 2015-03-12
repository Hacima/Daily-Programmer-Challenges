/*
There's so much going on in this program that I want to change, it's ridiculous. 
I will try to document this as best as possible in the future. 
*/

//notes contains 2 octaves so that 'populate()' can grab any 8 consecutive notes without errors.
var notes = ["A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G"];

//stepPattern is the pattern that natural notes take. [0] is the number of half-steps from "A" to "B",
//[1] is the half-steps from "B" to "C", etc. Any deviation from this pattern requires accidentals.
var stepPattern = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2];

//These arrays contain the half-step patterns for various scales. There is no reason to use 2 octaves
//yet, but I do plan on adding modes which would make multiple octaves quite useful.
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

//There HAS to be a better way...
function printAccidentals(numAccidentals) {
    "use strict";
    if (numAccidentals === 1) {
        return "#";
    } else if (numAccidentals === 2) {
        return "x";
    } else if (numAccidentals === -1) {
        return "b";
    } else if (numAccidentals === -2) {
        return "bb";
    } else {
        return "";
    }
}

function addAccidentals(userScale, steps, scaleType) {
    "use strict";
    var rootNotePosition = notePos(userScale[0].charAt(0), notes),
        accidental = 0,
        i = 0; //for loop iterator
    if (userScale[0].charAt(1) === "b") {
        accidental = -1;
    } else if (userScale[0].charAt(1) === "#") {
		accidental = 1;
	}
    for (i = 1; i < userScale.length; i += 1) {
		accidental += scaleType[i - 1] - steps[rootNotePosition + i - 1];
        userScale[i] += printAccidentals(accidental);
    }
}


scaleType = document.getElementById("scaleType").value;
//root = document.getElementById("root").value + document.getElementById("accidental").value;
/*
populateScale(root, myScale);
if (scaleType === "Major") {
    addAccidentals(myScale, stepPattern, majScale);
} else if (scaleType === "Minor") {
    addAccidentals(myScale, stepPattern, natMinScale);
} else if (scaleType === "Harmonic Minor") {
    addAccidentals(myScale, stepPattern, harMinScale);
}*/

document.getElementById("result").innerHTML = scaleType;
