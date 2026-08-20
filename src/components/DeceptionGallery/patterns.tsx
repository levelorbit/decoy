import type { ReactNode } from "react";
import MisleadingHierarchy from "../MisleadingHierarchy/MisleadingHierarchy";
import ManufacturedUrgency from "../ManufacturedUrgency/ManufacturedUrgency";
import PreselectedOptin from "../PreselectedOptin/PreselectedOptin";
import DisguisedAd from "../DisguisedAd/DisguisedAd";
import Confirmshaming from "../Confirmshaming/Confirmshaming";
import RoachMotel from "../RoachMotel/RoachMotel";

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
    id: "manufactured-urgency",
    title: "Manufactured urgency",
    method: [
      "Exploits the fear of missing the chance, which replaces the question of whether you need this at all.",
      "It asks in two places at once. Close the banner and it comes back. The chip by your name has no close button at all.",
    ],
    render: () => <ManufacturedUrgency />,
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
    id: "confirmshaming",
    title: "Confirmshaming",
    method: [
      "The decline is worded to break your self-image, so refusing costs a small hit of shame that accepting avoids.",
      "Both buttons close the same popup, so the wording does all the work.",
    ],
    render: () => <Confirmshaming />,
  },
  {
    id: "roach-motel",
    title: "Roach motel",
    method: [
      "Easy to join, a burden to leave. Enough friction and giving up feels like your own decision rather than the site’s design.",
      "Deletion is not in the product. It is a form on another site, and they reply by email days later.",
    ],
    render: () => <RoachMotel />,
  },
];
