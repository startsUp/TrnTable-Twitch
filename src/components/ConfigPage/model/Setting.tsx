import * as React from 'react';
import { TextField, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    getComponent(props: {settingStyle: {}}): any
    getSettingType(): SettingType
}
const SettingComponent = props => {
	return (
		<ListItem>
        <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
        <ListItemSecondaryAction>
          {props.children}
        </ListItemSecondaryAction>
      </ListItem>
	)
}
const useStyles = makeStyles(theme => ({
  1: {
    height: '100vh',
	},
	2: {
			
	}
}))

export class NumberSetting implements Setting<number>{
    
    readonly settingType = SettingType.NUMBER

    constructor(
        public name: string,
        public details: string,
        public defaultValue: number,
        public value: number,   
        public minValue: number,
        public maxValue: number,
    ){}

    getSettingType(){
			return this.settingType
    }

    getComponent(props){
			return (
				<SettingComponent>
					<TextField
						className={props.settingStyle}
						id="filled-number-small"
						label="Number"
						type="number"
						InputLabelProps={{
							shrink: true,
							max: this.maxValue,
							min: this.minValue
						}}
						size="small"
						variant="filled"
					/>
				</SettingComponent>
				
			)
    }
}

export class BooleanSetting implements Setting<boolean>{
		
		readonly settingType: SettingType.BOOLEAN
		
    constructor(
        public name: string,
        public details: string,
        public defaultValue: boolean,
        public value: boolean,   
    ){}

		getSettingType(){
			return this.settingType
		}
    getComponent(props){
			return (
				<Switch
					className={props.settingStyle}
					edge="end"
					// onChange={}
					checked={true}
					inputProps={{ 'aria-labelledby': `yes-or-no-switch` }}
				/>
			)
    }
    
}

export class SelectionSetting implements Setting<any>{
	
	readonly settingType = SettingType.SELECTION
	
	constructor(
			public name: string,
			public details: string,
			public defaultValue: any,
			public value: any,
			public options: Array<any>   
	){}

	getSettingType(){
		return this.settingType
	}
	
	getComponent(){
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