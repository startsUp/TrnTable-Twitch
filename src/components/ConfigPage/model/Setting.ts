export enum SettingType {
    BOOLEAN = 1,
    OPTIONS,
    SLIDER,
    NUMBER
}

export class Setting{
    
    private value = null

    constructor(
        private name: string,
        private details: string, 
        private type: SettingType,
        private defaultValue: any,
    ){}

    public setValue(value: any){
			this.value = value
    }

    public getValueOrDefault(){ 
			if (this.value !== null) return this.value
			else return this.defaultValue 
		}
		public getValue() { return this.value }
    public getDefaultValue() { return this.defaultValue }
    public getType() { return this.type }
    public getName() { return this.name }
    public getDetails() { return this.details }
}