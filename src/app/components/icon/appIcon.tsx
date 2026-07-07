type AppIconProps = {
  icon: string;
  className: string;
};

export function AppIcon({ icon, className }: AppIconProps) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`/icons/sprite.svg#${icon}`} />
    </svg>
  );
}
