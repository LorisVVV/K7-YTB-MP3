const { spawn } = require('child_process');

const electron = require('electron'); // chemin vers l'exe
const child = spawn(electron, ['.', '--stdin'], {
  stdio: ['pipe', 'inherit', 'inherit']
});

// Envoie des données à stdin de l'appli
setTimeout(() => {
    child.stdin.write('Test');
    child.stdin.end();
}, 1000);
