import { z } from "zod";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  provider: z.enum(["kakao"]),
});

export const loader = async ({ params, request }: any) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/login");
  }
  
  const { provider } = data;
  const redirectTo = `${import.meta.env.VITE_BASE_URL || "http://localhost:5173"}/auth/social/${provider}/complete`;
  const { client, headers } = makeSSRClient(request);
  
  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
  
  if (url) {
    return redirect(url, { headers });
  }
  
  if (error) {
    throw error;
  }
};

export default function KakaoStartPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">카카오 로그인을 진행하고 있습니다...</p>
      </div>
    </div>
  );
}
