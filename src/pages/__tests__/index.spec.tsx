import { server, trpc } from "@/tests/mockServer";
import { render, screen, waitFor } from "@/tests/render";
import Home from "../index";

describe("Home page", () => {
  it("renders a loading state while data is being loaded", async () => {
    server.use(
      trpc.outlet.getAll.query((_req, res, ctx) => {
        return res(ctx.data([]));
      })
    );

    render(<Home />);

    const element = screen.getByText("Loading...");
    expect(element).toBeInTheDocument();

    await waitFor(() => {
      const element = screen.getByText("No outlets found");
      expect(element).toBeInTheDocument();
      screen.debug();
    });
  });

  it("renders a list of outlets", async () => {
    server.use(
      trpc.outlet.getAll.query((_req, res, ctx) => {
        return res(
          ctx.data([
            { id: "1", name: "outlet 1" },
            { id: "2", name: "outlet 2" },
          ])
        );
      })
    );

    render(<Home />);

    await waitFor(() => {
      const outlet1 = screen.getByText("outlet 1");
      expect(outlet1).toBeInTheDocument();

      const outlet2 = screen.getByText("outlet 2");
      expect(outlet2).toBeInTheDocument();
      screen.debug();
    });
  });
});
