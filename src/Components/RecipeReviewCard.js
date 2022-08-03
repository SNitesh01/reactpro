import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CartContext } from "../App";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  //console.log(item,'===============')

  const { cart, setCart } = React.useContext(CartContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cartHandler = (product) => {
    const newCartItems = { ...cart };
    newCartItems.items = [...cart.items, { ...product, qty: 1 }];
    localStorage.setItem("newCartItems", JSON.stringify(newCartItems));
    setCart(newCartItems);
  };

  return (
    <div className="col-md-3">
      <Card>
        <CardMedia
          image={item.image}
          component="img"
          height="194"
          alt="Paella dish"
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item?.title}
            {item.price}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            onClick={() => cartHandler(item)}
            aria-label="add to favorites"
          >
            <AddShoppingCartIcon />
          </IconButton>

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Price:{item?.price}</Typography>
            <Typography paragraph></Typography>
            <Typography paragraph></Typography>
            <Typography>{item.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
