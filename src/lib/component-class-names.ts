// Keep semantic class hooks for browser checks alongside CSS Module class names.
export function createClassNames(styles: Record<string, string>) {
  return (names: string) =>
    names
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => (styles[name] ? `${name} ${styles[name]}` : name))
      .join(" ");
}
