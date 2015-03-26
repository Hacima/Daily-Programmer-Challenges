#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

int main(){
	string unencodedWord;
	bool matchFound = false;
	int alphabetCounter = 0, cypher = 5;
	char alphabet[] = {'A', 'B', 'C' ,'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
	
	cout<<"Please input a word to be encoded."<<endl;
	cin>>unencodedWord;
	cout<<unencodedWord<<" has a length of "<<unencodedWord.length()<<endl;
	
	
	for (int i = 0; i < unencodedWord.length(); i += 1) {
		alphabetCounter = 0;
		matchFound = false;
		unencodedWord[i] = toupper(unencodedWord[i]);
		while ((!matchFound) && !(alphabetCounter > 25)) {
			if (alphabet[alphabetCounter] == unencodedWord[i]) {
				unencodedWord[i] = alphabet[(alphabetCounter + cypher) % 26];
				matchFound = true;
				cout<<"Letter found. i = "<<i<<". alphabetCounter = "<<alphabetCounter<<endl;
			};
			alphabetCounter += 1;
		};
	};
	
	cout<<"Your newly encoded word: "<<unencodedWord<<endl;
};
