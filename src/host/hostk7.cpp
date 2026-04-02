#include <iostream>
#include <string>
#include <fstream> 
#include <io.h> 
#include <fcntl.h>
#include <vector>
#include <cstdio>


int main() {
    _setmode( _fileno( stdin ), _O_BINARY );
    setvbuf(stdin, NULL, _IONBF, 0);

    // 1. Save the original cout buffer
    std::streambuf* cout_buf = std::cout.rdbuf();
    std::streambuf* cerr_buf = std::cerr.rdbuf();
    // 2. Open a file for writing
    std::ofstream ofs("log.txt");
    // 3. Redirect std::cout to the file's buffer
    std::cout.rdbuf(ofs.rdbuf());
    std::cerr.rdbuf(ofs.rdbuf());

    std::time_t now = std::time(nullptr); 

    char* dt = std::ctime(&now);

    std::cout << "hostk7.exe executed - " << dt << std::endl;

    int messageSize = 0;
    std::size_t nCount;
    char * jsonMsg = NULL;


    try {
        // std::cout << "Trying to read stdin (inside try)" << std::endl;
        nCount = std::fread(&messageSize, 1, 4, stdin);
        std::cout << "messageSize: " + std::to_string(messageSize) << std::endl;

    } catch (...) {
        std::cout << "Error while reading message size sdtin" << std::endl;
    }

    std::vector<char> message(messageSize);
    std::string contentMessage = "{\"url\" : \"Error if displayed\"}";

    try {
        std::cout << "Trying to read message... ";
        nCount = std::fread(message.data(), 1, messageSize, stdin);

        if (nCount != 0) {
            std::cout << "Sucess !" << std::endl;
        }
        // std::string strTemp(message.begin(), message.end());
        // std::cout << "message locally : " << strTemp << std::endl;
        
        // contentMessage = strTemp;
        // std::cout << "message : " << contentMessage << std::endl;

        contentMessage = "";

        for (int i = 0; i < message.size(); i++) {
            contentMessage += message.at(i);
        }
        std::cout << "Message : "+contentMessage << std::endl;

    } catch (...) {
        std::cout << "Error while reading message" << std::endl;
    }

    
    // Searching of instance of the application
    std::string findProcessCmd = "tasklist | findstr \"K7-YTB-MP3\"";
    int result = system(findProcessCmd.c_str());

    // Creating new file
    std::ofstream outfile ("url.txt");

    // Adding the url to the file to trigger the watcher on the app
    outfile << contentMessage;

    // Closing file
    outfile.close();

    if (result == 1) {
        // Adding the url as arg
        std::string command ="C:\\Users\\loris\\AppData\\Local\\K7_YTB_MP3\\K7-YTB-MP3.exe --data";
        
        // Launching the app with the arg
        system(command.c_str());
    }

    std::cout << "End of hostk7.exe" << std::endl;
    ofs.close();

    return 0;
}

