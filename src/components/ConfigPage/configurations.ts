import * as Settings from './model/Setting'
export class SettingsService{
	private BroadcasterSettings = [
			new Settings.BooleanSetting(
					'Delete Playlist After Stream end', 
					'If set to True, TrnTable will create a new playlist everytime you go live instead of using the last active playlist',
					false, 
					false),
			new Settings.NumberSetting(
					'Maximum Number of Songs viewer can Request', 
					'The maximum number of songs a viewer can request',
					100,
					100,
					1,
					100),
			new Settings.BooleanSetting(
					'Auto add Song Requests', 
					'Requested songs are automatically added to playlist',
					false, 
					false),
	]

	constructor(){}

 	getJSONConfig = () => {
		var settingsObj = this.BroadcasterSettings.map((setting: Settings.Setting<any>) => {
			return setting.value
		})  
		return JSON.stringify(settingsObj)
	}
	updateSettings = (settingValues: string) => {
		var settings = JSON.parse(settingValues);
		settings.forEach((s,i) => {
			this.BroadcasterSettings[i].value = s.value;
		});
	}

}