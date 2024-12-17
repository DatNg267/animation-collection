export const randomImage = () => {
  const randomImage = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/1920/1080?random=${randomImage}`;
};
