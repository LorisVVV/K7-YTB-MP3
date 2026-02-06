# K7-YTB-MP3
Windows desktop app for convert youtube URL to mp3 file. This is an interface of an actual app to make it more friendly if it brakes it might be not because of this interface.

# Release - Downloading the app
You will find the setup file in a .rar file in the release, you will have to unzip it and launch the setup.exe file. Keep in mind that this app have been made for windows only.

# How to use it
- Past your url in the input
- Press the download icon
- At the end of the downloading a checkmark will appear instead of the download icon
- If an error occur a X icon will show instead, you can have the detail of the error by checking the show error parameter
- You can indicate in which directory you want the mp3 file to be downloadby selecting it with the "select directory" button. Once you choose one hovering the icon will show which directory is chosen.

# About the code
As github don't like big files to make this code work you will need to add a file named src/bin/ with the .exe of ffmpeg and yt-dlp (named ffmpeg.exe and yt-dlp.exe). No need for that if you downloading the app from the release.
It's using electron to display web page as desktop app.
