#include <iostream>
#include <fstream>
using namespace std;

int age;
string name, username;

int main(){
	cout<<"Name: ";
	cin>>name;
	cout<<"Age: ";
	cin>>age;
	cout<<"Reddit username: ";
	cin>>username;
	cout<<"Your name is "<<name<<", your age is "<<age<<" and your username is "<<username<<"."<<endl;
	ofstream userInfo;
	userInfo.open("userInfo.txt");
	userInfo<<"Name: "<<name<<"\nAge: "<<age<<"\nUsername: "<<username;
	userInfo.close();
	return 0;
}