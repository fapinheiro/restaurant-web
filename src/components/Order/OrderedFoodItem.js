import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from "@material-ui/core";
import React from "react";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

export default function OrderedFoodItem(props) {
    const { orderedFoodItems, removeFoodItem} = props;

    return (
        <List>
            {
                orderedFoodItems.map( (item,idx) => (
                    <Paper key={idx}>
                        <ListItem>
                                <ListItemText primary={item.foodItemName} 
                                    primaryTypographyProps={
                                        {
                                            component: 'h1',
                                            stype: {
                                                fontWeight: '500',
                                                fontSize: '1.2em'
                                            }
                                        }
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton disableRipple onClick={e => removeFoodItem(idx, item.orderDetailId)}>
                                        <DeleteTwoToneIcon/>
                                    </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                ))
            }
        </List>
    );
}