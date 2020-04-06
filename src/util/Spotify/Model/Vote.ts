export enum VoteType {
    LIKE = 0,
    DISLIKE,
    NONE
}
export class Vote {
    constructor(
        public trackId: string,
        public likeIncrement: number,
        public dislikeIncrement: number
    ){}
}