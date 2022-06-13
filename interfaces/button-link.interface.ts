import {SimpleMap} from './../types';

export interface ButtonLink<RouteParams = any> {
  readonly screen: string;
  readonly params?: RouteParams;
}
