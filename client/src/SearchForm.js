import React from "react";
import Button from "material-ui/Button";
import Icon from "material-ui/Icon";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
  }

  handleChangeQuery(e) {
    this.props.onChangeQuery(e);
  }

  handleClickSearch(e) {
    this.props.onClickSearch(e);
  }

  render() {
    return (
      <form onSubmit={this.handleClickSearch}>
        <Grid container spacing={16}>
          <Grid item md={10} sm={9} xs={12}>
            <TextField
              id="search"
              label="Search a word you want to learn!"
              placeholder="Example: "
              value={this.props.query}
              onChange={this.handleChangeQuery}
              fullWidth
            />
          </Grid>
          <Grid item md={2} sm={3} xs={12}>
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
