import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function AddressForm({ formData, setFormData }) {
  return (
    <React.Fragment>
    <div className="container">
      <Grid container >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            value={formData.firstName}
            onChange={(event) =>
                setFormData({ ...formData, firstName: event.target.value })
              }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            value={formData.lastName}
            onChange={(event) =>
                setFormData({ ...formData, lastName: event.target.value })
              }

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={formData.address1}
            onChange={(event) =>
                setFormData({ ...formData, address1: event.target.value })
              }

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={formData.address2}
            onChange={(event) =>
                setFormData({ ...formData, address2: event.target.value })
              }

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={formData.city}
            onChange={(event) =>
                setFormData({ ...formData, city: event.target.value })
              }

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={formData.state}
            onChange={(event) =>
                setFormData({ ...formData, state: event.target.value })
              }

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={formData.zip}
            onChange={(event) =>
                setFormData({ ...formData, zip: event.target.value })
              }

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={formData.country}
            onChange={(event) =>
                setFormData({ ...formData, country: event.target.value })
              }

          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      </div>
    </React.Fragment>
  );
}

export default AddressForm;
