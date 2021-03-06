export interface Video {
    id: number;
    title: string;
    grade: number;
}

export interface User {

}

export interface VideoStore {
    getAllVideos(): Promise<Video[]>;
    addVideo(vid: Video): Promise<boolean>;
    setVideos(videos: Video[]): Promise<boolean>;
    replaceVideo(id: number, vid: Video): Promise<boolean>;
    getVideo(id: number): Promise<Video>;
}

export interface UserStorage {
    getUserFromAccessToken(accessToken: string): Promise<User>;
}