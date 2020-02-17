import { NumberSetting, BooleanSetting, SelectionSetting, Setting} from './model/Setting'
import { UserSettings } from './model/UserSettings'
import { Role } from '../../auth/roles/roles'

export class SettingsService{
	
	readonly BroadcasterSettings = [
			new NumberSetting(
				'Max Requests', 
				'The maximum number of songs a viewer can request',
				100,
				100,
				0,
				100),
			new BooleanSetting(
					'Delete Playlist', 
					'Delete stream playlist after every stream. Lets you start a new playlist for each stream.',
					false, 
					false),
			new BooleanSetting(
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

	getUserSettings(config: {content: string}, userRole: Role){
        // return default settings if no config json provided
        if (config === null || config === undefined) 
            return this.getDefaultUserSettings(userRole)

		let {settings, role, playlistCreated, created, updated} = JSON.parse(config.content)		
		return new UserSettings(settings, role, playlistCreated, created, updated)
	}

    /**
     * Updates the user setting obj with the values in settings component
     */
    updateUserSettings(userSettings: UserSettings, settings: Setting<any>[]){
        if(userSettings){
            var settingsArray = []
            settings.forEach(setting => {
                settingsArray.push(setting.value)
            })
            userSettings.settings = settingsArray
        }
    }

	/**
	 * Returns Array of Setting Objects for the user
	 * @param userSettings UserSettings Object @see UserSettings
	 */
	getSettingComponents(userSettings: UserSettings){
        if (userSettings) {
            var settingsObj = this.BroadcasterSettings.map((setting: Setting<any>, index: number) => {
                    if (userSettings.role === Role.BROADCASTER){
                        return setting.getSettingWithValue(userSettings.settings[index])
                    }
                })  
            return settingsObj
        }
    }
    
    toJSON = (userSettings: UserSettings) => {
        return JSON.stringify(userSettings)
    }

	updateSettings = (settingValues: string) => {
		var settings = JSON.parse(settingValues);
		settings.forEach((s,i) => {
			this.BroadcasterSettings[i].value = s.value;
		});
	}

}