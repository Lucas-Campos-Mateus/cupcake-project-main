import { create } from 'zustand'

export const useClientStore = create((set) => ({
  client: null,
  setClient: (client) => {
    if (client) {
      localStorage.setItem('client', JSON.stringify(client))
    } else {
      localStorage.removeItem('client')
    }
    return set({ client })
  },
}))
