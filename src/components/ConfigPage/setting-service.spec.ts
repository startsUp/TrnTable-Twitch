import { SettingsService } from './settings-service'
import { Role } from '../../auth/roles/roles'
var testConfig ="{\"settings\":[false,100,false,false],\"role\":4,\"extensionPlaylistId\":null,\"playlistId\":null,\"created\":\"2020-04-03T23:45:25.276Z\",\"updated\":\"2020-04-03T23:45:25.276Z\"}"
var settingService = new SettingsService()
var broadcasterSettings = settingService.BroadcasterSettings
var broadcasterSettingsMap = settingService.BroadcasterSettingsMap

test('Should update the correct setting value', () => {
  var updatedUserSettings = settingService.getUpdatedSettings({ content: testConfig }, Role.BROADCASTER, Object.keys(broadcasterSettingsMap)[0], true)
  expect(updatedUserSettings.settings[0]).toBe(true)
})

test('should return the right setting value', () => {
  var userSettings = settingService.getDefaultUserSettings(Role.BROADCASTER);
  var defaultValues = broadcasterSettings.map(setting => setting.defaultValue)
  defaultValues.forEach((value, index) => {
    expect(value).toBe(settingService.getSettingValue(userSettings, Object.keys(broadcasterSettingsMap)[index]))
  })
})
