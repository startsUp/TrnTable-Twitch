import { PubSubMessage, PubSubMessageType } from './PubSubMessage'

test('Should return the correct type of', () => {
    var pbm = new PubSubMessage({}, PubSubMessageType.TRACK)
    expect(pbm.type).toBe(PubSubMessageType.TRACK)

    var pbm = new PubSubMessage({}, PubSubMessageType.SETTINGS)
    expect(pbm.type).toBe(PubSubMessageType.SETTINGS)
})

test('Should work with JSON serialization/deserialization', () => {
    var pbm = new PubSubMessage({}, PubSubMessageType.SETTINGS)
    
    expect(JSON.parse(JSON.stringify(pbm)).type).toBe(PubSubMessageType.SETTINGS)
})