export interface IPost {
	title: string;
	url: string;
	is_video: boolean;
	thumbnail: string;
	thumbnail_height: number;
	thumbnail_width: number;
	media: IMedia;
	score: number;
	author: string;
	subreddit: string;
}

export interface IMedia {
	reddit_video: IRedditVideo;
}

export interface IRedditVideo {
	fallback_url: string;
}
