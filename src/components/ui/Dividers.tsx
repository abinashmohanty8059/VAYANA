export function IkatBorderStrip() {
  return <div className="ikat-border-strip" role="presentation" aria-hidden="true" />;
}

export function IkatSubtleStrip() {
  return <div className="ikat-border-strip-subtle" role="presentation" aria-hidden="true" />;
}

export function GoldDivider() {
  return (
    <div className="flex items-center justify-center space-x-3 text-vayana-gold my-8" aria-hidden="true">
      <span>―</span>
      <span className="text-lg">◆</span>
      <span>―</span>
    </div>
  );
}
