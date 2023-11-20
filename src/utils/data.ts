import { ImageSourcePropType } from "react-native";

export interface IMusicData {
  id: string;
  title: string;
  artist: string;
  preview: { uri: string };
  url: string;
}

export const musicData: IMusicData[] = [
  {
    title: "In My Head",
    artist: "Bedroom",
    preview: {
      uri: "gs://music-tracks-db.appspot.com/artworks-000642902362-ax2hpx-t500x500.jpg",
    },
    url: "gs://music-tracks-db.appspot.com/Bedroom_In_My_Head.mp3",
    id: "1",
  },
  {
    title: "Aruarian Dance",
    artist: "Nujabes",
    preview: {
      uri: "gs://music-tracks-db.appspot.com/artworks-000010633044-0pecn0-t500x500.jpg",
    },
    url: "gs://music-tracks-db.appspot.com/03. Nujabes - Aruarian Dance.mp3",
    id: "2",
  },
  {
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    preview: {
      uri: "gs://music-tracks-db.appspot.com/Required-expansion-for-lead-image.webp",
    },
    url: "gs://music-tracks-db.appspot.com/Wish You Were Here.mp3",
    id: "3",
  },
];
