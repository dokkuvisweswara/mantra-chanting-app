// Sample devotional audio songs with metadata
export interface AudioSong {
  id: string;
  title: string;
  artist: string;
  duration: string;
  image: string;
  audioUrl: string;
  description: string;
}

export const devotionalSongs: AudioSong[] = [
  {
    id: "hanuman-chalisa-1",
    title: "Hanuman Chalisa",
    artist: "Anup Jalota",
    duration: "6:30",
    image: "🙏",
    audioUrl: "https://cdn.jsdelivr.net/gh/shreehanumanchalisaa/hanumanchalisa/mp3/hanuman-chalisa-udit-narayan.mp3",
    description: "Classical rendition of the sacred Hanuman Chalisa",
  },
  {
    id: "gayatri-mantra-1",
    title: "Gayatri Mantra",
    artist: "Deva Premal",
    duration: "4:15",
    image: "☀️",
    audioUrl: "https://example.com/audio/gayatri-mantra.mp3",
    description: "Divine mantra for enlightenment and wisdom",
  },
  {
    id: "om-namah-shivaya-1",
    title: "Om Namah Shivaya",
    artist: "Ravi Chary",
    duration: "5:45",
    image: "🕉️",
    audioUrl: "https://cs1.mp3.pm/listen/42432074/bGR4TEM5UVBleUw2NzFDMnZ4ZE5LRG44Q2dpdERCLzc1S3FvR3lqTUczQlluNEZESWxZQUlMNnJ1UTZ6MnFDc2doa0g1SnlTZmFZVEFISHI1VnNvcCtUYW53VjJ4UnkxRWF1VDh6Q0JWYjJ0b25GeEVqeGFyMXpmb2J5STh1Qzg/Mahamantras_Velikie_Mantry_-_Shri_Shiv_Mantra_(mp3.pm).mp3",
    description: "Sacred chant dedicated to Lord Shiva",
  },
  {
    id: "shri-krishna-govind-1",
    title: "Shri Krishna Govind",
    artist: "Hemant Chauhan",
    duration: "7:20",
    image: "🪶",
    audioUrl: "https://example.com/audio/shri-krishna-govind.mp3",
    description: "Beautiful devotional song to Lord Krishna",
  },
  {
    id: "jai-mata-di-1",
    title: "Jai Mata Di",
    artist: "Hariharan",
    duration: "6:00",
    image: "👑",
    audioUrl: "https://example.com/audio/jai-mata-di.mp3",
    description: "Devotional tribute to Goddess Durga",
  },
  {
    id: "ram-naam-satya-1",
    title: "Ram Naam Satya Hai",
    artist: "Kumar Vishwas",
    duration: "5:30",
    image: "🏹",
    audioUrl: "https://example.com/audio/ram-naam-satya.mp3",
    description: "Eternal truth of the divine name of Lord Ram",
  },
  {
    id: "aum-mani-padme-1",
    title: "Aum Mani Padme Hum",
    artist: "Tenzin Choegyal",
    duration: "8:15",
    image: "🌸",
    audioUrl: "https://example.com/audio/aum-mani-padme.mp3",
    description: "Buddhist mantra for compassion and wisdom",
  },
  {
    id: "bhakti-marg-1",
    title: "Bhakti Marg",
    artist: "Hari Om Sharan",
    duration: "6:45",
    image: "💖",
    audioUrl: "https://example.com/audio/bhakti-marg.mp3",
    description: "Path of devotion and spiritual service",
  },
];
