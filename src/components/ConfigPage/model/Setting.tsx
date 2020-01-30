import * as React from 'react';
import { TextField, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch } from '@material-ui/core';


export enum SettingType {
    BOOLEAN = 1,
    SELECTION,
    SLIDER,
    NUMBER
}
export interface Setting<T>{
    value: T
    name: string
    details: string
    defaultValue: T
    getComponent(props: {settingStyle: {}}, id: number): any
}
const SettingComponent = props => {
	return (
		<ListItem>
			<ListItemText className={props.listItem} primary={props.name} secondary={props.details} />
			<ListItemSecondaryAction>
			{props.children}
			</ListItemSecondaryAction>
		</ListItem>
	)
}


export class NumberSetting implements Setting<number>{
    
    constructor(
        public name: string,
        public details: string,
        public defaultValue: number,
        public value: number,   
        public minValue: number,
        public maxValue: number,
    ){}
		valueChange(e){
			this.value = e.target.value
		}
    getComponent(props, id){
			const [value, setValue] = React.useState(this.value);
			const updateValue = (e: any) => {
				let newValue = +e.target.value
				if(newValue > this.maxValue || newValue < this.minValue) return;
				setValue(newValue)
				this.value = newValue
			}
			return (
				<SettingComponent key={id} name={this.name} details={this.details} {...props}>
					<TextField
						className={props.settingStyle}
						id="filled-number-small"
						label="Number"
						type="number"
						value={value}
						onChange={e=>updateValue(e)}
						InputLabelProps={{
							shrink: true
						}}
						size="small"
						variant="filled"
					/>
				</SettingComponent>
				
			)
    }
}

export class BooleanSetting implements Setting<boolean>{
		
    constructor(
        public name: string,
        public details: string,
        public defaultValue: boolean,
        public value: boolean,   
    ){}

    getComponent(props, id){
			const [value, setValue] = React.useState(this.value);
			const updateValue = (e) => {
				console.warn(e.target.checked)
				this.value = e.target.checked
				setValue(e.target.checked)
			}
			return (
				<SettingComponent key={id} name={this.name} details={this.details} {...props}>
					<Switch
					className={props.settingStyle}
					onChange={e=>updateValue(e)}
					checked={value}
					color="primary"
					inputProps={{ 'aria-labelledby': `yes-or-no-switch` }}
					/>
				</SettingComponent>
				
			)
    }
    
}

export class SelectionSetting implements Setting<any>{
	
	constructor(
			public name: string,
			public details: string,
			public defaultValue: any,
			public value: any,
			public options: Array<any>   
	){}
	
	getComponent(props, id){
			return (
					<div>
							Options
					</div>
			)
	}
    
}


// export abstract class SettingsFactory{
    
//     private value = null

//     constructor(
//         private name: string,
//         private details: string, 
//         private type: SettingType,
//         private defaultValue: any,
//     ){}

//     public abstract makeSetting(): Setting 

//     public setValue(value: any){
// 			this.value = value
//     }

//     public getValueOrDefault(){ 
// 			if (this.value !== null) return this.value
// 			else return this.defaultValue 
// 		}
// 		public getValue() { return this.value }
//     public getDefaultValue() { return this.defaultValue }
//     public getType() { return this.type }
//     public getName() { return this.name }
//     public getDetails() { return this.details }
// }

// export class NumberSettingFactory extends Setting{

// }