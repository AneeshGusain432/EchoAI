import { createVercelAiMcpClient, } from "@corsair-dev/mcp";
import { generateText, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";

async function agent(prompt: string, tenantId: string) {
  const url = `http://localhost:${process.env.PORT}/api/v1/mcp`;
  const client = await createVercelAiMcpClient({
    url: url,
    headers: {
      "x-tenant-id": tenantId,
    },
  });

  const tools = await client.tools();

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    system:
      "You are Echo AI. When a user asks to perform an action: Call list_operations first. Find the relevant operation. Call get_schema for that operation. Execute it using run_script. Never tell the user an action is impossible until you have tried the available tools. You have access to Gmail and Google Calendar through Corsair.",
    tools,
    prompt: `${prompt}`,
    stopWhen: stepCountIs(10),
  });

  return text;
}

export default agent;
