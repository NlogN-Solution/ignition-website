import { test, expect } from "@playwright/test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { OfferingSummary } from "../components/courses/OfferingSummary";
import { toOfferingDetail } from "../lib/api/map";
import type { OfferingDetail } from "../lib/api/types";

const offering: OfferingDetail = { slug: "test-course", title: "Public Policy", university: null, placement: false, demo: false, related: [] };

test("missing course facts stay blank without invented fees, language or university", () => {
  const html = renderToStaticMarkup(createElement(OfferingSummary, { offering }));
  for (const label of ["Tuition fee", "Duration", "Apply date", "Start date", "Campus location", "Taught in", "About"]) expect(html).toContain(label);
  for (const unsupported of ["English", "GBP", "NPR", "Scholarships available", "University ranking", "Main campus", "Not provided"]) expect(html).not.toContain(unsupported);
  expect(html.match(/<dd[^>]*><\/dd>/g)).toHaveLength(6);
});

test("course summary preserves API fees, dates, university imagery and supplied course copy", () => {
  const mapped = toOfferingDetail({ id: "test-id", slug: offering.slug, title: offering.title, tuition_fee: 16000, currency: "GBP", duration_years: 1,
    intakes: [{ name: "September 2027", start_date: "2027-09-01", application_deadline: "2027-08-01" }],
    university_profile: { id: "uni-id", slug: "test-university", name: "Test University", city: "London", logo_url: "/test-logo.png", imagery: { hero: "/test-campus.jpg", card: "/test-card.jpg" }, ranking: 120 },
  });
  expect(mapped.universityProfile).toMatchObject({ logo: "/test-logo.png", heroImage: "/test-campus.jpg", cardImage: "/test-card.jpg" });
  const html = renderToStaticMarkup(createElement(OfferingSummary, { offering: mapped, overview: "Supplied programme description." }));
  for (const fact of ["16,000 GBP", "1 year", "1 Aug 2027", "1 Sept 2027", "London", "test-logo.png", "Supplied programme description."]) expect(html).toContain(fact);
  expect(html).not.toContain("NPR");
  expect(html).not.toContain("/ year");
  expect(html).not.toContain("English");
});
