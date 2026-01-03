import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENT_VAR: z.string(),
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string().length(32)
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    // SERVER_VAR: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes
   * (e.g. middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // client
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    // server
    NODE_ENV: process.env.NODE_ENV
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});
