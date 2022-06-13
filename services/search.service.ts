import {AuthContext} from './../contexts/auth.context';
import React from 'react';
import {ItemDto} from './../dtos/item.interface';
import {ApiService} from './api.service';

export namespace SearchService {
  export function useSearch(query: string): Promise<ReadonlyArray<ItemDto>> {
    const authContext = React.useContext(AuthContext);
    console.log(authContext.accessToken);

    return ApiService.get<ReadonlyArray<ItemDto>>(
      '/api/item/search',
      {query},
      authContext.accessToken
    );
  }
}
