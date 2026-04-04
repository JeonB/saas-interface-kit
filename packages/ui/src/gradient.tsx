export function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`ui:absolute ui:mix-blend-normal ui:will-change-[filter] ui:rounded-[100%] ${
        small ? "ui:blur-[32px]" : "ui:blur-[75px]"
      } ${
        conic
          ? "ui:bg-gradient-to-r ui:bg-semantic-danger ui:from-10% ui:via-semantic-warning ui:via-30% ui:to-semantic-brand ui:to-100%"
          : ""
      } ${className ?? ""}`}
    />
  );
}
