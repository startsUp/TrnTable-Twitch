import * as Settings from './model/Setting'
import { UserSettings } from './model/UserSettings'
import { Role } from '../../auth/roles/roles'

export class SettingsService{
	
	readonly BroadcasterSettings = [
			new Settings.NumberSetting(
				'Max Requests', 
				'The maximum number of songs a viewer can request',
				100,
				100,
				0,
				100),
			new Settings.BooleanSetting(
					'Delete Playlist', 
					'Delete stream playlist after every stream. Lets you start a new playlist for each stream.',
					false, 
					false),
			new Settings.BooleanSetting(
					'Auto add Requests', 
					'Requested songs are automatically added to the playlist.',
					false, 
					false),
	]

	constructor(){}

    getDefaultUserSettings(userRole: Role){
        if(userRole === Role.BROADCASTER){
            return new UserSettings(this.BroadcasterSettings.map(s=>s.defaultValue), userRole, false, new Date(), new Date())
        }
    }

	getUserSettings(config: string, userRole: Role){
        // return default settings if no config json provided
        if (config === null || config === undefined) 
            return this.getDefaultUserSettings(userRole)

		let {settings, role, playlistCreated, created, updated} = JSON.parse(config).content		
		return new UserSettings(settings, role, playlistCreated, created, updated)
	}

    toJSON(userSettings: UserSettings){
        const { settings, role, playlistCreated, created, updated } = userSettings
        let obj = {settings, role, playlistCreated, created, updated}
        return JSON.stringify(obj)
    }
	/**
	 * Returns Array of Setting Objects for the user
	 * @param userSettings UserSettings Object @see UserSettings
	 */
	getSettingComponents(userSettings: UserSettings){
        var settingsObj = this.BroadcasterSettings.map((setting: Settings.Setting<any>, index: number) => {
                if (userSettings.role === Role.BROADCASTER){
                    return setting.getSettingWithValue(userSettings.settings[index])
                }
            })  
			return settingsObj
		}
	

	updateSettings = (settingValues: string) => {
		var settings = JSON.parse(settingValues);
		settings.forEach((s,i) => {
			this.BroadcasterSettings[i].value = s.value;
		});
	}

}