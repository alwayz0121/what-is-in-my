import { z } from "zod";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  provider: z.enum(["kakao"]),
});

export const loader = async ({ params, request }: any) => {
  const { success } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/login");
  }
  
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return redirect("/login");
  }
  
  const { client, headers } = makeSSRClient(request);
  const { error } = await client.auth.exchangeCodeForSession(code);
  
  if (error) {
    throw error;
  }
  
  return redirect("/dashboard", { headers });
};

export default function KakaoCompletePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">로그인을 완료하고 있습니다...</p>
      </div>
    </div>
  );
}
