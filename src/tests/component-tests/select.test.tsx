import { describe, it, afterEach, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

describe("<Select />", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const result = render(
      <Select defaultValue="one">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
          <SelectItem value="two">Two</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(result.getByText("One")).toBeInTheDocument();
  });
});
