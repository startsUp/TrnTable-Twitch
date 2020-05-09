export class Track{
    context: any;
    constructor(
        public id: string,
        public name: string,
        public album: {name: string},
        public image: string,
        public artists: string
    ){}

}