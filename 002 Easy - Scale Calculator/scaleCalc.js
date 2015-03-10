/*
There's so much going on in this program that I want to change, it's ridiculous. 
I will try to document this as best as possible in the future. 

This is a program that takes a musical note as an input and outputs a major scale
using that note as the root. It was a much more complicated program than I expected to create.
Obviously, the BEST way to do this is to simply list out all the major scales and 
use a switch statement. I wanted something I could expand to cover all minor scales, modes,
chords, arpeggios, etc. It's a delicate work in progress, but I'm really enjoying the challenge!
*/
var notes = ["A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G"];
var majScale =    [2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1];
var stepPattern = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2];
var naturalHalfsteps = ["B","E"];
var myScale = ["C", "D", "E", "F", "G", "A", "B", "C"];
var root = "C";


root = prompt("Hello, please input the root note of any major scale (C# or Ab, etc).");

function notePos(note, noteList){
    return noteList.indexOf(note);
}
function populateScale(rootNote, scale){
    var rootNotePosition = notePos(rootNote.charAt(0), notes);
    scale[0] = rootNote;
    for(var i = 1; i < scale.length; i++){
        scale[i] = notes[rootNotePosition + i];
    }
}

//There HAS to be a better way...
function printAccidentals(numAccidentals){
    if(numAccidentals===1){
        return "#";
    }else if(numAccidentals===2){
        return "##";
    }else if(numAccidentals===-1){
        return "b";
    }else if(numAccidentals===-2){
        return "bb";
    }else{
        return "";
    }
}

function addAccidentals(userScale, steps, scaleType){
    var rootNotePosition = notePos(userScale[0].charAt(0), notes);
    var accidental = 0;
    if (userScale[0].charAt(1)==="b"){
        accidental = -1;
	}else if (userScale[0].charAt(1)==="#"){
		accidental = 1;
	}
    for(var i = 1; i < userScale.length; i++){
		accidental += scaleType[i-1] - steps[rootNotePosition+i-1];
        userScale[i] += printAccidentals(accidental);
    }
}

populateScale(root, myScale);
addAccidentals(myScale,stepPattern,majScale);
console.log(myScale);