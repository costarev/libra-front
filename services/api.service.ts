const API_DOMEN = 'http://185.221.162.200:8081';
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function makeURL(path: string, query = {}): string {
  const url = API_DOMEN + path;
  const queryStr = new URLSearchParams(query).toString();

  return queryStr !== '' ? url + '?' + queryStr : url;
}

function getAuthHeader(token: string): {Authorization: string} {
  return {Authorization: `Bearer ${token}`};
}

export namespace ApiService {
  export function get<Res>(path: string, query = {}, token?: string): Promise<Res> {
    return fetch(makeURL(path, query), {
      method: 'GET',
      headers: {...defaultHeaders, ...(token ? getAuthHeader(token) : {})},
    })
      .then(a => a.json())
      .then(a => (a.error ? Promise.reject(a.error) : a));
  }

  export function post<Body, Res>(
    path: string,
    query = {},
    body?: Body,
    token?: string
  ): Promise<Res> {
    return fetch(makeURL(path, query), {
      method: 'POST',
      headers: {...defaultHeaders, ...(token ? getAuthHeader(token) : {})},
      body: JSON.stringify(body || {}),
    })
      .then(a => a.json())
      .then(a => (a.error ? Promise.reject(a.error) : a));
  }
}
