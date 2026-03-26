#include <iostream>
#include <string>

int main() {

    // retrieve the url
    std::string url;
    std::cin >> url;
    std::cout << url;

    // Adding the url as arg
    std::string command ="C:\\Users\\loris\\AppData\\Local\\K7_YTB_MP3\\K7-YTB-MP3.exe \"" + url + "\"";
    
    // Launching the app with the arg
    system(command.c_str());
    return 0;
}

