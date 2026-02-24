const urlObj = new URL(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash",
);

console.log(urlObj);
/*
{
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}
*/

// Let's parse the URL
console.log(
  URL.parse("https://user:pass@sub.example.com:8080?query=abdur rab khan"),
);

// Building a new URL from BASE URL
const baseURL = "https://example.com";
const newURL = new URL("/path/to/resource?query=string#hash", baseURL);

console.log(newURL); // Same return as the above URL object

// We can standalone use URLSearchParams to parse query strings as well:
const searchParams = new URLSearchParams(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash",
);

console.log(searchParams);
/*
 {   
  size: [Getter],
  append: [Function: append],
  delete: [Function: delete],
  get: [Function: get],      
  getAll: [Function: getAll],
  has: [Function: has],      
  set: [Function: set],      
  sort: [Function: sort],    
  entries: [Function: entries],
  forEach: [Function: forEach],
  keys: [Function: keys],
  values: [Function: values],
  toString: [Function: toString]
}
*/

console.log(urlObj.searchParams.__proto__ === URLSearchParams.prototype); // true => Means under the hood, It uses the URLSearchParams
