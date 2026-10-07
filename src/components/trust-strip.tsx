export function TrustStrip() {
  return (
    <div
      className="trust-strip"
      role="region"
      aria-label="Care benefits"
      tabIndex={0}
    >
      {[
        ["006ab.svg", "50 States"],
        ["afe69.svg", "Discreet Shipping"],
        ["5215a.svg", "Cash-pay, No Insurance Needed"],
        ["58777.svg", "24/7 AI Care Assistant"],
        ["23471.svg", "US Board Certified MDs"],
      ].map(([file, label]) => (
        <span key={label}>
          <img src={`/assets/${file}`} width="24" height="24" alt="" />
          {label}
        </span>
      ))}
    </div>
  );
}
