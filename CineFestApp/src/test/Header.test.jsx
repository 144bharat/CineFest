import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../components/Header";

describe("Header", () => {
  it("renders CineFest heading", () => {
    render(<Header />);

    expect(screen.getByRole("heading", { name: "CineFest" }))
      .toBeInTheDocument();
  });

  it("renders search button", () => {
    render(<Header />);

    expect(
      screen.getByRole("button", { name: "Search" })
    ).toBeInTheDocument();
  });
});