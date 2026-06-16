# K7-YTB-MP3
Windows desktop app for convert youtube URL to mp3 file. This is an interface of yt-dlp, an actual app not coded by me, to make it more friendly.

# Release - Downloading the app
You will find the setup file in a .rar file in the release, you will have to unzip it and launch the setup.exe file. Keep in mind that this app have been made for Windows only. Always choose the latest release.

# Chrome extension
A chrome extension is also available, it shows a button next to the title of every video on youtube, once clicked the app will launch with the input already filled with the proper url.

# How to use it
- Past your url in the input
- Press the download icon
- At the end of the downloading a checkmark will appear instead of the download icon
- If an error occur a X icon will show instead, you can have the detail of the error by checking the show error parameter
- You can indicate in which directory you want the mp3 file to be downloadby selecting it with the "select directory" button. Once you choose one hovering the icon will show which directory is chosen. If you do not choose one it will be download in the Downloads directory by default.

# About the code
As github don't like big files to make this code work you will need to add a file named src/bin/ with the .exe of ffmpeg and yt-dlp (named ffmpeg.exe and yt-dlp.exe). No need for that if you downloading the app from the release.

It's using basic electron to display web page as desktop app.
On the first launch the app will automatically register itself so that the extension can communicate with it.
To do the communication between the extension and the app a .exe written in c++ has been made. This app read the stdin, retrieve the url, put it on a .txt file and launch the app if it's not already launch. You will have to re compile the cpp after any changes before compiling the full app.

The app have a watcher on the .txt file so that if it's changed it retrieve the data and put it in the input.