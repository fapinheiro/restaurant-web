import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => (
    {
        root: {
            '& .MuiFormControl-root' : {
                width: '90%',
                margin: theme.spacing(1)
            }
        }
    }
))

export default function Form(props) {
    const classes = useStyles();
    const { children, ...other} = props;

    // let obj = {
    //     name: 'fil',
    //     age: 25,
    //     street: 'rua',
    //     city: 'sp'
    // }
    // intead of
    // obj.name;
    // obj.age
    // you also
    // const { name, age, ...address} = obj;
    // name
    // age
    // address.street
    // address.city

    return (
        <form className={classes.root} noValidate autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}