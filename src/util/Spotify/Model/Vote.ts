export enum VoteType {
    LIKE = 0,
    DISLIKE,
    NONE
}
export class Vote {
    constructor(
        public type: VoteType,
        public trackId: string
    ){}
}