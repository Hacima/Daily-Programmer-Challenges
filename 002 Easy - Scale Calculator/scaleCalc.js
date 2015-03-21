/*
    So, this is my scale calculator program. The purpose is simple: Pick a root note from A to G, pick an accidental, pick a scale type, and it generates that scale! Pretty nifty!
    Now, I could just build a database of every possible scale. With 7 root notes, 3 accidentals and 9 different scales to pick from, that's 187 different scales I would have to write out. Simpler, more readable and faster, yes, but not really a 'program'. 
    Here's how it's supposed to work, step by step.
    1. Clear each output
    2. Get the user's input for the root note of the scale and use it to fill the rest of the scale, ignoring accidentals for now.
    3. Get the user's input for the type of scale, and use the corresponding half-step pattern to calculate all of the accidentals in this scale.
    4. Delete the natural symbols from the scale for for aesthetics.
    5. Calculate and print the chords, half-step pattern, root notes, 3rds, 5ths in that order.
*/

//stepPattern is the pattern that natural notes take. [0] is the number of half-steps from "A" to "B", etc.
var stepPattern = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2];
var doubleFlat = '♭♭';
var flat = '♭';
var natural = '♮';
var sharp = '♯';
var doubleSharp = 'x';


/*
    All of the functions that deal with the pattern arrays rely on these functions to tell them what section of the array to use. For example, a C-Major scale would need to be calculated starting from major[2], while an E-Major scale needs to be calculated from major[4]. This is easily calculated with major[notePos("C")] or major[notePos("E")]. 
*/
function notePos(note) {
    "use strict";
    var noteList = ["A", "B", "C", "D", "E", "F", "G"];
    return noteList.indexOf(note);
}

function secondNotePos(note) {
    "use strict";
    var noteList = ["A", "B", "C", "D", "E", "F", "G"];
    return noteList.indexOf(note) + 7;
}

function populateScale(rootNote, scale, noteList) {
    "use strict";
    var i = 0, //for loop iterator
        rootNotePosition = notePos(rootNote.charAt(0));
    scale[0] = rootNote;
    
    for (i = 1; i < scale.length; i += 1) {
        scale[i] = noteList[rootNotePosition + i];
    }
}

function getScaleType(scaleType) {
    "use strict";
    var major      = [2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1],
        natMinor   = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2],
        harMinor   = [2, 1, 2, 2, 1, 3, 1, 2, 1, 2, 2, 1, 3, 1],
        dorian     = [2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2],
        phrygian   = [1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2],
        lydian     = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1],
        mixolydian = [2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2],
        aeolian    = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2],
        locrian    = [1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1];
    
    switch(scaleType){
        case "Major": return major;
        case "Natural Minor": return natMinor;
        case "Harmonic Minor": return harMinor;
        case "Dorian": return dorian;
        case "Phrygian": return phrygian;
        case "Lydian": return lydian;
        case "Mixolydian": return mixolydian;
        case "Aeolian": return aeolian;
        case "Locrian": return locrian;
        default: return 0;
    }
}

function addAccidentals(userScale, steps, scaleType) {
    "use strict";
    var rootNotePosition = notePos(userScale[0].charAt(0)),
        accidentalList = [doubleFlat, flat, natural, sharp, doubleSharp],
        accidentalDegree = accidentalList.indexOf(userScale[0].charAt(1)),
        i = 0; //for loop iterator
    
    for (i = 1; i < userScale.length; i += 1) {
		accidentalDegree += scaleType[i - 1] - steps[rootNotePosition + i - 1];
        userScale[i] += accidentalList[accidentalDegree];
    }
}

function getIntervalClass(note1, note2) {
    "use strict";
    note1 = note1.charAt(0);
    note2 = note2.charAt(0);
    var note1Position = notePos(note1),
        note2Position = notePos(note2);
    if (note2Position - note1Position < 0) {
        note2Position = secondNotePos(note2);
    }
    
    return 1 + note2Position - note1Position;
}

function getIntervalDistance(note1, note2, stepList) {
    "use strict";
    var lowNote = notePos(note1.charAt(0)),
        highNote = notePos(note2.charAt(0)),
        intervalDistance = 0,
        i = 0; //for loop iterator
    
    if (highNote - lowNote < 0) {
        highNote = secondNotePos(note2.charAt(0));
    }
    
    switch (note1.substring(1)){
        case doubleFlat: 
            intervalDistance += 2;
            break;
        case flat: 
            intervalDistance += 1;
            break;
        case sharp: 
            intervalDistance -= 1;
            break;
        case doubleSharp: 
            intervalDistance -= 2;
            break;
        default: 
            intervalDistance += 0;
            break;
    }
    
    switch (note2.substring(1)){
        case doubleFlat: 
            intervalDistance -= 2;
            break;
        case flat: 
            intervalDistance -= 1;
            break;
        case doubleSharp: 
            intervalDistance += 2;
            break;
        case sharp: 
            intervalDistance += 1;
            break;
        default: 
            intervalDistance += 0;
            break;
    }
    
    for (i = 0; i < highNote - lowNote; i += 1) {
        intervalDistance += stepList[lowNote + i];
    }

    return intervalDistance;
}

function getIntervalQuality(note1, note2) {
    "use strict";
    var perfectIntervalQualities = ["d", "P", "A"],
        majorIntervalQualities = ["d", "m", "M", "A"],
        intervalClass = getIntervalClass(note1, note2),
        intervalDistance = getIntervalDistance(note1, note2, stepPattern);
    
    switch(intervalClass){
        case 1:
            return perfectIntervalQualities[intervalDistance + 1];
        case 2:
            return majorIntervalQualities[intervalDistance];
        case 3:
            return majorIntervalQualities[intervalDistance - 2];
        case 4:
            return perfectIntervalQualities[intervalDistance - 4];
        case 5:
            return perfectIntervalQualities[intervalDistance - 6];
        case 6:
            return majorIntervalQualities[intervalDistance - 7];
        case 7:
            return majorIntervalQualities[intervalDistance - 9];
    }
}

function getChordQuality(interval1, interval2) {
    "use strict";
    if (interval1 === "M" && interval2 === "M") {
        return "Aug";
    } else if (interval1 === "M" && interval2 === "m") {
        return "Maj";
    } else if (interval1 === "m" && interval2 === "M") {
        return "Min";
    } else if (interval1 === "m" && interval2 === "m") {
        return "Dim";
    }
}

function stripNaturals(scale) {
    "use strict";
    var i = 0;
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
        document.getElementById(elementName).innerHTML += "<div class='rootNotes'>" + scale[i] + "</div>";
    }
}

function printChordTones(chordTone, elementId, scale) {
    "use strict";
    var i = 0,
        elem = document.getElementById(elementId);
    chordTone -= 1;
    for (i = 0; i < scale.length; i += 1) {
        elem.innerHTML += "<div class='chordTones'>" + scale[(i + chordTone) % (scale.length - 1)] + "</div>";
    }
}

function printStepPattern(elementName, scale) {
    "use strict";
    var i = 0,
        elem = document.getElementById(elementName),
        interval = 0;
    
    for (i = 0; i < (scale.length - 1); i += 1) {
        interval = getIntervalQuality(scale[i], scale[i + 1]) + getIntervalClass(scale[i], scale[i + 1]);
        elem.innerHTML += "<div class='steps'>" + interval + "</div>";
    }
}

function printChords(elementId, scale) {
    "use strict";
    var i = 0,
        interval1,
        interval2,
        note1,
        note2,
        note3,
        chord,
        elem = document.getElementById(elementId);
    
    for (i = 0; i < (scale.length); i += 1) {
        note1 = scale[i % scale.length];       //I
        note2 = scale[(i + 2) % scale.length]; //iii
        note3 = scale[(i + 4) % scale.length]; //V
        interval1 = getIntervalQuality(note1, note2);
        interval2 = getIntervalQuality(note2, note3);
        chord = scale[i] + " " + getChordQuality(interval1, interval2);
        elem.innerHTML += "<div class='chords'>" + chord + "</div>";
    }
}

function clearResult(resultID) {
    "use strict";
    var elem = document.getElementById(resultID);
    elem.innerHTML = "";
}

function run() {
    "use strict";
    var notes = ["A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G"],
        tonic = document.getElementById("root").value + document.getElementById("accidental").value,
        myScale = ["A", "B", "C", "D", "E", "F", "G", "A"],
        scaleType = getScaleType(document.getElementById("scaleType").value),
        stepOutput = "stepPattern",
        rootOutput = "rootNotes",
        thirdsOutput = "thirds",
        fifthsOutput = "fifths",
        chordsOutput = "chords";
    
    clearResult(stepOutput);
    clearResult(rootOutput);
    clearResult(thirdsOutput);
    clearResult(fifthsOutput);
    clearResult(chordsOutput);
    
    populateScale(tonic, myScale, notes);
    
    addAccidentals(myScale, stepPattern, scaleType);
    
    stripNaturals(myScale);
    printChords(chordsOutput, myScale);
    printStepPattern(stepOutput, myScale);
    printResult(rootOutput, myScale);
    printChordTones(3, thirdsOutput, myScale);
    printChordTones(5, fifthsOutput, myScale);
}