import Link from "next/link";
import styles from "./HostingerPartner.module.css";

const referralUrl = "https://www.hostinger.com/in?REFERRALCODE=Mustafa0203";

function PartnerBadge({ className }: { className?: string }) {
  return (
    <div className={className}>
      <img src="/partners/hostinger-partner-light.webp" alt="Hostinger Partner" width={160} height={60} loading="lazy" className={styles.lightBadge} />
      <img src="/partners/hostinger-partner-dark.webp" alt="Hostinger Partner" width={160} height={60} loading="lazy" className={styles.darkBadge} />
    </div>
  );
}

export default function HostingerPartner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="mt-6">
        <a href={referralUrl} target="_blank" rel="sponsored noopener noreferrer" className="inline-block rounded-xl focus-visible:outline-offset-4">
          <PartnerBadge />
        </a>
        <p className="text-[11px] mt-2" style={{ color: "var(--fg-muted)" }}>
          Coupon: <strong className="select-all">MUSTAFA0203</strong>
        </p>
        <p className="text-[11px] leading-relaxed mt-1 max-w-xs" style={{ color: "var(--fg-muted)" }}>
          We may earn a commission when you purchase through our referral link.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="hosting-partner-heading" className="py-16 lg:py-20" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="rounded-2xl p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="max-w-xl">
            <PartnerBadge className="mb-6" />
            <h2 id="hosting-partner-heading" className="font-syne font-extrabold text-2xl lg:text-3xl tracking-tight mb-3" style={{ color: "var(--fg-primary)" }}>
              A home for your next website.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
              NDD.Studio is a Hostinger Partner. Explore hosting for your website, or talk to us about your next web project.
            </p>
          </div>
          <div className="lg:max-w-sm w-full">
            <p className="text-xs mb-2" style={{ color: "var(--fg-muted)" }}>Your Hostinger coupon code</p>
            <p className="font-syne font-bold text-xl tracking-wider select-all mb-2" style={{ color: "var(--fg-primary)" }}>MUSTAFA0203</p>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--fg-muted)" }}>Enter at checkout. Eligibility and any discount are confirmed by Hostinger.</p>
            <div className="flex flex-wrap gap-3">
              <a href={referralUrl} target="_blank" rel="sponsored noopener noreferrer" className="inline-flex justify-center rounded-lg px-5 py-3 text-xs font-bold transition-opacity hover:opacity-90 focus-visible:outline-offset-4" style={{ background: "var(--orange)", color: "white" }}>
                Explore Hostinger ↗
              </a>
              <Link href="/contact" className="inline-flex justify-center rounded-lg px-5 py-3 text-xs font-medium focus-visible:outline-offset-4" style={{ border: "1px solid var(--border)", color: "var(--fg-primary)" }}>
                Discuss your website
              </Link>
            </div>
            <p className="text-[11px] leading-relaxed mt-4" style={{ color: "var(--fg-muted)" }}>
              We may earn a commission when you purchase through our referral link.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
