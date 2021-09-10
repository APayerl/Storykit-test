import { randomInt } from "crypto";
import { User, UserStorage, Video, VideoStore } from "./interfaces";

export class DatabaseHelper implements VideoStore, UserStorage {
    private videos: Video[] = [{grade: 3, title: "The moonshot", id: 1}, {grade: 1, title: "The moonshot 2", id: 2}];
    getVideo(id: number): Promise<Video> {
        return new Promise((resolve, reject) => {
            resolve(this.videos.find((vid: Video) => vid.id === id) as Video);
        });
    }
    deleteVideo(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.videos = this.videos.filter(vid => vid.id !== id);
            resolve(true);
        });
    }
    addVideo(vid: Video): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.videos.push(vid);
            resolve(true);
        });
    }
    setVideos(videos: Video[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.videos = videos;
            resolve(true);
        });
    }
    getAllVideos(): Promise<Video[]> {
        return new Promise((resolve, reject) => {
            resolve(this.videos);
        })
    }
    getUserFromAccessToken(token: string): Promise<User> {
        return new Promise((resolve, reject) => {
            //Fakes login info. Changes between a valid user, not valid user and a db error
            switch(randomInt(0, 3)) {
                case 0:
                    resolve({} as User);
                    break;
                case 1:
                    resolve(null as unknown as User);
                    break;
                case 2:
                    reject("Error occured");
                    break;
            }
        })
    }
}