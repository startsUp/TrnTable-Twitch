import React, { useState, useEffect } from "react"
import { Typography, Box, List, Button, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SelectionSetting } from "./model/Setting"

export function BitsSettings(props){
    const products = props.bits && props.bits.products.length > 0 ? props.bits.products: null
    if (products === null) return <div></div>
    else{
        const currentRequestProduct = products.find(p => p.sku === props.userSettings.requestProductSKU)
        const defaultRequestAmount = currentRequestProduct ? currentRequestProduct.cost.amount : 25
        const requestProducts = products.filter(p => p.sku.includes('request'))
        var amountOptions = requestProducts.map(product => { return {...product, id: product.sku, value: product.cost.amount}}) // create selection options
        amountOptions.sort((a,b)=> a.value - b.value) // sort
        const productSelection = new SelectionSetting('Bits Amount', 'Amount of Bits per song request.', defaultRequestAmount, null, amountOptions);
        
        const onChange = (product) => {
            console.log('Bits amount --> ', product)
            props.userSettings.requestProductSKU = product.sku
        }

        return(
            productSelection.getComponent({...props, onChange},'bits-products', true)
        )
    }
}
