const { spawn } = require('child_process');
const electron = require('electron');
const fs = require('fs');

const child = spawn(electron, ['--stdin', '.'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  env: { ...process.env, ELECTRON_STDIN: '1' }
});

console.log('stdin du child détruit ?', child.stdin.destroyed);
// Redirige stdin du launcher vers Electron
process.stdin.pipe(child.stdin);


process.stdin.on('data', (value) => {
    console.log(value.toString());

    fs.writeFileSync('C:\\Users\\loris\\Documents\\test.txt', value.toString());
    // child.stdin.write(value)
})

setTimeout(() => {
    fs.writeFileSync('C:\\Users\\loris\\Documents\\test.txt', 'test2');
}, 1000);

child.on('exit', (code) => process.exit(code));
