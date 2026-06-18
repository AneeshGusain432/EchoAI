import "dotenv/config";
import { createServer } from "node:http";
import createExpressApplication from "./app/app.js";

async function main() {
  const server = createServer(createExpressApplication());
  const PORT = process.env.PORT;

  server.listen(PORT, () => {
    console.log(`server is running on port${PORT}`);
  });
}

main();
