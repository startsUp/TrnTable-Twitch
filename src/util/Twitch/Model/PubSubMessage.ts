
export enum PubSubMessageType {
    TRACK = 0,
    SETTINGS,
    VOTE
}
export class PubSubMessage{
    
    constructor(
        public content: any, 
        public type: PubSubMessageType
    ){}
}