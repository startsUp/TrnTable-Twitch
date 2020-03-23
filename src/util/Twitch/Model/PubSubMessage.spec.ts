import { PubSubMessage } from './PubSubMessage'

test('Should return the correct type of', () => {
    var pbm = new PubSubMessage("hello")
    expect(typeof pbm.content).toBe(typeof 'string')
})

class Test{
    constructor(public name: string){}
}

test('Should work with JSON serialization/deserialization', () => {
    var pbm = new PubSubMessage(new Test('test'))
    var deserialized = JSON.parse(JSON.stringify(pbm))
    expect(typeof deserialized.content).toBe(typeof (new Test('test')))
})