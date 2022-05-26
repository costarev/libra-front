import {ItemDto} from './item.interface';

export interface BookDto extends ItemDto {
  readonly year: number;
  readonly authorsId: ReadonlyArray<number>;
  readonly isbn?: string;
  readonly anotherBn?: string;
}
