import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ApiStatus } from "./ApiStatus";

describe("ApiStatus", () => {
  it("shows the API and database status", () => {
    render(
      <ApiStatus health={{ status: "ok", database: "ok", time: "2026-11-01T00:00:00.000Z" }} />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("API: ok · Database: ok");
  });

  it("says when the API can't be reached", () => {
    render(<ApiStatus health={null} />);
    expect(screen.getByRole("status")).toHaveTextContent("API: unreachable");
  });
});
