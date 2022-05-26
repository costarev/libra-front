import {ItemDto} from './item.interface';

export interface NotebookDto extends ItemDto {
  readonly searialNumber?: string;
  readonly operatingSystem?: string;
}
