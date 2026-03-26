#include <iostream>
#include <string>
#include <fstream>  

int main() {

    // retrieve the url
    std::string url;
    std::cin >> url;

    std::string findProcessCmd = "tasklist | findstr \"K7-YTB-MP3\"";
    
    int result = system(findProcessCmd.c_str());

    if (result == 0) {
        std::ofstream outfile ("test.txt");

        outfile << "testurl" << std::endl;

        outfile.close();
    } else {
        // Adding the url as arg
        std::string command ="C:\\Users\\loris\\AppData\\Local\\K7_YTB_MP3\\K7-YTB-MP3.exe --data \"" + url + "\"";
        
        // Launching the app with the arg
        system(command.c_str());
    }

    return 0;
}

