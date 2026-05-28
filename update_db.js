const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');
const db = new sqlite3.Database('./backend/novapay.db');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('⚠️  This will reset ALL user balances to Rs 50,000. Are you sure? (yes/no): ', (answer) => {
  rl.close();
  if (answer.toLowerCase() !== 'yes') {
    console.log('Cancelled.');
    db.close();
    return;
  }
  db.serialize(() => {
    db.run("UPDATE users SET balance = 50000.0", (err) => {
      if (err) console.error(err);
      else console.log('✅ Successfully injected 50,000 baseline capital into all user accounts.');
    });
  });
  db.close();
});
