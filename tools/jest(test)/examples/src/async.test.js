beforeAll(() => console.log("Start Testing async.test.js"));

function demoPromise(does = "resolve") {
  return new Promise((resolve, reject) => {
    if (does === "reject") reject("rejected");

    setTimeout(() => {
      resolve("done");
    }, 300);
  });
}

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: "123",
        name: "jest",
        by: "facebook",
      });
    }, 2000);
  });
}

function getCallback(callback) {
  fetchData()
    .then((d) => {
      callback(d, null);
    })
    .catch((err) => {
      callback(null, err);
    });
}

describe("Testing Asynchronous code", () => {
  test("Using Promise", () => {
    return demoPromise().then((v) => {
      expect(v).toBe("done");
    });
  });

  test("Using Promise for reject", () => {
    return demoPromise("reject").catch((r) => {
      expect(r).toMatch(/rejected/);
    });
  });

  test("Using async/await", async () => {
    const data = await demoPromise();
    expect(data).toBe("done");
  });

  test("Using async/await for rejected", async () => {
    try {
      await demoPromise("reject");
    } catch (err) {
      expect(err).toBe("rejected");
    }
  });

  //   Always use "await" or "return", otherwise it can't be work -> test will complete before resolve/reject happen
  test("Using async/await with resolves", async () => {
    await expect(demoPromise()).resolves.toBe("done");
  });

  test("using async/await with rejects", async () => {
    expect.assertions(1);

    await expect(demoPromise("reject")).rejects.toBe("rejected");
  });

  test("test fetchData values", async () => {
    expect.assertions(2);

    const data = await fetchData();

    expect(data.id).toBe("123");
    expect(data.name).toBe("jest");
    // expect(data.by).toBe("facebook"); ❌ assertions -> 2 that's why only two test expected.
  });

  test("test callback function", (done) => {
    function callBack(data, err) {
      if (err) {
        done(err);
        return;
      }

      try {
        expect(data).toEqual({
          id: "123",
          name: "jest",
          by: "facebook",
        });
        done();
      } catch (error) {
        done(error);
      }
    }

    getCallback(callBack);
  });
});
