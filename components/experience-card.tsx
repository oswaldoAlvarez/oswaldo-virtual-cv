import type { ReactElement, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";

type ExperienceClient =
  | {
      description: string;
      kind: "summary";
      name: string;
    }
  | {
      highlights: string[];
      kind: "detailed";
      name: string;
    };

type ExperienceTechnologies = {
  description: string;
  label: string;
};

type ExperienceItemBase = {
  company: string;
  location: string;
  period: string;
  role: string;
  summary: string;
};

type FreelanceExperienceItem = ExperienceItemBase & {
  clients: ExperienceClient[];
  kind: "freelance";
  overview: string[];
  technologies: ExperienceTechnologies;
};

type StandardExperienceItem = ExperienceItemBase & {
  highlights: string[];
  kind: "standard";
};

export type ExperienceItem = FreelanceExperienceItem | StandardExperienceItem;

type ExperienceCardProps = {
  isFeatured: boolean;
  item: ExperienceItem;
};

const formatHighlight = (highlight: string): ReactNode => {
  const separatorIndex = highlight.indexOf(":");

  if (separatorIndex < 1) {
    return highlight;
  }

  const label = highlight.slice(0, separatorIndex);
  const rest = highlight.slice(separatorIndex);
  const isShortLabel = label.length <= 42;

  if (!isShortLabel) {
    return highlight;
  }

  return (
    <>
      <strong className="portfolio-highlight-label">{label}</strong>
      {rest}
    </>
  );
};

const renderStandardHighlight = (highlight: string): ReactElement => (
  <Text as="li" className="portfolio-highlight-item" key={highlight}>
    {formatHighlight(highlight)}
  </Text>
);

const renderOverviewParagraph = (paragraph: string): ReactElement => (
  <Text className="portfolio-freelance-overview-text" key={paragraph}>
    {paragraph}
  </Text>
);

const renderClientHighlight = (highlight: string): ReactElement => (
  <Text as="li" className="portfolio-client-highlight-item" key={highlight}>
    {highlight}
  </Text>
);

const renderClient = (client: ExperienceClient): ReactElement => {
  const clientSummary =
    client.kind === "summary" ? `: ${client.description}` : undefined;
  const clientHighlights =
    client.kind === "detailed" ? (
      <ul className="portfolio-client-highlight-list">
        {client.highlights.map(renderClientHighlight)}
      </ul>
    ) : null;

  return (
    <li className="portfolio-client-item" key={client.name}>
      <Text as="span">
        <strong className="portfolio-highlight-label portfolio-client-name">
          <em>{client.name}</em>
        </strong>
        {clientSummary}
      </Text>
      {clientHighlights}
    </li>
  );
};

const renderExperienceDetails = (item: ExperienceItem): ReactElement => {
  if (item.kind === "standard") {
    return (
      <ul className="portfolio-highlight-list space-y-2">
        {item.highlights.map(renderStandardHighlight)}
      </ul>
    );
  }

  return (
    <>
      <div className="portfolio-freelance-overview space-y-2">
        {item.overview.map(renderOverviewParagraph)}
      </div>
      <ul className="portfolio-client-list space-y-2">
        {item.clients.map(renderClient)}
      </ul>
      <Text className="portfolio-technologies">
        <strong className="portfolio-highlight-label">
          {item.technologies.label}
        </strong>
        {`: ${item.technologies.description}`}
      </Text>
    </>
  );
};

export const ExperienceCard = ({
  isFeatured,
  item,
}: ExperienceCardProps): ReactElement => {
  const cardClassName = isFeatured
    ? "portfolio-experience-card portfolio-experience-card-featured"
    : "portfolio-experience-card";
  const experienceDetails = renderExperienceDetails(item);

  return (
    <Card className={cardClassName}>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <Heading as="h3" variant="card" className="leading-snug">
            {item.role}
          </Heading>
          <Text className="portfolio-company mt-2" variant="label">
            {item.company}
          </Text>
        </div>
        <Text as="span" className="portfolio-period" variant="muted">
          {item.period}
        </Text>
      </div>
      <Text className="mb-3" variant="muted">
        {item.location}
      </Text>
      <Text className="portfolio-experience-summary mb-4">{item.summary}</Text>
      {experienceDetails}
    </Card>
  );
};
