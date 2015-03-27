#include <iostream>
#include <stdlib.h>
#include <time.h>
using namespace std;

int main() {
	string passwordChars = "01234567890abcdefghijklmnopABCDEFGHIJKLMNOP";
	int numPasswords = 0, passwordLength = 0;
	srand(time(NULL));
	cout<<"How many passwords?"<<endl;
	cin>>numPasswords;
	cout<<"How long should the password(s) be?"<<endl;
	cin>>passwordLength;
	
	string password;
	
	for (int i = 0; i < numPasswords; i += 1) {
		password = "";
		for (int j = 0; j < passwordLength; j += 1) {
			password += passwordChars[rand()%passwordChars.length()];
		}
		cout<<"Password "<<i + 1<<": "<<password<<endl;
	}
}
