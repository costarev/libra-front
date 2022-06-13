export interface MiniCardProps {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  onPressFn?: () => void;
}

export type MiniCardsData = ReadonlyArray<MiniCardProps>;
