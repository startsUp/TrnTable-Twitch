import { Role } from "../../../auth/roles/roles";

export class UserSettings{

	constructor(
        public settings: any [],
        public role: Role,
        public extensionPlaylistId: string, // playlist created by the extension
        public playlistId: string, // playlist currently being used
        public requestProductSKU: string, // sku for the request bits product
        public created: Date,
        public updated: Date,
        public channelTopic: string
    ){}
    

}