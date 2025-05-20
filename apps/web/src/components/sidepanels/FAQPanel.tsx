import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/Accordion";

export function FAQPanel() {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Which wallets are compatible with Orbit Relay?
        </AccordionTrigger>
        <AccordionContent>
          Orbit Relay supports all major Solana wallets including Phantom, Solflare, Backpack, and Sollet.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          How much do transactions cost on Orbit Relay?
        </AccordionTrigger>
        <AccordionContent>
          Transaction fees are minimal and based on the Solana network's current rates. By utilizing compressed token
          technology, we significantly reduce gas costs.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          What security measures does Orbit Relay implement?
        </AccordionTrigger>
        <AccordionContent>
          We employ industry-leading security practices including non-custodial operations, encrypted connections, and
          regular security audits.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          How does Orbit Relay integrate with Light Protocol?
        </AccordionTrigger>
        <AccordionContent>
          Orbit Relay leverages Light Protocol's compression technology to enable efficient token operations with
          reduced on-chain footprint.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}