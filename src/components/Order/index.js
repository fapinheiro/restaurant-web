import React from "react";
import OrderForm from "./OrderForm";
import { useForm } from "../../hooks/useForm";
import { Grid } from "@material-ui/core";
import SearchFoodItem from "./SearchFoodItem";
import OrderedFoodItem from "./OrderedFoodItem";

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
    orderMasterId: 0,
    orderNumber: generateOrderNumber(),
    customerId: 0,
    pMethod: 'none',
    gTotal: 0,
    orderDetails: [],
    deletedOrderItemIds: ''
});


export default function Order() {

    const { values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls } = useForm(getFreshModelObject);

    

    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OrderForm
                    values={values}
                    setValues={setValues}
                    errors={errors}
                    setErrors={setErrors}
                    handleInputChange={handleInputChange} 
                    resetFormControls={resetFormControls}/>
            </Grid>
            <Grid item xs={6}>
                <SearchFoodItem 
                     values={values}
                     setValues={setValues}
                     />
            </Grid>
            <Grid item xs={6}>
                <OrderedFoodItem 
                    values={values}
                    setValues={setValues}
                    />
            </Grid>
        </Grid>
    )
}