import {ButtonLink} from './button-link.interface';
import {MiniCardsData} from './mini-card-props.interface';

export interface FeedProps<RouteParams = any> {
  readonly title: string;
  readonly cards: MiniCardsData;
  readonly showAllButton?: boolean;
  readonly showAllButtonLink?: ButtonLink<RouteParams>;
}

export type FeedsData<RouteParams = any> = ReadonlyArray<FeedProps<RouteParams>>;
