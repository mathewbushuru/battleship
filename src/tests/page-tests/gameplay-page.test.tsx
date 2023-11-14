import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import { render } from "@/tests/test-utils";
import GamePlayPage from "@/pages/gameplay-page";

vi.mock("react-router-dom", async (importOriginal) => {
  const actualModule: any = await importOriginal();
  return {
    ...actualModule,
    useNavigate: vi.fn().mockImplementation(() => vi.fn()),
    useLocation: vi.fn().mockReturnValue({pathname: "/gameplay"}),
  };
});

describe("/gameplay route", () => {
  afterEach(cleanup);

  it("renders gameplay page without crashing", () => {
    const result = render(<GamePlayPage />);
    expect(result.getByTestId("GameplayPage")).toBeInTheDocument();
  });

  it.todo("it redirects to placement route if page is directly visited before placement")
});
