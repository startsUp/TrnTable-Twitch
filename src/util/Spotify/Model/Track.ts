export class Track{
    constructor(
        public id: string,
        public name: string,
        public album: {name: string},
        public image: string,
        public artists: string
    ){}

}