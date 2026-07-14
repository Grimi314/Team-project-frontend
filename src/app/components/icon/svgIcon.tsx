type Icon = {
  icon: string;
  className: string;
};

export function Icon({ icon, className }: Icon) {
  return (
    <svg>
      <use href={`/icons/sprite.svg#${icon}`} className={className} />
    </svg>
  );
}
