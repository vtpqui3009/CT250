const API = "http://localhost:4000";
export async function fetchFromApi(endpoint, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };
  const response = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: { "Content-Type ": "application/json" },
  });
  return response.json();
}
