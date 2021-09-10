import express, { NextFunction, Request, Response } from 'express';
import { DatabaseHelper } from './DatabaseHelper';
import { Video } from './interfaces';

const app = express();
app.use(express.json());

let db = new DatabaseHelper();

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    //TODO Do we want to check authentication? 
    // Should probably do some sqlinjection and RCE protection also...
    let user;
    try {
        if(req.headers.accesstoken == undefined) {
            res.sendStatus(401);
        } else if(user = await db.getUserFromAccessToken(req.headers.accesstoken as string)) {
            next();
        } else {//If accesstoken is not a valid user
            res.sendStatus(403);
        }
    } catch(err) {
        res.sendStatus(500);
    }
}

app.use(authentication);

app.get('/videos', async (req: Request, res: Response) => {
    try {
        let videos: Video[] = await db.getAllVideos();
        res.status(200).send(JSON.stringify(videos));
    } catch(error) {
        res.status(500).send("No videos found at this time, please try again later!");
    };
});

app.post('/videos', async (req: Request, res: Response) => {
    try {
        if(await db.addVideo(JSON.parse(req.body) as Video)) {
            res.status(200).send("Video added.");
        }
    } catch(error) {
        res.status(500).send("Unable to add video at this time, please try again later!");
    };
});

app.put('/videos', async (req: Request, res: Response) => {
    try {
        if(await db.setVideos(JSON.parse(req.body) as Video[])) {
            res.status(200).send("Videos set.");
        }
    } catch(err) {
        res.status(500).send("Unable to set videos at this time, please try again later!");
    }
});

app.patch('/videos/:id', async (req: Request, res: Response) => {
    try {
        let vid: any = await db.getVideo(Number(req.params.id));
        Object.getOwnPropertyNames(req.body).forEach(property => { 
            vid[property] = req.body[property];
        });
        await db.deleteVideo(Number(req.params.id));
        if(await db.addVideo(vid)) {
            res.status(200).send("Video updated.");
        }
    } catch(err) {
        console.log(err);
        //TODO Should actually do more error checking here... Since now we could have a duplicate if the video was'nt deleted before insert...
        res.status(500).send("Unable to complete action at this time, please try again later!");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});