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

    const addFoodItem = foodItem => {
        let x = {
            orderMasterId: values.orderMasterId,
            orderDetailId: 0,
            foodItemId: foodItem.foodItemId,
            quantity: 1,
            foodItemPrice: foodItem.foodItemPrice,
            foodItemName: foodItem.foodItemName
        };
        setValues({
            ...values,
            orderDetails: [
                ...values.orderDetails,
                x
            ]
        })
    };

    const removeFoodItem = (idx, id) => {
        let x = {...values};
        x.orderDetails = x.orderDetails.filter((item, i) => i != idx);
        setValues({
            ...x
        })
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OrderForm
                    values={values}
                    errors={errors}
                    handleInputChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
                <SearchFoodItem addFoodItem={addFoodItem} orderedFoodItems={values.orderDetails}/>
            </Grid>
            <Grid item xs={6}>
                <OrderedFoodItem orderedFoodItems={values.orderDetails} removeFoodItem={removeFoodItem}/>
            </Grid>
        </Grid>
    )
}