
export const auth = {
  onAuthStateChanged: (callback: (user: any) => void) => {
    callback(null);
    return () => {};
  },
};
