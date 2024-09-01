type LsMock = {
  store: Record<string, string>;
  getItem(key: string): string;
  setItem(key: string, value: string): void;
};

export const localStorageMock: LsMock = {
  store: {},

  getItem(key: string) {
    return this.store[key];
  },

  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  },
};
