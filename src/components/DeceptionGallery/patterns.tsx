import type { ReactNode } from "react";
import Confirmshaming from "../Confirmshaming/Confirmshaming";
import UrgencyScarcity from "../UrgencyScarcity/UrgencyScarcity";
import PreselectedOptin from "../PreselectedOptin/PreselectedOptin";
import RoachMotel from "../RoachMotel/RoachMotel";
import DisguisedAd from "../DisguisedAd/DisguisedAd";
import ButtonHierarchy from "../ButtonHierarchy/ButtonHierarchy";

export type Pattern = {
  id: string;
  title: string;
  method: string;
  render: () => ReactNode;
};

export const patterns: Pattern[] = [
  {
    id: "confirmshaming",
    title: "Confirmshaming",
    method:
      "The decline is worded to break your self-image, so refusing costs a small hit of shame that accepting avoids. In the honest version it reads as a neutral “No, thanks.”",
    render: () => <Confirmshaming />,
  },
  {
    id: "urgency-scarcity",
    title: "Urgency & scarcity tactics",
    method:
      "Exploits the fear of missing the chance, which replaces the question of whether you need this at all. In the honest version it reflects the actual state: “In stock” or “Out of stock,” nothing else.",
    render: () => <UrgencyScarcity />,
  },
  {
    id: "preselected-optin",
    title: "Preselected opt-in",
    method:
      "Exploits the fact that nobody changes defaults, so your inaction counts as consent. In the honest version it’s unchecked.",
    render: () => <PreselectedOptin />,
  },
  {
    id: "roach-motel",
    title: "Roach motel",
    method:
      "Easy to join, a burden to leave. Enough friction and giving up feels like your own decision rather than the site’s design. In the honest version leaving is as easy as joining.",
    render: () => <RoachMotel />,
  },
  {
    id: "disguised-ads",
    title: "Disguised ads",
    method:
      "Borrows the trust you built clicking a thousand real buttons. In the honest version ads look like ads.",
    render: () => <DisguisedAd />,
  },
  {
    id: "misleading-hierarchy",
    title: "Misleading hierarchy",
    method:
      "Visual prominence reads as a recommendation, so the highlighted choice feels like the correct one. In the honest version both buttons are visually equal.",
    render: () => <ButtonHierarchy />,
  },
];
