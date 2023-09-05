const USER_LOCAL_STORAGE_KEY = 'MY-TRELLO-USER'

export function saveUser(token: string): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(token))
}

export function getUser(): string | undefined {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  return user ? JSON.parse(user) : undefined
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
}
