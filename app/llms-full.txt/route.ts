import { buildLlmsTxt, llmsResponse } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return llmsResponse(buildLlmsTxt({ full: true }));
}
