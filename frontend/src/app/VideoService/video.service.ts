import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../util/interface';

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    constructor(private http: HttpClient) { }

    BASE_URL: string = `/videos`
    VALID_OPTIONS = { headers: { accesstoken: "valid" } }

    getVideos(): Promise<Video[]> {
        return this.http.get<Video[]>(this.BASE_URL, this.VALID_OPTIONS).toPromise();
    }

    changeGrade(id: number, grade: number): Promise<HttpResponse<string>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set("accesstoken", "valid");
        return this.http.patch(this.BASE_URL + `/${id}`, { "grade": grade }, { headers, observe: 'response', responseType: "text"}).toPromise();
    }
}