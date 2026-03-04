export interface CastCrewMember {
  castncrewid: string;
  role: string[];
  name: string;
  description: string | null;
  profilepic: string | null;
  poster: string | null;
}

export interface CastNCrew {
  cast: CastCrewMember[];
  crew: CastCrewMember[];
}

export interface PosterFile {
  quality: string;
  filename: string;
  format: string | null;
}

export interface Poster {
  posterid: string;
  title: string;
  postertype: "LANDSCAPE" | "PORTRAIT";
  quality: string;
  filelist: PosterFile[];
  pgrating: string;
  posterlanguage: string;
  postertags: string | null;
  posterusage: string;
  posterurltype: string;
}

export interface ContentDetail {
  packageid: string;
  streammode: string;
  streamtype: string;
  drmprovider: string;
  duration: number;
  quality: string;
  mpegtspackage: string;
  idobject: string;
  streamurl: string | null;
  availabilityset: string[];
  subtitlelang: string | null;
  audiolang: string | null;
}

export interface Content {
  objectid: string;
  objecttype: "CONTENT" | "SERIES";
  partnerid: string | null;
  title: string;
  defaulttitle: string;
  defaultgenre: string;
  publishtime: string;
  endtime: string;
  shortdescription: string;
  ratingtype: string;
  pgrating: string;
  parentid: string | null;
  objectstatus: string;
  genre: string;
  subgenre: string[] | null;
  thumbnail: string | null;
  tags: string[];
  contentlanguage: string[];
  objectowner: string | null;
  jobid: string | null;
  longdescription: string;
  objecttag: string | null;
  details: string | null;
  productionyear: number | null;
  releasedate: string | null;
  imdbid: string | null;
  advisory: string | null;
  metacontent: Record<string, unknown> | null;
  skilllevel: string | null;
  estimatedtime: string | null;
  whatwelearn: string | null;
  category: "MOVIE" | "TVSHOW";
  subcategory: string | null;
  seriesid: string | null;
  seriesname: string | null;
  seasonid: string | null;
  seasonname: string | null;
  seasonnum: number | null;
  episodenum: number | null;
  albumid: string | null;
  albumname: string | null;
  track: string | null;
  duration: number;
  bandorartist: string | null;
  skip: string | null;
  playlead?: string;
  cpcontentid: string;
  contentprovider: string;
  playbacktype: string;
  subcontentprovider: string;
  CONTENTSYNDICATION: boolean;
  poster: Poster[];
  resources: unknown[];
  castncrew: CastNCrew;
  contentdetails?: ContentDetail[];
  availabilityset: string[];
  seasoncount?: number;
  totalduration?: number;
}

export interface ContentResponse {
  totalcount: number;
  data: Content[];
}
