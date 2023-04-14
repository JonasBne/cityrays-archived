import { type Session } from "next-auth";
import { appRouter } from "../../root";
import { createInnerTRPCContext } from "../../trpc";

describe("getSecretMessage", () => {
  it("returns the response from a protected procedure", async () => {
    const session = {
      user: {
        id: "1",
        email: "jonas.boone@domain.com",
        roles: ["admin"],
      },
      expires: "",
    } as Session;

    const caller = appRouter.createCaller(createInnerTRPCContext({ session }));

    const result = await caller.outlet.getSecretMessage();

    expect(result).toEqual({
      message: "you can now see the secret message",
    });
  });
});
