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
	s.addRequestedSong('testId')
	expect(s.hasSongBeenRequested('testId')).toBe(true)
})

test('should remove by song id', () => {
	s.addRequestedSong('testId')
	s.removeRequestedSong('testId')
	expect(s.hasSongBeenRequested('testId')).toBe(false)
	expect(s.getRequestedAmount()).toBe(0)
})

test('return correct requested amount', () => {
	expect(s.getRequestedAmount()).toBe(0)
	s.addRequestedSong('testId')
	expect(s.getRequestedAmount()).toBe(1)
})