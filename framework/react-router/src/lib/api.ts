const pathData: Record<string, { message: string }> = {
  "/": {
    message: "Data loaded for Home Page",
  },
  "/about": {
    message: "Data loaded for About Page",
  },
  "/contact": {
    message: "Data loaded for Contact Page",
  },
};

const dummyPromise = (path: string) => {
  const randomDelay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1-3 seconds

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pathData[path] || { message: "No data found for this path" });
    }, randomDelay);
  });
};

export { dummyPromise };
