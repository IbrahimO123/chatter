export type Photo = {
  id: number;
  albumId: number;
  thumbnailUrl: string;
  url: string;
  title: string;
};

export type ChatPhotos = {
  allPhotos: Photo[];
  aPhoto: Photo;
};
