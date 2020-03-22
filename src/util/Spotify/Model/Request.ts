import { Track } from "./Track";
import { Vote } from "./Vote";

export enum RequestType {
    TRACK = 0,
    VOTE
}
export class Request{
    constructor(
        public type: RequestType,
        public content: (Track | Vote)
    ){}
}