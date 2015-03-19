/*
    So, this is my scale calculator program. The purpose is simple: Pick a root note from A to G, pick an accidental, pick a scale type, and it generates that scale! Pretty nifty!
    Here's how it's supposed to work, step by step.
    1. Clear the output window and get the first note of the scale. This is a 2 character string that you get by adding 'root' and 'accidental' together.
    2. Using the first note of the scale, fill the rest of the scale with natural notes from our 'notes[]' array. We do this by finding our root note in the array, and grabbing the next 7 notes.
    3. Get the type of scale to calculate. 'Normal' scales are easier to handle, so we have an if statement to direct the program to skip the steps we need to take for the modes.
    4. If it's a 'normal' scale, we compare the step pattern for natural notes to the step pattern for the requested. For example, C to D is 2 steps, but if the scale pattern says to only go 1 step, we decrement the accidental variable by the difference and calculate the new accidental. In this case, it would result in C to D♭. 
    5. If it's a mode... well, I'll get to that in a future update.
    6. Push the scale as <li> items to the output <div> and we're done!
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
var myScale = ["C", "D", "E", "F", "G", "A", "B"]; //Scale to be populated.
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

function stripNaturals(scale) {
    "use strict";
    var natural = '♮',
        i = 0;
    for (i = 0; i < scale.length; i += 1) {
        if (scale[i].charAt(1) === natural) {
            scale[i] = scale[i].charAt(0);
        }
    }
}

function printResult(elementName, scale) {
    "use strict";
    var i = 0;
    for (i = 0; i < scale.length; i += 1) {
        document.getElementById(elementName).innerHTML += "<li class='rootNotes'>" + scale[i] + "</li>";
    }
}

function printChordTones(chordTone, elementName, scale) {
    "use strict";
    var i = 0;
    chordTone -= 1;
    for (i = 0; i < scale.length; i += 1) {
        document.getElementById(elementName).innerHTML += "<li class='chordTones'>" + scale[(i + chordTone) % scale.length] + "</li>";
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
    clearResult("thirds");
    clearResult("fifths");
    
    populateScale(root, myScale);
    
    if (scaleType === "mode") {
        scaleType = document.getElementById("scaleType").value;
        addAccidentals(myScale, stepPattern, getMode(scaleType));
    } else {
        addAccidentals(myScale, stepPattern, scaleType);
    }
    
    stripNaturals(myScale);
    printResult("result", myScale);
    printChordTones(3, "thirds", myScale);
    printChordTones(5, "fifths", myScale);
}