// src/utils/championImages.ts

const imageModules = import.meta.globEager("../assets/champion/*.png");

const championImages = Object.keys(imageModules).reduce(
  (images: Record<string, string>, path: string) => {
    const match = path.match(/\/(\d+)\.png$/);
    if (match) {
      const championId = match[1];
      images[championId] = imageModules[path].default;
    }
    return images;
  },
  {}
);

export default championImages;
