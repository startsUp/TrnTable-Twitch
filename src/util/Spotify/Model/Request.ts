import { Track } from "./Track";

export enum RequestType {
    TRACK = 0
}
export class Request{
    constructor(
        public type: RequestType,
        public content: (Track | any)
    ){}
}