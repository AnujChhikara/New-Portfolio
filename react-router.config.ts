import type { Config } from "@react-router/dev/config";
import { BLOG_POST_PATHS } from "./app/lib/blog-posts";

export default {
  ssr: false,
  prerender: ["/", ...BLOG_POST_PATHS],
  future: {
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
