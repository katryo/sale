import React from "react";
import Button from "material-ui/Button";
import Input from "material-ui/Input";
import Icon from "material-ui/Icon";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";
import { FormControl, FormHelperText } from "material-ui/Form";
import { withStyles } from "material-ui/styles";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
  }

  handleChangeQuery(e) {
    console.log(e);
  }

  handleClickSearch(e) {
    this.props.onClickSearch(e);
  }

  render() {
    return (
      <form>
        <Grid container spacing={16}>
          <Grid item sm={10} xs={12}>
            <TextField
              id="search"
              label="Search a word you want to learn!"
              placeholder="Example: "
              value={this.props.query}
              onChange={this.handleChangeQuery}
              fullWidth
            />
          </Grid>
          <Grid item sm={2} xs={12}>
            <Button
              color="primary"
              size="large"
              onClick={this.handleClickSearch}
            >
              <Icon>search</Icon>Search
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default SearchForm;