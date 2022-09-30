export const storage = {
  setCache: (key, v) => {
    localStorage.setItem(key, JSON.stringify(v));
  },

  getCache: key => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  removeCache: key => {
    localStorage.removeItem(key);
  }
};
