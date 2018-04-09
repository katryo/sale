import React from "react";
import Button from "material-ui/Button";
import CssBaseline from "material-ui/CssBaseline";
import Input from "material-ui/Input";
import Icon from "material-ui/Icon";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { FormControl, FormHelperText } from "material-ui/Form";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import axios from "axios";
import { withStyles } from "material-ui/styles";
import qs from "qs";
import SearchForm from "./SearchForm";

const styles = theme => ({
  container: theme.mixins.gutters({
    padding: 16,
    margin: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "", senses: [] };
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleChangeQuery(event) {
    this.setState({ value: event.target.value });
  }

  handleClickSearch(event) {
    const that = this;
    const url = "http://127.0.0.1:8080/senses";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: { q: "web" },
      url
    };
    axios(options)
      .then(function(response) {
        that.setState({ senses: response.data.senses });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12}>
              <Paper elevation={4} className={classes.container}>
                <h1>Shape of English</h1>
                <p>
                  You will see images, mesnings, examples, videos that related
                  to the word you input!
                </p>
                <SearchForm
                  query={this.props.query}
                  onClickSearch={this.handleClickSearch}
                  onChangeQuery={this.handleChangeQuery}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={4} className={classes.container}>
                {this.state.senses.length}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
