import Setting from './model/Setting'
import SettingType from './model/SettingType'

export const DefaultBroadcasterSettings = [
    new Setting('Delete Playlist After Stream ends', 
                'If set to True, TrnTable will create a new playlist everytime you go live instead of using the last active playlist.',
                SettingType.BOOLEAN, 
                false),
    new Setting('Maximum Number of Songs viewer can Request', 
                'The maximum number of songs a viewer can request. This can be reset during a stream.',
                SettingType.NUMBER,                     
                100),
    new Setting('Voting Enabled', 
                'Allow viewers to like or dislike the song currently playing.',
                SettingType.BOOLEAN,
                true),
]