import PageShell from "@/components/PageShell";

export const metadata = { title: "Contact, ARC GENESIS" };

// Public contact = email + area-level address only (owner's choice for privacy). The KYC phone and
// full flat address stay private (Razorpay account only) — not shown on the site.
const ADDRESS_LINE = "Dnyaneshwar Nagar, Dargah Sutgirni Road";
const PIN = "431009";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/10 py-5 first:border-t-0">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </div>
      <div className="mt-1.5 text-[15px] text-foreground">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Talk to us"
      intro="Questions about the product, your account, billing or a refund? Here is how to reach us."
    >
      <div className="max-w-2xl">
        <Row label="Business">ARC GENESIS (sole proprietorship)</Row>
        <Row label="Proprietor">Dwijaa Mehta</Row>
        <Row label="Email">
          <a className="underline hover:text-foreground" href="mailto:contact@arcgenesis.ai">
            contact@arcgenesis.ai
          </a>
        </Row>
        <Row label="Registered address">
          {ADDRESS_LINE}
          <br />
          Chhatrapati Sambhajinagar (Aurangabad), Maharashtra {PIN}, India
        </Row>
        <Row label="Support hours">Monday to Saturday, 10:00–18:00 IST</Row>
        <Row label="Reach us">
          Email is the fastest way to reach us. Write to{" "}
          <a className="underline hover:text-foreground" href="mailto:contact@arcgenesis.ai">
            contact@arcgenesis.ai
          </a>{" "}
          and we respond within 2 business days.
        </Row>
      </div>

      <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-muted">
        For billing and refunds, see the{" "}
        <a className="underline hover:text-foreground" href="/refund">
          Refund &amp; Cancellation Policy
        </a>
        . For how we handle your data, see the{" "}
        <a className="underline hover:text-foreground" href="/privacy">
          Privacy Policy
        </a>
        .
      </p>
    </PageShell>
  );
}
