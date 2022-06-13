import {ItemStatus} from '../enums/item-status.enum';

export interface ItemDto {
  readonly itemId: number;
  readonly title: string;
  readonly locationId: number;
  readonly itemStatus: ItemStatus;
  readonly ownerId?: number;
  readonly description?: string;
  readonly image?: string;
}
