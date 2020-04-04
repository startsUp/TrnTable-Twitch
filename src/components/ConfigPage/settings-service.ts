import { NumberSetting, BooleanSetting, SelectionSetting, Setting} from './model/Setting'
import { UserSettings } from './model/UserSettings'
import { Role } from '../../auth/roles/roles'

export class SettingsService{
    readonly BroadcasterSettingsMap = {'Stop taking Requests': 0, 'Max Requests': 1, 'Keep already played songs': 2, 'Auto add Requests': 3};
	readonly BroadcasterSettings: Setting<any>[] = [
            new BooleanSetting(
                'Stop taking Requests',
                'Turning this on will stop song requests temporarily',
                false,
                false
            ),
			new NumberSetting(
				'Max Requests', 
				'The maximum number of songs a viewer can request',
				100,
				100,
				0,
				100),
			new BooleanSetting(
					'Keep already played songs', 
					'You can turn on this option to retain old requests that were added to the playlists. Limit is 10,000.',
					false, 
					false),
			new BooleanSetting(
					'Auto add Requests', 
					'Requested songs are automatically added to the playlist.',
					false, 
                    false),
	]

	constructor(){}

    getDefaultUserSettings(userRole: Role) : UserSettings{
        if(userRole === Role.BROADCASTER){
            return new UserSettings(this.BroadcasterSettings.map(s=>s.defaultValue), userRole, null, null, new Date(), new Date())
        }
    }

    getUpdatedSettings(config: {content: string}, role: Role, settingName: string, newSettingValue: any): UserSettings{
        var userSettings = this.getUserSettings(config, role)
        if(role === Role.BROADCASTER){
            var newSettingValues = userSettings.settings.map((settingValue, index) => {
                if(settingName === this.BroadcasterSettings[index].name)
                    return newSettingValue
                else
                    return settingValue
            })
            userSettings.settings = newSettingValues
            return userSettings
        }
    }

    getSessionSettings(config: {content: string}) : UserSettings{
        return this.getUserSettings(config, Role.BROADCASTER)
    }
	getUserSettings(config: {content: string}, userRole: Role) : UserSettings{
        // return default settings if no config json provided
        if (config === null || config === undefined) 
            return this.getDefaultUserSettings(userRole)

		let {settings, role, extensionPlaylistId, playlistId, created, updated} = JSON.parse(config.content)		
		return new UserSettings(settings, role, extensionPlaylistId, playlistId, created, updated)
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
    
    getSettingValue(userSettings: UserSettings, settingName: string){
        return userSettings.settings[this.BroadcasterSettingsMap[settingName]]
    }

}