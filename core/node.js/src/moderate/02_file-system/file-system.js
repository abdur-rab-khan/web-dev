import {
  access,
  open,
  readFile,
  constants,
  unlink,
  stat,
} from "node:fs/promises";

const SHORT_TEXT_PATH = "./test.txt";
const LONG_TEXT_PATH = "./long-text.txt";

// To handle file in node.js we have "<FileHandle>" object that's created using "node:fs -> open".
// "<FileHandle>" objects are "<EventEmitter>s"

// a. open(path, flags): It open the file for performing tasks such as reading, writing, update the permissions and close the file
//  - path: string
//  - flags: default ('r' read only), ('w' write only), ('w+', write + read only), ('a', file for appending), ('a+', file for appending + reading);
const handleFile = await open(SHORT_TEXT_PATH, "a+");

// Important methods for file handling

/*
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                            READ FILE                                                                                                        |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/

// 1. readFile(options): Reading the file content from opened file, if already performed any operation on file and "cursor" got displaced, it will show the content from that place.
// 2. appendFile(data, options): It appends the file at the end, it totally depends on the mode, It only append at the end if set it to 'a' otherwise it's similar to "writeFile()".
// 3. readLines(options): It's simple way to read file into chunks, for advance we could use "handleFile.createReadStream()".

async function readMethods() {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const fileContents = await handleFile.readFile({
    encoding: "utf-8",
    signal: undefined,
  });
  console.log("File contents are: \n\n", fileContents);

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  await handleFile.appendFile("\nAPPENDING THE FILE", {
    encoding: "utf-8",
    signal: undefined, // AbortSignal
  });

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const fileChunks = handleFile.readLines({
    start: 0,
    encoding: "utf-8",
  });

  console.log("File chunks are:\n\n");
  for await (const chunks of fileChunks) {
    console.log(chunks);
  }

  // 4. createReadStream(options):
  // const largeFile = await open(LONG_TEXT_PATH, "r");
  // const stream = largeFile.createReadStream({
  //   start: 0,
  // });
}

/*
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                           WRITE FILE                                                                                                        |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/

// 1. writeFile(data, options: {encoding, signal}): It write into the file, If data already there in the file it will replace them.
// 2. createWriteStream(options):

async function writeMethods() {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const testFile = await open(SHORT_TEXT_PATH, "w");

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  testFile.writeFile(
    "Using writeFile method replacing the whole content by this",
    {
      encoding: "utf-8",
    },
  );

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // READING THE FILE (fresh read from path to avoid the end-of-file cursor)
  console.log("File contents are: ", await readFile(SHORT_TEXT_PATH, "utf-8"));
}

/*
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                     HANDLE DIRECTORY                                                                                                        |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/

// 1. access(path, ...modes): It is used to check whether file/folder exists, check whether it has correct mode, If not then it will throw an error.
// 2. unlink("path"): It path is a "symbolic link" than it will removed but if it's a file path then file will be removed.
// 2. rm(path, options: {force: boolean, maxReties: number, recursive: boolean, retryDelay: boolean}):
// 3. mkdir():
// 4. stat():
// 5. rename():

async function directoryMethods() {
  // +-------------------------------------------------------------------------------------------- ACCESS ----------------------------------------------------------------------------------------------------+
  try {
    await access("./test.txt", constants.R_OK, constants.W_OK);
    console.log("Has access");
  } catch (err) {
    console.error(err?.message.toString() ?? err);
  }

  // +-------------------------------------------------------------------------------------------- UNLINK ----------------------------------------------------------------------------------------------------+
  try {
    await unlink("./test-dir-1"); // Error: It can't works with directory path.
    console.log("Deleted using unlink");
  } catch (err) {
    console.error(err?.message.toString() ?? err);
  }

  // +---------------------------------------------------------------------------------------------- RM ------------------------------------------------------------------------------------------------------+

  // +---------------------------------------------------------------------------------------------- STAT ------------------------------------------------------------------------------------------------------+
  try {
    const dirStat = await stat("./test-dir-1/b.txt");
    console.log("Stat is: ", dirStat);
  } catch (err) {
    console.error(err?.message.toString() ?? err);
  }
}

// Calling all function

// await readMethods();
// await writeMethods();
await directoryMethods();
