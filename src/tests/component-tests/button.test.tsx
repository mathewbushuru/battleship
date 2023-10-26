import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "@/components/ui/button";

describe("<Button />", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const result = render(<Button />);

    expect(result.getByRole("button")).toBeInTheDocument();
  });

  it("applies default variant and size classes", () => {
    const result = render(<Button />);

    const button = result.getByRole("button");
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("h-14");
  });

  it("applies different variant and size classes", () => {
    const result = render(<Button variant="outline" size="lg" />);

    const button = result.getByRole("button");
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("h-16");
  });

  it("handles onClick events", () => {
    const handleClickMock = vi.fn();
    const result = render(<Button onClick={handleClickMock} />);

    const button = result.getByRole("button");
    fireEvent.click(button);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  })
});
