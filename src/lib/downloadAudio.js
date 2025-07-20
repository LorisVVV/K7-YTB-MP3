

export default async function downloadAudio(url) {
    const { execFile } = require("child_process");
    const path  = require("path");
    const os = require('os');

    const downloadsFolder = path.join(os.homedir(), 'Downloads');
    const outputPath = path.join(downloadsFolder, `audio-${Date.now()}.mp3`);
    const ytDlpPath = path.join(__dirname, 'bin', 'yt-dlp.exe');

    const args = [
        url,
        '-f', 'bestaudio',
        '-x',
        '--audio-format', 'mp3',
        '--audio-quality', '0',   
        '-o', outputPath
    ];

    execFile(ytDlpPath, args)

}