const mockPromise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
        { id: 3, name: "Bob Smith" },
      ]);
    }, 2000);
  });

export async function GET(request: Request) {
  const users = await mockPromise();

  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
}
