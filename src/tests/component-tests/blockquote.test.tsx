import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

import Blockquote from "@/components/ui/blockquote";

describe("<Blockquote />", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const sampleQuote =
      "Software and cathedrals are much the same; first we build them, then we pray.";
    const result = render(
      <Blockquote quote={sampleQuote} author="Anonymous" />,
    );

    expect(result.getByText("Anonymous")).toBeInTheDocument();
    expect(result.getByText(`"${sampleQuote}"`)).toBeInTheDocument();
  });
});
