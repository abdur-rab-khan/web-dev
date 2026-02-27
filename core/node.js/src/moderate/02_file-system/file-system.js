import { open, readFile } from "node:fs/promises";

const SHORT_TEXT_PATH = "./test.txt";
const LONG_TEXT_PATH = "./long-text.txt";

// To handle file in node.js we have "<FileHandle>" object that's created using "node:fs -> open".
// "<FileHandle>" objects are "<EventEmitter>s"

// a. open(path, flags): It open the file for performing tasks such as reading, writing, update the permissions and close the file
//  - path: string
//  - flags: default ('r' read only), ('w' write only), ('w+', write + read only), ('a', file for appending), ('a+', file for appending + reading);
const handleFile = await open(SHORT_TEXT_PATH, "a+");

// Important methods for file handling

// READ OPERATIONS
// 1. readFile(options): Reading the file content from opened file, if already performed any operation on file and "cursor" got displaced, it will show the content from that place.
const fileContents = await handleFile.readFile({
  encoding: "utf-8",
  signal: undefined,
});
console.log("File contents are: \n\n", fileContents);

// 2. appendFile(data, options): It appends the file at the end, it totally depends on the mode, It only append at the end if set it to 'a' otherwise it's similar to "writeFile()".
await handleFile.appendFile("\nAPPENDING THE FILE", {
  encoding: "utf-8",
  signal: undefined, // AbortSignal
});

// 3. readLines(options): It's simple way to read file into chunks, for advance we could use "handleFile.createReadStream()".
const fileChunks = handleFile.readLines({
  start: 0,
  encoding: "utf-8",
});

console.log("File chunks are:\n\n");
for await (const chunks of fileChunks) {
  console.log(chunks);
}

// WRITE OPERATIONS
// 1. write():
const uint8Arr = new Uint8Array([1, 2, 3, 4, 5, 6]);
handleFile.writeFile(uint8Arr);

// READING THE FILE (fresh read from path to avoid the end-of-file cursor)
console.log("File contents are: ", await readFile(SHORT_TEXT_PATH, "utf-8"));
