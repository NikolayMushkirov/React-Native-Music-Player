export interface IMusicData {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  url: string;
}

export const musicData: IMusicData[] = [
  {
    id: "1",
    title: "Where is my mind(Remix)",
    artist: "Pixies",
    albumCover: require("../../assets/cover.jpg"),
    url: "../../assets/songs/Pixies - Where Is My Mind (Retrowave Synthwave cover by The Motion).mp3",
  },
  {
    id: "2",
    title: "Where is my mind(Remix)",
    artist: "Pixies",
    albumCover: require("../../assets/cover.jpg"),
    url: "../../assets/songs/Pixies - Where Is My Mind (Retrowave Synthwave cover by The Motion).mp3",
  },
  {
    id: "3",
    title: "Where is my mynd(Remix)",
    artist: "Pixies",
    albumCover: require("../../assets/placeholder.png"),
    url: "../../assets/songs/Pixies - Where Is My Mind (Retrowave Synthwave cover by The Motion).mp3",
  },
];
