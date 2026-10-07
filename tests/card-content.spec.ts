import { test, expect } from "@playwright/test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { OfferingCard } from "../components/courses/OfferingCard";
import type { Offering } from "../lib/api/types";

const offering: Offering = { slug: "fixture-course", title: "Advanced Computer Science with Artificial Intelligence and Professional Practice", university: null, placement: false, demo: false };

test("compact card handles missing metadata without estimates, images or application controls", () => {
  const html = renderToStaticMarkup(createElement(OfferingCard, { offering, compact: true }));
  expect(html).toContain(offering.title);
  expect(html.match(/Not provided/g)).toHaveLength(2);
  expect(html).toContain('href="/courses/at/fixture-course"');
  expect(html).not.toContain("<img");
  expect(html).not.toContain("Scholarship:");
  expect(html).not.toContain("Apply now");
  expect(html).not.toContain("Estimated figures");
  expect(html).not.toContain("Full-time");
});

test("compact card preserves supplied prose and clamps long content", () => {
  const html = renderToStaticMarkup(createElement(OfferingCard, { compact: true, offering: { ...offering, feeText: "International tuition: £16,000 per academic year", scholarshipText: "£2,000 subject to eligibility", durationYears: 3, qualification: "BSc", level: "Undergraduate", intake: "September", university: { slug: "fixture-university", name: "Fixture University", city: "London" } } }));
  for (const value of ["£16,000", "£2,000", "September", "Undergraduate", "BSc", "London", "3 years"]) expect(html).toContain(value);
  expect(html).toContain("line-clamp-2");
  expect(html).toContain("line-clamp-1");
});
