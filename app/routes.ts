import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  { path: "login", file: "routes/login/page.tsx" },
  { path: "signup", file: "routes/signup/page.tsx" },
  { path: "forgot-password", file: "routes/forgot-password/page.tsx" },
  { path: "dashboard", file: "routes/dashboard/page.tsx" },
  { path: "search", file: "routes/search/page.tsx" },
  { path: "profile", file: "routes/profile/page.tsx" },
  { path: "settings", file: "routes/settings/page.tsx" },
  { path: "admin", file: "routes/admin/page.tsx" },
  { path: "storage/new", file: "routes/storage/new/page.tsx" },
  { path: "storage/:id", file: "routes/storage/[id]/page.tsx" },
  { path: "storage/:id/item/:itemId", file: "routes/storage/[id]/item/[itemId]/page.tsx" },
  { path: "auth/social/kakao/start", file: "routes/auth/social/kakao/start.tsx" },
  { path: "auth/social/kakao/complete", file: "routes/auth/social/kakao/complete.tsx" },
  { path: "api/cron/expiry-check", file: "routes/api/cron/expiry-check.ts" }
] satisfies RouteConfig;
