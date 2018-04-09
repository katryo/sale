import React from "react";
import CssBaseline from "material-ui/CssBaseline";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import axios from "axios";
import { withStyles } from "material-ui/styles";
import SearchForm from "./SearchForm";
import DictionaryResults from "./DictionaryResults";
import ImageResults from "./ImageResults";

const styles = theme => ({
  container: theme.mixins.gutters({
    padding: 16,
    marginRight: 16,
    marginLeft: 16,
    marginTop: theme.spacing.unit * 1
  })
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "", senses: [], images: [] };
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleChangeQuery(event) {
    this.setState({ query: event.target.value });
  }

  requestToServer(query, path, successHandler) {
    const url = "http://127.0.0.1:8080" + path;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: { q: query },
      url
    };
    axios(options)
      .then(successHandler)
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClickSearch(event) {
    const successSensesHandler = response => {
      this.setState({ senses: response.data.senses });
    };
    this.requestToServer(this.state.query, "/senses", successSensesHandler);

    const successImagesHandler = response => {
      this.setState({ images: response.data.images });
    };
    this.requestToServer(this.state.query, "/images", successImagesHandler);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12}>
              <Paper elevation={1} className={classes.container}>
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

            <Grid item md={6} xs={12}>
              <Paper elevation={1} className={classes.container}>
                <DictionaryResults
                  senses={
                    this.state.senses === undefined ? [] : this.state.senses
                  }
                />
              </Paper>
            </Grid>

            <Grid item md={6} xs={12}>
              <Paper elevation={1} className={classes.container}>
                <ImageResults images={this.state.images} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
