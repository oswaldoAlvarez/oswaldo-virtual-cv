import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ExperienceCard,
  type ExperienceItem,
} from "@/components/experience-card";

const freelanceExperience: ExperienceItem = {
  clients: [
    {
      highlights: ["Delivered a production feature."],
      kind: "detailed",
      name: "BITNOVO / BITSA / B4BIT",
    },
    {
      description: "Maintained the wallet.",
      kind: "summary",
      name: "STABLE.IO",
    },
  ],
  company: "Freelance",
  kind: "freelance",
  location: "Remote",
  overview: ["General freelance responsibility."],
  period: "Present",
  role: "Engineer",
  summary: "Freelance summary.",
  technologies: {
    description: "React Native and TypeScript.",
    label: "Main technologies",
  },
};

describe("ExperienceCard", () => {
  it("reserves company markers for clients and nests their work separately", () => {
    const { container } = render(
      <ExperienceCard isFeatured item={freelanceExperience} />,
    );

    const overview = screen.getByText("General freelance responsibility.");
    const client = screen.getByText("BITNOVO / BITSA / B4BIT");
    const clientHighlight = screen.getByText("Delivered a production feature.");
    const technologies = screen.getByText(/React Native and TypeScript/);

    expect(overview.closest("li")).toBeNull();
    expect(client.closest("li")).toHaveClass("portfolio-client-item");
    expect(client.closest("li")).toHaveTextContent(
      "BITNOVO / BITSA / B4BIT:",
    );
    expect(screen.getByText("STABLE.IO").closest("li")).toHaveTextContent(
      "STABLE.IO: Maintained the wallet.",
    );
    expect(clientHighlight.closest("li")).toHaveClass(
      "portfolio-client-highlight-item",
    );
    expect(technologies.closest("li")).toBeNull();
    expect(container.querySelectorAll(".portfolio-client-item")).toHaveLength(2);
  });
});
