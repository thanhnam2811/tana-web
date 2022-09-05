export const randomString = (lenght) => {
  return (Math.random() + 1).toString(36).substring(lenght);
};

export const randomNumber = (start, end) => {
  return start + Math.floor(Math.random() * (end - start));
};
