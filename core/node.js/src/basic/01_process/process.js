import { spawn } from "node:child_process";
import { once } from "node:events";

const child = spawn("ls", ["-l"]);

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

child.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

const c = once(child, "close");
c.then(([code]) => {
  console.log(`child process exited with code ${code}`);
});
