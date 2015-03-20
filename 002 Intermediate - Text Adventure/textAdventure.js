/*
http://www.reddit.com/r/dailyprogrammer/comments/pjbuj/intermediate_challenge_2/
create a short text adventure that will call the user by their name. The text adventure should use standard text adventure commands ("l, n, s, e, i, etc.").
for extra credit, make sure the program doesn't fault, quit, glitch, fail, or loop no matter what is put in, even empty text or spaces. These will be tested rigorously!
For super extra credit, code it in C"
*/

var playerInput = 0,
    validInputs = ['l','i','n','s','e','w'],
    playerInventory = [],
    playerPosition = [1, 1],
    map = [["Ocean Cliff", "Mountains", "Mountain Shack"], 
           ["Beach", "Meadow", "Forest"], 
           ["Cove", "Desert", "East Desert"]];
	
function getPlayerInput(){
	return prompt("What do you do?").toLowerCase();
}

function getLocation(playerPosition, map){
    var x = position[0],
        y = position[1];
        location = map[x][y];
    if(location === "Ocean Cliff"){
        return "peering off the ledge of a very high cliff. Ocean waves crash into the rocks below you.";
    }else if(location === "Mountains"){
        return "shivering as the air gets colder. You are surrounded by rocky, mountain wilderness.";
    }else if(location === "Mountain Shack"){
        return "relieved to see some form of human life. An old, worn-down shack stands before you.";
    }else if(location === "Beach"){
        return "at a sandy, sunny beach. Waves crash, seagulls caw, and the smell of saltwater surrounds you.";
    }else if(location === "Meadow"){
        return "standing in a meadow. You can smell fresh air and flowers.";
    }else if(location === "Forest"){
        return "wandering through an overgrown forest.";
    }else if(location === "Cove"){
        return "investigating a curious cove.";
    }else if(location === "Desert"){
        return "sweating under the intense heat as you walk through this desert. Nothing but sand as far as the eye can see.";
    }else if(location === "East Desert"){
        return "at the edge of the desert.";
    }
}

function Meadow(){
	
}

function validateInput(input, listOfValidInputs){
	var i = 0,
	    valid = false;
		
	while (!valid && (i < listOfValidInputs.length)){
		if(input === listOfValidInputs[i]){
			valid = true;
		}
		i += 1;
	}
	
	return valid;
}

while (playerInput != 'e'){
	console.log("You find yourself "+getLocation(playerPosition, map));
    console.log("You can go 'E'ast, 'W'est, 'N'orth or 'S'outh.");
	do{
		playerInput = getPlayerInput();
	}while(!validateInput(playerInput, validInputs));
}