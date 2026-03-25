const net = require("net");
const client = net.connect(3000);

process.stdin.pipe(client).pipe(process.stdout)
;