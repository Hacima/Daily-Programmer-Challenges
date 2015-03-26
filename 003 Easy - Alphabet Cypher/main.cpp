#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main(){
	string unencodedWord;
	bool matchFound = false;
	int alphabetCounter = 0;
	char alphabet = ['A', 'B', 'C' ,'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	cout<<"Please input a word to be encoded."<<endl;
	cin>>unencodedWord;
	for (int i = 0; i < unencodedWord.length(); i += 1) {
		alphabetCounter = 0;
		while (!matchFound || alphabetCounter >= alphabet.length()) }
			if (alphabet[alphabetCounter] == unencodedWord[i]){
				unencodedWord[i] = alphabet[(i + 1) % alphabet.length()]
				matchFound = true;
			}
			alphabetCounter += 1;
		}
		unencodedWord[i] 
	}
	cout<<"Your newly encoded word: "<<unencodedWord<<endl;
}
