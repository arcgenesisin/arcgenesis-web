import PageShell from "@/components/PageShell";

export const metadata = { title: "Refund & Cancellation Policy, ARC GENESIS" };

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function RefundPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Refund & Cancellation Policy"
      intro="How billing, cancellation and refunds work for ARC GENESIS plans, in plain language."
    >
      <div className="max-w-3xl">
        <p className="text-sm text-muted">
          Effective date: 30 July 2026 · <strong>ARC GENESIS</strong> (sole
          proprietorship), Chhatrapati Sambhajinagar (Aurangabad), Maharashtra,
          India · Payments processed by Razorpay.
        </p>

        <S title="What you are paying for">
          <p>
            ARC GENESIS is a digital service. Plans and prices are listed on our{" "}
            <a className="underline hover:text-foreground" href="/pricing">
              Pricing page
            </a>
            . All prices are in Indian Rupees (₹). Monthly plans are billed in
            advance for each billing cycle; the Single Project plan is a one-time
            charge.
          </p>
        </S>

        <S title="Cancelling a monthly subscription">
          <p>
            You can cancel a monthly plan at any time from your account
            (Subscription page) or by emailing us. When you cancel:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              You are <strong>not charged again</strong> — the automatic renewal
              (UPI Autopay / card mandate) stops.
            </li>
            <li>
              You <strong>keep access until the end of the cycle you have
              already paid for</strong>; access ends at that date.
            </li>
            <li>
              The current cycle&rsquo;s fee is not pro-rated or refunded, because
              the service for that cycle has already been made available to you.
            </li>
          </ul>
        </S>

        <S title="The Single Project (one-time) plan">
          <p>
            The Single Project plan gives you one project across the engines. As
            it is delivered digitally and immediately, it is{" "}
            <strong>non-refundable once you have started using the project</strong>{" "}
            (opened an engine, run an assessment, or generated any output). If you
            paid but did not use the project at all, contact us within{" "}
            <strong>7 days</strong> of payment and we will refund it in full.
          </p>
        </S>

        <S title="When we always refund">
          <p>We refund in full, regardless of the above, when:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              You were <strong>charged twice</strong> for the same plan
              (duplicate payment).
            </li>
            <li>
              You were charged but, due to a <strong>technical failure on our
              side</strong>, the plan was never activated and access was never
              provided.
            </li>
            <li>
              A payment was taken in error or through an unauthorised transaction
              you report to us promptly.
            </li>
          </ul>
        </S>

        <S title="How to request a refund">
          <p>
            Email{" "}
            <a className="underline hover:text-foreground" href="mailto:contact@arcgenesis.ai">
              contact@arcgenesis.ai
            </a>{" "}
            from your registered email with the payment reference (the Razorpay
            payment id from your receipt) and a one-line reason. We respond within
            2 business days.
          </p>
        </S>

        <S title="How refunds are paid">
          <p>
            Approved refunds are returned to the{" "}
            <strong>original payment method</strong> through Razorpay. Once
            approved, the amount typically reaches your account within{" "}
            <strong>5–7 business days</strong>, depending on your bank or UPI
            provider.
          </p>
        </S>

        <S title="No shipping">
          <p>
            ARC GENESIS is a software service delivered online. There is no
            physical shipping or delivery, so no shipping charges or shipping
            timelines apply.
          </p>
        </S>

        <S title="Questions">
          <p>
            For anything about billing, cancellation or a refund, write to{" "}
            <a className="underline hover:text-foreground" href="mailto:contact@arcgenesis.ai">
              contact@arcgenesis.ai
            </a>{" "}
            or see our{" "}
            <a className="underline hover:text-foreground" href="/contact">
              Contact page
            </a>
            .
          </p>
        </S>
      </div>
    </PageShell>
  );
}
