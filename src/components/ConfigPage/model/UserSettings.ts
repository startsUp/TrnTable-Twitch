
export class UserSettings{

	constructor(
        public settings: [],
        public role: string,
        public spotifyToken: string,
        public playlistCreated: boolean,
        public created: Date,
        public updated: Date,
    ){}
    

}