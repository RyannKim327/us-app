
export async function useRegister(username: string, password: string, avatar: string) {
  const requestFetch = $fetch
  const data = await requestFetch('/api/register', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: username,
      password: password,
      avatar: avatar
    }
  })

  if (data.error) {
    return {
      "error": data.error || "Account might be registered already"
    }
  }

  return data
}
