function randFrom(min, max) {
    //Returns a random number from min to max.
    //min--;
    return Math.floor((Math.floor(Math.random()*100)+1) * (max-min)/100) + min; 
}

var myNumber = randFrom(1,100);

/*
var myNumber = prompt("Hello! Welcome to the number guessing game. Please input a number from 1-100, or 0 if you would like a random number.");
if (myNumber < 1){
    myNumber = randFrom(1,100);
    console.log("Ok! Your new random number is "+myNumber+"!");
}
*/

var guess = randFrom(1,100);
console.log("Your number: "+myNumber);
console.log("Computer number: "+guess);
var minGuess = 1;
var maxGuess = 100;
var guessed = false;
while(!guessed){
    if(guess>myNumber){
        maxGuess = guess-1;
        console.log(guess+" > "+myNumber+". Too high! MAX = "+maxGuess);
    }else if (guess<myNumber){
        minGuess = guess+1;
        console.log(guess+" < "+myNumber+". Too low!  min = "+minGuess);
    }else{
        console.log(guess+" = "+myNumber+". Guessed it!");
        guessed = true;
    }
    guess = randFrom(minGuess, maxGuess);
}