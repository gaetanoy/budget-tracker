const HOST = "http://localhost:8000";

export function getAuthHeaders(getAuth: () => string): HeadersInit {
  return {
    Authorization: getAuth(),
  };
}

export default async function fetchApi<B, R>(
  path: string,
  method: RequestInit["method"] = "GET",
  b?: B,
  contentType?: string,
  additionalHeaders?: HeadersInit
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
    .then((r) => r.json())
    .then((r) => r as R);
}
