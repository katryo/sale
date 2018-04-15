import React from "react";
import CssBaseline from "material-ui/CssBaseline";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import axios from "axios";
import { withStyles } from "material-ui/styles";
import SearchForm from "./SearchForm";
import Typography from "material-ui/Typography";
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
    this.state = { query: "", dictEntries: [], images: [] };
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
    event.preventDefault();
    const successSensesHandler = response => {
      this.setState({ dictEntries: response.data.entries });
    };
    this.requestToServer(this.state.query, "/senses", successSensesHandler);

    const successImagesHandler = response => {
      this.setState({ images: response.data.images });
    };
    this.requestToServer(this.state.query, "/images", successImagesHandler);
  }

  render() {
    const { classes } = this.props;

    let dictionaryResults = "";
    if (this.state.dictEntries && this.state.dictEntries.length > 0) {
      dictionaryResults = (
        <Grid item md={6} xs={12}>
          <Paper elevation={1} className={classes.container}>
            <DictionaryResults
              dictEntries={
                this.state.dictEntries === undefined
                  ? []
                  : this.state.dictEntries
              }
            />
          </Paper>
        </Grid>
      );
    }

    let imageResults = "";
    if (this.state.images && this.state.images.length > 0) {
      imageResults = (
        <Grid item md={6} xs={12}>
          <Paper elevation={1} className={classes.container}>
            <ImageResults images={this.state.images} />
          </Paper>
        </Grid>
      );
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12}>
              <Paper elevation={1} className={classes.container}>
                <Typography variant="display3">Shape of English</Typography>
                <Typography variant="body2">
                  This web page is an English learning tool. You can get the
                  meanings, example usage, and videos that are related to the
                  word or phrase you input!
                </Typography>
                <SearchForm
                  query={this.props.query}
                  onClickSearch={this.handleClickSearch}
                  onChangeQuery={this.handleChangeQuery}
                />
              </Paper>
            </Grid>

            {dictionaryResults}
            {imageResults}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
