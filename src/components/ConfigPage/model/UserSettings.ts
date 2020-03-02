import { Role } from "../../../auth/roles/roles";

export class UserSettings{

	constructor(
        public settings: any [],
        public role: Role,
        public playlistId: string,
        public created: Date,
        public updated: Date,
    ){}
    

}