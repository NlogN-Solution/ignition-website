/**
 * The "what happens after I apply" sequence, and the questions students
 * actually ask before creating an account.
 *
 * Every stage here corresponds to a real screen in the student portal and a
 * real staff action in the Ignition console. Nothing describes a service that
 * does not exist yet — see `components/apply/whatIgnitionDoes.ts` for the
 * same rule applied to the capability list.
 */
import type { TimelineStage } from "@/components/ui/Timeline";

export const applyWithIgnitionStages: TimelineStage[] = [
  {
    label: "Create your Ignition account",
    description:
      "An email address and a password. If you have been researching on this site, your career result, saved courses and shortlisted universities come across with you.",
    meta: "2 minutes",
  },
  {
    label: "Tell us about yourself",
    description:
      "Your personal details, nationality and contact information. Filled in once, and reused for every application you make.",
    meta: "You",
  },
  {
    label: "Add your academic background",
    description:
      "Your qualifications and grades, your English test if you have taken one, and any work experience that is relevant. Broken into short steps rather than one long form.",
    meta: "You",
  },
  {
    label: "Confirm what you want to study",
    description:
      "Your subject, level, intake and the universities you are interested in. Your shortlist is the starting point, not the final answer — your advisor will talk it through with you.",
    meta: "You",
  },
  {
    label: "Upload your documents",
    description:
      "You are shown exactly which documents are needed and in what format. Upload them from your phone or your laptop, in any order.",
    meta: "You",
  },
  {
    label: "An advisor reviews your profile",
    description:
      "A member of the Ignition team checks your documents and your academic record against what each university asks for, and tells you what is missing or has to be replaced.",
    meta: "Ignition",
  },
  {
    label: "Your application is prepared and sent",
    description:
      "Ignition puts the application together and submits it. You see the date it went, and what stage it has reached.",
    meta: "Ignition",
  },
  {
    label: "Track it from your dashboard",
    description:
      "Every change of status is recorded and dated — under review, more information needed, interview, decision. You are notified rather than left guessing.",
    meta: "Both",
  },
  {
    label: "Offers, visa and pre-departure",
    description:
      "When an offer arrives it appears in the same place, with its conditions and its deadline. Accepting it moves you on to CAS, your visa application and the checklist for arriving in the UK.",
    meta: "Both",
  },
];

export const withIgnitionFaqs = [
  {
    question: "Does it cost anything to create an account?",
    answer:
      "No. Creating your Ignition profile, building your shortlist and having your documents reviewed costs you nothing. Universities charge their own application and tuition fees, and UKVI charges for the visa and the immigration health surcharge — those are paid to them, not to Ignition.",
  },
  {
    question: "Do I have to apply through Ignition to use this site?",
    answer:
      "No. Everything on the public side of Ignition — the career quiz, the course and university guides, entry requirements, costs, the visa guide — is free to use and needs no account. Applying through Ignition is an option, not a toll.",
  },
  {
    question: "Can I still apply to a university directly?",
    answer:
      "Yes. You are free to apply directly, through UCAS, or through another agent at any point. Nothing you do on Ignition prevents that, and you can stop using the portal whenever you want.",
  },
  {
    question: "What happens to the shortlist I built before signing up?",
    answer:
      "It is kept in your browser while you are researching. When you create an account it is copied into your Ignition profile so you do not start again — your career result, your saved courses and universities and anything you compared.",
  },
  {
    question: "Who sees my documents?",
    answer:
      "The Ignition team members working on your application, and the universities you apply to once you and your advisor agree to send an application. Documents are not shared with anyone else.",
  },
  {
    question: "Can Ignition guarantee me a place or a visa?",
    answer:
      "No, and you should be wary of anyone who says they can. Admissions decisions are made by universities and visa decisions by UKVI. What Ignition can do is make sure your application is complete, accurate and sent to courses you actually meet the requirements for.",
  },
];
