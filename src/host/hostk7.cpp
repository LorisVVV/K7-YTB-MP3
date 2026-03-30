#include <iostream>
#include <string>
#include <fstream> 
#include <io.h> 
#include <fcntl.h>

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

    std::cout << "hostk7.exe executed" << std::endl;

    // retrieve the url (not working)

    //std::getline(std::cin, url);

    // std::cout << stdin << std::endl;


    std::string url;
    char * messageSize = 0;
    std::size_t nCount;
    char * jsonMsg = NULL;


    try {
        std::cout << "Trying to read stdin (inside try)" << std::endl;
        nCount = std::fread(&messageSize, 1, 4, stdin);
        std::cout << "No problem while reading sdtin" << std::endl;

    } catch (...) {
        std::cout << "Error while reading sdtin" << std::endl;
    }

    url = std::to_string(nCount);

    std::cout << "nCount: " + url << std::endl;

    // Devrait fonctionner normalement

    std::string findProcessCmd = "tasklist | findstr \"K7-YTB-MP3\"";
    int result = system(findProcessCmd.c_str());


    if (result == 0) {
        std::ofstream outfile ("url.txt");

        outfile << url+"test";

        outfile.close();
    } else {
        // Adding the url as arg
        std::string command ="C:\\Users\\loris\\AppData\\Local\\K7_YTB_MP3\\K7-YTB-MP3.exe --data \"" + url + "test\"";
        
        // Launching the app with the arg
        system(command.c_str());
    }

    std::cout << "End of hostk7.exe" << std::endl;
    ofs.close();

    return 0;
}

