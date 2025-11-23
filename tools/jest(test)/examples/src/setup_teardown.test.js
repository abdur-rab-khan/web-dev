async function connectDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Database connected successfully");
    }, 2000);
  });
}

async function disconnectDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Database disconnected successfully");
    }, 2000);
  });
}

beforeEach(async () => {
  console.log("Connecting to database for each: ");
  await connectDatabase();
});

afterEach(async () => {
  console.log("disconnecting to database for each: ");
  await disconnectDatabase();
});

test("testing setup teardown", () => {
  expect(2 + 2).toBe(4);
});
