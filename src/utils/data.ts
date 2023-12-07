import { ImageSourcePropType } from "react-native";

export interface IMusicData {
  id: string;
  title: string;
  artist: string;
  albumCover: { uri: string };
  url: string;
}

export const musicData: IMusicData[] = [
  {
    title: "In My Head",
    artist: "Bedroom",
    albumCover: {
      uri: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/artworks-000642902362-ax2hpx-t500x500.jpg?alt=media&token=f01e0616-8263-446f-8b7a-56cf931f9efd",
    },
    url: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/Bedroom_In_My_Head.mp3?alt=media&token=59cbf88a-23c4-4c60-9127-4eb0168e9aca",
    id: "1",
  },
  {
    title: "Aruarian Dance",
    artist: "Nujabes",
    albumCover: {
      uri: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/artworks-000010633044-0pecn0-t500x500.jpg?alt=media&token=b2d96e00-fe80-4547-a2c5-dc40228e67da",
    },
    url: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/03.%20Nujabes%20-%20Aruarian%20Dance.mp3?alt=media&token=82b5dbd1-d314-40bd-b378-7e2944fab644",
    id: "2",
  },
  {
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    albumCover: {
      uri: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/Required-expansion-for-lead-image.webp?alt=media&token=ad34524e-2f0d-4cf9-b8a0-21e1ae95b081",
    },
    url: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/Wish%20You%20Were%20Here.mp3?alt=media&token=934f2b83-031e-4bbf-8541-b24be81a335e",
    id: "3",
  },
  {
    title: "Avril 14th",
    artist: "Aphex Twin",
    albumCover: {
      uri: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/500x500.jpg?alt=media&token=dbd81c04-bbc7-491c-a5ce-b52b44b6d0d8",
    },
    url: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/Avril%2014th.mp3?alt=media&token=9b2582bb-db71-4b93-8cd2-a91771e7fde1",
    id: "4",
  },
  {
    title: "Give Up",
    artist: "Low Roar",
    albumCover: {
      uri: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/artworks-ZSBZ8JybWIgZ-0-t500x500.jpg?alt=media&token=d6daa8b1-2ddb-48d3-b56d-349a0871d7be",
    },
    url: "https://firebasestorage.googleapis.com/v0/b/music-tracks-db.appspot.com/o/01%20Give%20Up.mp3?alt=media&token=cef123d7-7623-4e93-a2c2-16c91a40cdf2",
    id: "5",
  },
];
