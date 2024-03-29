import * as React from 'react';
import { MenuItem, TextField, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch, Select } from '@material-ui/core';


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
	getComponent(props: {settingStyle: {}}, id: number, render?: boolean): any
	getSettingWithValue(value: T): Setting<T>
}
export const SettingComponent = props => {
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
    getComponent(props, id, render?: boolean){
			const [value, setValue] = React.useState(this.value);
			const updateValue = (e: any) => {
				let newValue = +e.target.value
				if(newValue > this.maxValue || newValue < this.minValue) return;
				setValue(newValue)
				this.value = newValue
			}
			if (!render) return <div></div>
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
			getSettingWithValue(value: number): Setting<number> {
				return new NumberSetting(
					this.name,
					this.details,
					this.defaultValue,
					value,
			this.minValue,
			this.maxValue
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
		
		getComponent(props, id, render?: boolean){
			const [value, setValue] = React.useState(this.value);
			const updateValue = (e) => {
				console.warn(e.target.checked)
				this.value = e.target.checked
				setValue(e.target.checked)
			}
			if (!render) return <div></div>
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
			
			getSettingWithValue(value: boolean): Setting<boolean> {
				return new BooleanSetting(
					this.name,
					this.details,
					this.defaultValue,
					value
		)
	}
	
}

export class SelectionSetting implements Setting<any>{
	
	
	constructor(
		public name: string,
		public details: string,
		public defaultValue: number,
		public value: number,
		public options: Array<any>   
		){}
		
		getComponent(props, id, render?: boolean){
			const [selected, setSelection] = React.useState(this.defaultValue ? this.options.findIndex(i => i.value === this.defaultValue) : 0);

			const updateSelected = (e) => {
				setSelection(e.target.value)
				this.value = this.options[e.target.value]
				if (props.onChange){
					props.onChange(this.value)
				}
			}
			if (!render) return <div></div>
			return (
				<SettingComponent key={id} name={this.name} details={this.details} {...props}>
					<Select
					labelId="demo-simple-select-filled-label"
					style={{textAlign: 'start'}}
					id="demo-simple-select-filled"
					value={selected}
					onChange={updateSelected}
					>
					{ 
						this.options.map((item, index) => 
							<MenuItem key={item.id} value={index}>
								{item.value}
							</MenuItem>
						)
					}   
					</Select>
				</SettingComponent>
			)
		}

		getSettingWithValue(value: any): Setting<any> {
			return new SelectionSetting(
				this.name,
				this.details,
				this.defaultValue,
				value,
				this.options,
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