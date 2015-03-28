#include <iostream>
using namespace std;

int main(){
	string dnaInput;
	cout<<"Please enter one side of a DNA strand."<<endl;
	cin>>dnaInput;
	for(int i = 0; i < dnaInput.length(); i += 1) {
		switch(dnaInput[i]) {
			case 'A': 
				cout<<"T";
				break;
			case 'C': 
				cout<<"G";
				break;
			case 'G': 
				cout<<"C";
				break;
			case 'T': 
				cout<<"A";
				break;
			default: break;
		}
	}
}
