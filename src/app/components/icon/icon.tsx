type Icon = {
  icon: string;
  className: string;
};

export function Icon({ icon, className }: Icon) {
  return (
    <svg className={className}>
      <use href={`/icons/sprite.svg#${icon}`} />
    </svg>
  );
}
