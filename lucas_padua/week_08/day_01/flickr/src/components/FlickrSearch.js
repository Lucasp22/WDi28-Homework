import React, { Component } from 'react';
import jsonp from 'jsonp-es6';


class FlickrSearch extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    }
    this.fetchImages = this.fetchImages.bind(this);
  }
  fetchImages(q) {
    console.log('Searching flickr for', q);
    const flickrURL ='https://api.flickr.com/services/rest?jsoncallback=?';
    const flickrParams = {
      method: 'flickr.photos.search',
      api_key: '2f5ac274ecfac5a455f38745704ad084', // not a secret key
      text: q,
      format: 'json'
    };
  const generateURL = function (photo) {
    return [
        'http://farm',
        photo.farm,
        '.static.flickr.com/',
        photo.server,
        '/',
        photo.id,
        '_',
        photo.secret,
        '_q.jpg' // Change 'q' to something else for different sizes
      ].join(''); // Return a string by join()ing the array elements.
  };
  jsonp(flickrURL, flickrParams, {callback: 'jsoncallback'}).then((results) => {
    const images = results.photos.photo.map(generateURL);
    this.setState({images: images});
  });

  } //end of fetchImages

  render(){
    return(
      <div>
      <h2>Flickr Search</h2>

      <SearchForm onSubmit={ this.fetchImages } />
      <Gallery images={ this.state.images }/>
      </div>
    );
  }
};// end of FlickrSearch

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {query: ''};
    this._handleInput = this._handleInput.bind( this );
    this._handleSubmit = this._handleSubmit.bind( this );
  }

  _handleInput(e) {
    this.setState({query: e.target.value});
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  }
  render() {
    return (
      <form onSubmit={ this._handleSubmit }>
      <input type="search" placeholder="Butterfly" required onInput={ this._handleInput } />
      <input type="submit" value="Search"/>
      </form>
    );
  }
}/// end SearchForm

class Gallery extends Component {
  render() {
    return (
      <div>
      { this.props.images.map( (url) => <Image url={url} key={url}/> ) }
      </div>
    )
  }
}

function Image (props) {
  return (
    <img src={ props.url } width="250" height="250" alt={ props.url }/>
  );
}

export default FlickrSearch;
