# Integration completed locally

The reviewed feature/landing commit `132c7e8` has been integrated into local main as a normal content integration, avoiding its unrelated Git history.

Included: new hero and shared visual styling, subject exploration cards, featured universities, costs/funding section, application tour, and the eligibility calculator with subject/region filters.

Preserved: live offering autocomplete and its API route, offering counts, persistent journey selection and the `#route` anchor. Popular cards now link to live subject searches instead of combining fictional course/university data. Unknown tuition is excluded and has an explicit empty state. The funding CTA links to the available money guide. Package versions and the lockfile were retained.

Validation: Next route generation and TypeScript passed; six targeted tuition/eligibility cases passed; homepage and eligibility returned HTTP 200 with expected markup and no streamed error template; autocomplete returned six Nursing offerings out of 47 matches; diff check passed with no unresolved Git entries. Browser automation was unavailable, so a visual/interaction review remains for local testing. A fresh full production build was not run for this final integration; the earlier build limitations below still apply.

Test at http://localhost:3000 (existing dev server), and http://localhost:3000/resources/eligibility. If the server is stopped, run `npm run dev`.

Recovery files: `/tmp/ignition-before-landing-integration/working-files.tar.gz` and `before.patch` preserve the original working files and tracked diff, including pre-existing local work. The integration does not push or deploy. The existing modified `tsconfig.tsbuildinfo` is excluded from the integration commit.

---

The following is the historical review made before integration. Its findings above have been addressed in the local integration as described here.

# feature/landing merge review

Reviewed 4 October 2026. This is a source and integration feasibility review, not deployment approval.

## Verdict

The homepage changes can be integrated with the current homepage, but the remote branch is not suitable for a normal Git merge. Reconstruct its content changes on a branch based on current main, preserve the local live-search work, and fix the data and navigation issues below before release.

## Revisions and scope

- Repository: NlogN-Solution/ignition-website.
- Current branch: main, commit 2d334fb (Stop tracking some files).
- Fetched remote feature/landing: 132c7e8091ea318d1de2d60243d0036d2c292836, “updated the homepage”.
- Author: richardpokhrel. Commit time: 2026-10-04 16:08:24 +0545.
- The feature branch contains a single root commit with no parents. The repository is not shallow. There is no merge base with main.
- Comparing complete file trees: 53 changed files, 1,864 insertions and 529 deletions, including binary logo changes. These are tree differences, not a normal merge-base PR diff.
- package.json is unchanged; package-lock.json upgrades Next.js 16.3.2 to 16.3.8, sharp 0.35.3 to 0.35.5, associated platform packages, and several transitive dependencies.

The user's working tree already contained changes to app/page.tsx, components/home/CourseSearch.tsx, tsconfig.tsbuildinfo, and an untracked app/api/courses/suggest/route.ts. These were preserved in the original checkout. The local homepage work switches autocomplete from editorial course fixtures to live offerings, retains a debounced request with abort handling, uses /courses/at/[slug] destinations, and supplies a real offering count.

## Merge experiments

1. Cloned the local repository into /tmp/ignition-merge-review.Re7aPh/repo; the original checkout stayed on main.
2. Attempted a normal merge there. Git returned “fatal: refusing to merge unrelated histories”.
3. Simulated an unrelated-history merge with git merge-tree. It produced 47 add/add conflicts, including shared components, homepage files, styles, lockfile, logo and tracked compiler cache.
4. Generated the tree delta from main to feature/landing, excluding tsconfig.tsbuildinfo.
5. Applied the local homepage edits and new suggestions route to the isolated checkout, then applied the remote delta using git apply --3way.
6. Only app/page.tsx and components/home/CourseSearch.tsx conflicted. Other included changes applied successfully.
7. Resolved those two files in the isolated candidate: retained remote sections and styling, retained local offering count/API autocomplete, combined imports and parallel data fetches, and retained the remote shared popular-search terms.
8. The resulting staged patch passes git diff --cached --check.

This demonstrates practical source compatibility. The temporary candidate intentionally still contains the review findings below; it is not a release-ready implementation.

## What changes on the homepage

| Area | Remote changes | Integration advice |
|---|---|---|
| Hero | New university-focused headline, display font and ink palette; primary CTA changes from /start to /resources/eligibility, secondary CTA to /courses | Can be ported, but retain current typography if preserving the current design is the priority |
| Search | Sharper styling and shared popular terms; still uses editorial courses | Preserve local live-offering logic and API route; port only the desired presentation changes |
| Popular courses | Three course cards with photos, example university, tuition and Apply now links | Rework around real offering records or subject search links before shipping |
| Popular universities | Four catalogue universities selected by employability, then recognition count | Structurally compatible; present as featured selections, not measured popularity |
| Costs and scholarships | Tuition/living-cost summary and three scholarship teasers | Fix missing fee handling and scholarship destination |
| Application journey | Replaces JourneyPipeline with a 736-line animated six-step HowToApply component | Decide explicitly whether to remove the old stored journey-stage interaction |
| Existing sections | Restyles Why UK, Why Ignition, entry cards, next step, community and lead form | Compatible at source level, but requires visual regression review |

The remote page retains metadata and JSON-LD, navbar/footer, next-step and adviser sections. It removes the homepage's #route section wrapper and JourneyPipeline placement. HowToApply is a demonstration carousel with local active-step state; it does not replace JourneyPipeline's persistent “I'm here” journey-stage selection.

## Findings to address before integration

### High: a wholesale remote replacement loses the local search fix

The remote page and CourseSearch still use getCourses(), pass all course suggestions to the browser, and link to /courses/[id]. getCourses() falls back to editorial fixtures when no profile records are available. Replacing these files with remote versions would discard the uncommitted live-offering work. The candidate preserves courseCount, searchOfferings, the suggestions endpoint, request cancellation/debounce and /courses/at/[slug] links.

### High: popular course cards do not establish a real course/university relationship

components/home/PopularCourses.tsx:44–60 selects universities by broad subject. If none match, line 49 uses the entire university list. Therefore a course can display the name, city and fees of a university with no matching subject. Even a broad subject match does not prove that institution teaches the exact course. The text at lines 158–159 nevertheless claims the figures come from a university teaching that course. The Example data badge does not resolve this contradictory assertion.

Use actual Offering records and their university association. Alternatively, show subject exploration cards linking to filtered course results without institution-specific tuition or availability claims. The current Apply now button goes to an editorial course page, not a concrete offering/application; rename it if that destination remains.

### Medium: unknown tuition becomes a zero-pound price

The new homepage takes Math.min/Math.max across every university tuition record. lib/api/map.ts:207 maps absent fees to zero. A single unknown minimum can therefore make the range start at £0; all unknown values display £0–£0. Filter to valid positive published values and render an unavailable/varies state when no valid range exists. The isolated candidate's relevant calculation is app/page.tsx:122–127; CostAndScholarships.tsx:39 renders the numbers without a missing-data guard.

### Medium: scholarship call to action leads away from the promised finder

CostAndScholarships.tsx:102 links “See all scholarships” to /money/scholarships. Existing next.config.ts redirects that route to /money because the finder is disabled. This is not a 404, but the destination does not deliver the stated action. Point it to an appropriate available section and adjust the wording, or deliberately restore and validate the finder.

### Medium: shared design changes affect the whole site

The branch changes app/layout.tsx, app/globals.css, Container, Section, buttons, cards, form controls, filters, navbar/footer, rich text, and motion helpers. It replaces Plus Jakarta Sans with Archivo and IBM Plex Sans, changes color aliases and radii, widens Container from 1240px to 1320px, and changes Section's desktop heading/intro composition and spacing. Importing these files changes non-homepage routes as well. A homepage-only port should scope these changes or reuse the current design primitives.

### Product decision: application tour replaces persistent journey selection

JourneyPipeline writes the selected phase to storageKeys.journeyStage. HowToApply only stores which demonstration is active in component state and automatically advances when visible (with reduced-motion and hover/focus accommodations). Keeping NextStep below it does not preserve the removed homepage phase-selection control. Retain the pipeline or provide an equivalent explicit control if that behavior is still required. Preserve #route if existing external/bookmarked links should continue to work.

### Scope decision: eligibility functionality is also changed

The remote mounts EligibilityCalculator ahead of the existing counsellor assessment and adds subject/region filtering in lib/eligibility/index.ts and the calculator UI. These changes belong together. They are not needed simply to add homepage sections, but the new hero’s “Find My University” promise assumes this instant matcher is available. If omitting eligibility work, retain or adapt the existing hero CTA. Validate empty results, default selections, course counts and existing assessment behavior if included.

### Validation/tooling: dependencies and lint need separate attention

The lockfile changes the installed Next.js and image-processing versions despite an unchanged package.json. Checks using the existing node_modules exercise Next.js 16.3.2, not a clean installation of the remote lockfile's 16.3.8. A final integration needs npm ci and build verification using the chosen lockfile.

The existing npm run lint script invokes next lint. The installed Next.js documentation explicitly says this command was removed and next build does not run lint. This is pre-existing, not introduced by the branch. Configure ESLint/Biome directly before treating lint as a release gate.

## Recommended integration approach

1. Preserve the local homepage work as a commit on a new integration branch based on main, including the untracked suggestions endpoint. Exclude tsconfig.tsbuildinfo from meaningful review.
2. Port the desired file-tree delta rather than merging/cherry-picking the unrelated root commit as-is. The isolated patch test provides a reproducible starting point.
3. For a homepage-only request, keep existing global typography/shared components and adapt the four new sections to those primitives; separate eligibility changes and dependency updates.
4. Preserve the local autocomplete implementation. Select either real offering cards or subject-exploration cards for popular courses.
5. Correct tuition empty-state handling, scholarship navigation, and the journey-stage behavior decision.
6. Validate with the intended lockfile, then visually check mobile and desktop homepage, autocomplete keyboard interaction, course destinations, eligibility, lead capture, reduced motion, and representative non-homepage pages if shared styles are included.
7. Open a normal PR from that integration branch to main. No production merge or push was performed during this review.

## Review artifacts

- Isolated source candidate: /tmp/ignition-merge-review.Re7aPh/repo
- Raw remote tree delta excluding compiler cache: /tmp/ignition-merge-review.Re7aPh/landing.patch
- Local homepage delta (tracked source files): /tmp/ignition-merge-review.Re7aPh/local.patch
- Resolved integration candidate including the new API route: /tmp/ignition-merge-review.Re7aPh/integration-candidate.patch
- Forced-merge conflict output: /tmp/ignition-merge-review.Re7aPh/unrelated-merge.txt

The integration-candidate patch is against committed main and includes the pre-existing local homepage work. Do not apply it blindly on top of the already modified working tree. It is an inspection artifact and still needs the fixes described above.

## Targeted reproductions

Executed the actual pickExampleUniversities function extracted from the candidate with a Nursing course and a catalogue containing only a Business university. It selected that Business university, confirming the unsupported pairing. Also evaluated the fee-range calculation with one unknown (0/0) record and one £15,000–£20,000 record: the result was £0–£20,000, confirming the misleading minimum.

## Validation results

- Current working tree: `tsc --noEmit --incremental false` passed.
- Resolved isolated candidate: `next typegen` followed by `tsc --noEmit --incremental false` passed. An initial check before generated declarations existed reported image-module type errors; regeneration resolved them.
- Resolved candidate: staged diff whitespace/conflict check passed.
- Targeted course/university and tuition reproductions confirmed the findings above.
- Checks reuse the installed dependency tree (Next.js 16.3.2); no clean npm ci against the remote lockfile was performed.
- Browser, mobile, accessibility and live-backend acceptance checks were not performed. No visual parity or deployment-readiness claim is made.
- Production build (`npm run build -- --webpack`): the sandbox attempt repeatedly retried external fetches and was interrupted. The network-enabled retry compiled successfully in 87 seconds and completed its TypeScript stage in 21.4 seconds. Page-data collection then repeatedly timed out on /public/content and /public/course-profiles; generation progressed to 90/121 pages in the final captured output when I interrupted the run after the repeated API timeouts. Full production build is therefore **not verified**, and the timeout alone is not evidence of a branch-introduced code defect.
- The default Turbopack build was not tested; webpack was used for the isolated checkout sharing the installed node_modules.
