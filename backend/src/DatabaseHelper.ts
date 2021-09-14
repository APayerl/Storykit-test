import { randomInt } from "crypto";
import mariadb, { Pool, PoolConnection } from "mariadb";

import { User, UserStorage, Video, VideoStore } from "./interfaces";

export class DatabaseHelper implements VideoStore, UserStorage {
    DB_VIDEO_TABLE = "VideoTable";
    connPool: Pool;
    private videos: Video[] = [{grade: 3, title: "The moonshot", id: 1}, {grade: 1, title: "The moonshot 2", id: 2}];

    constructor() {
        this.connPool = mariadb.createPool({
            host: process.env.PORT ? "db" : "localhost",
            port: 3306,
            user: "root",
            password: process.env.MYSQL_ROOT_PASSWORD
        });

        this.connPool.getConnection().then(async con => {
            await con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
            await con.query(`USE ${process.env.DB_NAME};`);
            await con.query(`CREATE TABLE IF NOT EXISTS ${this.DB_VIDEO_TABLE}(id int NOT NULL PRIMARY KEY, title varchar(150) NOT NULL, grade int NOT NULL);`)
            this.videos.forEach(async v => await con.query(`INSERT INTO ${this.DB_VIDEO_TABLE} VALUES (?, ?, ?);`, [v.id, v.title, v.grade]))
            console.log("Working!");
            con.end();
        });
    }

    private async getConnection(myFunc: (con: PoolConnection) => Promise<void>): Promise<void> {
        this.connPool.getConnection().then(async con => {
            try {
                await con.query(`USE ${process.env.DB_NAME};`);
                myFunc(con);
            } finally {
                con.end();
            }
        });
    }

    getVideo(id: number): Promise<Video> {
        return new Promise((resolve, reject) => {
            this.getConnection(async con => {
                resolve((await con.query(`SELECT * FROM ${this.DB_VIDEO_TABLE} WHERE id = ?;`, id))[0] as Video);
            });
        });
    }
    addVideo(vid: Video): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getConnection(async con => {
                await con.query(`INSERT INTO ${this.DB_VIDEO_TABLE} VALUES (?, ?, ?);`, [vid.id, vid.title, vid.grade]);
                resolve(true);
            });
        });
    }
    replaceVideo(id: number, vid: Video): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getConnection(async con => {
                await con.beginTransaction();
                await con.query(`DELETE FROM ${this.DB_VIDEO_TABLE} WHERE id = ?;`, id);
                await con.query(`INSERT INTO ${this.DB_VIDEO_TABLE} VALUES (?, ?, ?);`, [id, vid.title, vid.grade]);
                await con.commit();
                resolve(true);
            });
        });
    }

    async setVideos(videos: Video[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getConnection(async con => {
                await con.beginTransaction();
                await con.query(`DELETE from ${this.DB_VIDEO_TABLE};`);
                videos.forEach(async v => await con.query(`INSERT INTO ${this.DB_VIDEO_TABLE} VALUES (?, ?, ?);`, [v.id, v.title, v.grade]));
                await con.commit();
                resolve(true);
            });
        });
    }
    getAllVideos(): Promise<Video[]> {
        return new Promise((resolve, reject) => {
            this.getConnection(async (con: PoolConnection) => {
                let videos: Video[] = await con.query(`SELECT * FROM ${this.DB_VIDEO_TABLE}`) as Video[];
                resolve(videos);
            });
        })
    }
    getUserFromAccessToken(token: string): Promise<User> {
        return new Promise((resolve, reject) => {
            if(token === "valid") {
                resolve({} as User);
                return;
            }
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