#include <iostream>
using namespace std;

int main() {
	string numbers = "1 1 2 2 3 3 4 4";
	string results, placeholder;
	
	for (string::size_type i = 0; i < numbers.length(); i += 1) {
		if (numbers[i] == " " || i = (numbers.length() - 1)){
			results += placeholder;
			placeholder = "";
		} else {
			placeholder += numbers[i];
		}
	}
	
}
