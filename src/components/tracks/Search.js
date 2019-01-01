import React, { Component } from "react";
import { Consumer } from "../../context";
import Axios from "axios";

class Search extends Component {
  state = { trackTitle: "" };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();

    Axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
        this.state.trackTitle
      }&page_size=10&page=1&s_track_rating=desc&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    )
      .then(res => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });
        this.setState({ trackTitle: "" });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h2 className="text-center display-4">
                <i class="fa fa-music" /> Search For A Song
              </h2>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-block btn-primary mb-3"
                  type="submit"
                  disabled={this.state.trackTitle === ""}
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
