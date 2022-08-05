import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { CartContext } from "../App";



const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" }
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.y}px 0`
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing.y * 2
  }
});

function Review(props) {
    const { cart } = React.useContext(CartContext);
    const { classes } = props;
    const [user, setUser] = React.useState([])

    React.useEffect(() => {
        if (localStorage.getItem("user")) {
          let data = localStorage.getItem("user");
          setUser(JSON.parse(data));
        }
      }, [setUser]);
    
 //console.log(user)

      

    const subTotal = cart.items
    ?.reduce((acc, el) => acc + el.price * el.qty, 0)
    .toFixed(2);
  const discount = ((15 / 100) * subTotal).toFixed(2);
  const grandTotal = (subTotal - discount).toFixed(2);

  return (
    <React.Fragment>
      <div className="container">
      {cart.items?.map((product, id) => (
      <List disablePadding>
          <ListItem className={classes.listItem} key={id}>
            <ListItemText primary={product.title}/>
           <h6>Qty:{product.qty}</h6>
           <h6>Price:{product.price}</h6> 
          </ListItem>
        </List>
        ))}
        <h5>subTotal:...........................................{subTotal}</h5>
        <h5>Discount...........................................{discount}</h5>
        <h5>grandTotal:...........................................{grandTotal}</h5>

        
     
        <Grid container >
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{user.fname} {user.lname}</Typography>
          <Typography gutterBottom>{`addresses.join(", ")`}</Typography>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment,id) => (
              <React.Fragment key={id}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>

      </Grid>
      </div>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);
