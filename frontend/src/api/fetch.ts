const HOST = "http://localhost:8000"; // need to be hardocoded

export function getAuthHeaders(getAuth: () => string): HeadersInit {
  return {
    Authorization: getAuth(),
  };
}

export class LoginError extends Error {}

export default async function fetchApi<B, R>(
  path: string,
  method: RequestInit["method"] = "GET",
  b?: B,
  contentType?: string,
  additionalHeaders?: HeadersInit,
): Promise<R> {
  return fetch(HOST + path, {
    method: method.toUpperCase(),
    ...(b && {
      body:
        contentType === "application/json" ? JSON.stringify(b) : b.toString(),
    }),
    headers: {
      ...(contentType && {
        "Content-Type": contentType,
      }),
      ...additionalHeaders,
    },
  })
    .then((r) => {
      if (r.status === 401) {
        throw new LoginError();
      }
      return r;
    })
    .then((r) => r.json())
    .then((r) => r as R);
}
