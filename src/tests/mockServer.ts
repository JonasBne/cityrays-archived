import { type AppRouter } from "@/server/api/root";
import { createTRPCMsw } from "msw-trpc";
import { setupServer } from "msw/node";
import superjson from "superjson";

export const server = setupServer();

export const trpc = createTRPCMsw<AppRouter>({
  transformer: {
    input: superjson,
    output: superjson,
  },
});
