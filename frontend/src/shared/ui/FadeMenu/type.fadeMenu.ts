type FadeMenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export type FadeMenuProps = {
  fadeMenu: boolean;
  className?: string;
  items: FadeMenuItem[];
  popoverContent?: React.ReactNode;
};
