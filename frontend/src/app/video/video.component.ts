import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MovieInfo, TmdbSearchResult, Video } from '../util/interface';
import { VideoService } from '../VideoService/video.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
    constructor(private videoService: VideoService,
        private httpClient: HttpClient) { }

    @Input() video?: Video;
    image_url: string = "";

    ngOnInit(): void {
        this.httpClient.get<TmdbSearchResult>("https://api.themoviedb.org/3/search/movie?api_key=1bc5e358416e7f216df6957afcf5ab90&query=" + this.video?.title.replace(" ", "+")).toPromise().then(json => {
            this.image_url = `http://image.tmdb.org/t/p/w500/${json.results[0].poster_path}`;
        });
    }

    async onInputChange(id: number, event: any) {
        let res = await this.videoService.changeGrade(id, event.target.valueAsNumber);
        console.log(res);
    }

}