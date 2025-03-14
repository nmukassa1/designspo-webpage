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
}
