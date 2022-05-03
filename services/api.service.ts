const API_DOMEN = 'http://185.221.162.200:8081';
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function makeURL(path: string, query = {}): string {
  const url = new URL(API_DOMEN + path);

  url.search = new URLSearchParams(query).toString();
  return url.toString();
}

export class ApiService {
  static async get<Res>(path: string, query = {}): Promise<Res> {
    return fetch(makeURL(path, query), {
      method: 'GET',
      headers: defaultHeaders,
    })
      .then(a => a.json())
      .then(a => (a.error ? Promise.reject(a.error) : a));
  }

  static async post<Body, Res>(path: string, query = {}, body?: Body): Promise<Res> {
    return fetch(makeURL(path, query), {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body || {}),
    })
      .then(a => a.json())
      .then(a => (a.error ? Promise.reject(a.error) : a));
  }
}
