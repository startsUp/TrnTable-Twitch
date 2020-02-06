import * as Settings from './model/Setting'

export class SettingsService{
	
	private BroadcasterSettings = [
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