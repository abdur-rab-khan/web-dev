// Path is a tool in node js to handle file and directory paths. It provides cool method to work with file and directory paths.
import * as path from "node:path";

// Global node:path, will return result based on the platform, But "node:path/posix || node:path/win32" will return result based on the platform we choose.

// 1. basename(): It will return the last part of the path url.
console.log(path.basename("/home/user/dir/file.txt")); // file.txt

// On the other hand we could use platform specific path module to get the result based on the platform we choose.
console.log(path.posix.basename("/home/user/dir/file.txt")); // file.txt => It will return the last part of the path url based on posix platform.
console.log(path.win32.basename("C:\\Users\\user\\dir\\file.txt")); // file.txt => It will return the last part of the path url based on win32 platform.

// 2. dirname(): It will return the directory name of the path url.
console.log(path.dirname("/home/user/dir/file.txt")); // /home/user/dir
console.log(path.posix.dirname("/home/user/dir/file.txt")); // /home/user/dir => It will return the directory name of the path url based on posix platform.
console.log(path.win32.dirname("C:\\Users\\user\\dir\\file.txt")); // C:\Users\user\dir => It will return the directory name of the path url based on win32 platform.

// 2. extname(): It will return the extension name of the path url.
console.log(path.extname("/home/user/dir/file.txt")); // .txt
console.log(path.posix.extname("/home/user/dir/file.md")); // .md => It will return the extension name of the path url based on posix platform.
console.log(path.win32.extname("C:\\Users\\user\\dir\\file.pdf")); // .pdf => It will return the extension name of the path url based on win32 platform.

// 3. format(): It will return a path string based on given object, it opposite of parse() method will convert path into object.
console.log(
  path.format({
    root: "C:\\",
    dir: "D:\\Users\\user\\dir", // If dir is provided, it will ignore root property.
    base: "file.txt", // If base is provided, it will ignore name and ext properties.
    name: "cache",
    ext: ".md",
  }),
); // D:\\Users\\user\\dir\\file.txt

// 4. parse(): It will return an path object in the same format of path.format argument object, based on the path url
console.log(path.parse("D:\\Users\\TEMP\\cache.md"));

// 5. path.matchesGlob("actual_path", "pattern_for_checking"): It will return true/false based on whether "actual_path" match with the "pattern_for_checking".
console.log(
  path.matchesGlob("C:\\Window\\User\\john.txt", "C:\\Window\\User\\*"),
);

// 6. path.join([...path]): It will return full url based on given part url
console.log(path.join("D:\\Users\\user", "abdurrab\\home", "hello.txt")); // D:\Users\user\abdurrab\home\hello.txt

// 7. path.sep: Return platform specific path segment separator EXAMPLE: "/" on POSIX, "\\" on WINDOW
