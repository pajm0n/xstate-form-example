export const sendMessage = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const r = Math.random();
      if (r > 0.5) resolve();
      else reject();
    }, 2000);
  });
};
