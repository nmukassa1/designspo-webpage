export interface Tag {
  id: number;
  name: string;
  userId: string;
}

export interface ScreenshotTag {
  screenshotId: number;
  tagId: number;
  tag: Tag;
}

export interface Screenshot {
  id: number;
  img: string;
  siteName: string;
  siteUrl: string;
  userId: string;
  tags: ScreenshotTag[];
  description?: { id: number; content: string; screenshotId: number };
}

export interface CollectionsType {
  screenshots: Screenshot[];
  totalPages: number;
}

// export interface searchParams {
//   searchParams: Promise<{
//     [key: string]: string | string[] | number | undefined;
//   }>;
// }

export interface searchParams {
  [key: string]: string | string[] | number | undefined;
}
