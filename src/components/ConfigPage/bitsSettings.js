import React, { useState, useEffect } from "react"
import { Typography, Box, List, Button, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SelectionSetting } from "./model/Setting"

export function BitsSettings(props){
    const products = props.bits && props.bits.products.length > 0 ? props.bits.products: null
    if (products === null) return <div></div>
    else{
        const requestProducts = products.filter(p => p.sku.includes('request'))
        var amountOptions = requestProducts.map(product => { return {...product, id: product.sku, value: product.cost.amount}}) // create selection options
        amountOptions.sort((a,b)=> a.value - b.value) // sort
        const productSelection = new SelectionSetting('Bits Amount', 'Amount of Bits per song request.', 25, null, amountOptions);
        return(
            productSelection.getComponent({},'bits-products', true)
        )
    }
}
