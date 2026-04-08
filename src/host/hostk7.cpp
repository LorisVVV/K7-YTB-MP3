#include <iostream>
#include <string>
#include <fstream> 
#include <io.h> 
#include <fcntl.h>
#include <vector>
#include <cstdio>
#include <Windows.h>


int main() {
    _setmode( _fileno( stdin ), _O_BINARY );
    _setmode(_fileno(stdout), _O_BINARY);
    setvbuf(stdin, NULL, _IONBF, 0);

    // Opening a file for debugging
    std::ofstream ofs("log.txt");

    // Set date in debug
    std::time_t now = std::time(nullptr); 

    char* dt = std::ctime(&now);

    ofs << "hostk7.exe executed - " << dt << std::endl;

    int messageSize = 0;
    std::size_t nCount;
    char * jsonMsg = NULL;

    try {
        // Reading message size
        nCount = std::fread(&messageSize, 1, 4, stdin);
        ofs << "messageSize: " + std::to_string(messageSize) << std::endl;
    } catch (...) {
        ofs << "Error while reading message size sdtin" << std::endl;
    }

    // Initialize the variable to get the message
    std::vector<char> message(messageSize);
    std::string contentMessage = "{\"url\" : \"Error if displayed\"}";

    try {
        // Reading message
        ofs << "Trying to read message... ";
        nCount = std::fread(message.data(), 1, messageSize, stdin);

        if (nCount != 0) {
            ofs << "Sucess !" << std::endl;
        }

        contentMessage = "";

        for (int i = 0; i < message.size(); i++) {
            contentMessage += message.at(i);
        }
       ofs << "Message : "+contentMessage << std::endl;

    } catch (...) {
        ofs << "Error while reading message" << std::endl;
    }

    // Creating new file
    std::ofstream outfile ("url.txt");

    // Adding the url to the file to trigger the watcher on the app
    outfile << contentMessage;

    // Closing file
    outfile.close();

    // Searching of instance of the application
    //std::string findProcessCmd = "tasklist | findstr \"K7-YTB-MP3\"";
    //int result = system(findProcessCmd.c_str());

    // If result == 1 no process found
    //if (result == 1) {

        STARTUPINFOA si = { sizeof(si) };
        PROCESS_INFORMATION pi;
        
        // Adding the url as arg
        std::string command ="C:\\Users\\loris\\AppData\\Local\\K7_YTB_MP3\\K7-YTB-MP3.exe --data";

        CreateProcessA(
            NULL,
            &command[0],
            NULL, NULL, FALSE,
            DETACHED_PROCESS, // Launched with detached process
            NULL, NULL,
            &si, &pi
        );
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);
    //}

    // Sending end message to chrome
    std::string endMessageJSON = "{\"status\":\"ok\"}";
    // 4-byte header (message length)
    unsigned int len = static_cast<unsigned int>(endMessageJSON.length());
    // Write the length to stdout
    std::cout.write(reinterpret_cast<char*>(&len), 4);
    // Write the message body
    std::cout.write(endMessageJSON.c_str(), len);

    std::cout.flush();

    ofs << "End of hostk7.exe" << std::endl;
    ofs.close();
    return 0;
}

