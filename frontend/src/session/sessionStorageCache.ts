const sessionStorageCache = {
  get<T = unknown>(key: string): T | undefined {
    const cachedValue = sessionStorage.getItem(key);
    return cachedValue ? JSON.parse(cachedValue) : undefined; // Return undefined if not found
  },
  set(key: string, value: unknown): void {
    sessionStorage.setItem(key, JSON.stringify(value)); // Convert value to JSON string
  },
  remove(key: string): void {
    // Removes item from sessionStorage
    sessionStorage.removeItem(key);
  },
};

export default sessionStorageCache;
