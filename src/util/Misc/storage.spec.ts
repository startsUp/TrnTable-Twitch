import { StorageService, REQUESTED_AMOUNT_KEY, REQUESTED_SONGS_KEY } from './storage'
var s = new StorageService()
afterEach(()=> {
    s.clear()
})
test('should save objects', () => {
  var save = {value: 'saveThis'}
  s.save('test', save)
  expect(s.get('test')).toStrictEqual(save)
})

test('should save strings', () => {
  var save = 'saveThis'
  s.save('test', save)
  expect(s.get('test')).toBe(save)
})

test('should return default if no saved value is found', () => {
  expect(s.getOrDefault('test', 'default')).toBe('default')
})

test('should save requested songs', () => {
	s.addRequestedSong('testId', 'test-channel')
	expect(s.hasSongBeenRequested('testId', 'test-channel')).toBe(true)
})

test('should remove by song id', () => {
	s.addRequestedSong('testId', 'test-channel')
	s.removeRequestedSong('testId', 'test-channel')
	expect(s.hasSongBeenRequested('testId', 'test-channel')).toBe(false)
	expect(s.getRequestedAmount('test-channel')).toBe(0)
})

test('return correct requested amount', () => {
	expect(s.getRequestedAmount('test-channel')).toBe(0)
	s.addRequestedSong('testId', 'test-channel')
	expect(s.getRequestedAmount('test-channel')).toBe(1)
})