import React from "react";
import Button from "material-ui/Button";
import CssBaseline from "material-ui/CssBaseline";
import Input from "material-ui/Input";
import Icon from "material-ui/Icon";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";
import { FormControl, FormHelperText } from "material-ui/Form";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={12}>
          <Grid item sm={10} xs={8}>
            <TextField
              id="search"
              label="What word do you want to learn?"
              placeholder="Example: "
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button color="primary" size="large" onClick={this.handleSubmit}>
              <Icon>search</Icon>Search
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <Grid container justify="center" spacing={12}>
            <Grid item sm={10} xs={11}>
              <h1>Search and Learn English</h1>
              <p>Search a word you want to learn.</p>
              <SearchForm />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
