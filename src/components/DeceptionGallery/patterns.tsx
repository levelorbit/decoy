import type { ReactNode } from "react";
import MisleadingHierarchy from "../MisleadingHierarchy/MisleadingHierarchy";
import PreselectedOptin from "../PreselectedOptin/PreselectedOptin";
import DisguisedAd from "../DisguisedAd/DisguisedAd";
import HardToLeave from "../HardToLeave/HardToLeave";

export type Pattern = {
  id: string;
  title: string;
  method: string[];
  render: () => ReactNode;
};

/*
 * Ordered the way a customer meets them: arriving, subscribing, setting up,
 * using it, being billed, leaving.
 */
export const patterns: Pattern[] = [
  {
    id: "misleading-hierarchy",
    title: "Misleading hierarchy",
    method: [
      "Visual prominence reads as a recommendation, so the loud choice feels correct and the quiet one feels like a detour.",
      "Both options are there, which is all compliance checks for. Only one is meant to be found.",
    ],
    render: () => <MisleadingHierarchy />,
  },
  {
    id: "preselected-optin",
    title: "Preselected opt-in",
    method: [
      "Exploits the fact that nobody changes defaults, so your inaction counts as consent.",
      "The switches that earn the company money start on; the one that only protects the account starts off.",
    ],
    render: () => <PreselectedOptin />,
  },
  {
    id: "disguised-ads",
    title: "Disguised ads",
    method: [
      "Borrows the trust you built clicking a thousand real posts.",
      "“Ad” sits where the timestamp goes on every other post, same size, same grey. It reads as metadata.",
      "Three of these posts are from brands. One says Ad, one says Suggested for you, and one carries no label. You cannot tell by scrolling which ones were paid for.",
    ],
    render: () => <DisguisedAd />,
  },
  {
    id: "hard-to-leave",
    title: "Hard to leave",
    method: [
      "Easy to start, a slog to stop. Cancelling lives in the product. Finishing it means walking through a new reason to stay on every screen.",
      "Half price for three months, then a free month, then a list of what the workspace takes with it. The button that actually cancels is the last and quietest one. Most people take an offer before they get there.",
    ],
    render: () => <HardToLeave />,
  },
];
