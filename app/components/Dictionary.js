import React from 'react';
import styles from './Dictionary.css';
const enChDictionary = require('../resources/output.json');
const chEnDictionary = require('../resources/ch-en.json');
const dictionaries = {
  true: enChDictionary,
  false: chEnDictionary
}

function initState(mode) {
  mode = !mode;
  const dictionary = dictionaries[mode];
  return {
    enChMode: mode,
    results: dictionary,
    filtered: dictionary,
    query: ''
  }
}

export default class Dictionary extends React.Component {
  constructor() {
    super();
    this.state = {
      enChMode: true,
      results: enChDictionary,
      filtered: enChDictionary,
      query: ''
    }
  }

  filterResult (e) {
    const {target: {value}} = e;
    this.setState({
      filtered: this.state.results.filter(r =>
        r.term.search(value) > -1
      ),
      query: value
    });
  }

  renderResult (result, index) {
    const {term, definition} = result;
    const {query} = this.state;

    const queryPosition = term.indexOf(query)
    const head = term.substring(0, queryPosition);
    const tail = term.substring(queryPosition + query.length);

    return <li key={`${term} ${index}`} className="result">
      <div style={{display: 'inline-block', width: 40}}>
        {++index}.
      </div>
      <tt style={{display: 'inline-block'}}>
        {head}<b>{query}</b>{tail}
        <br/>
        {definition}
      </tt>
    </li>
  }

  render () {
    window.enChDictionary = this;

    return <div className="border">
      <button onClick={() => this.setState(initState(this.state.enChMode))}>
        {this.state.enChMode ? 'Translate Chinese' : 'Translate English'}
      </button>
      <label style={{padding: 40}}>Enter your term:
        <input className="query" onChange={this.filterResult.bind(this)}/>
      </label>

      <h3>Results: {this.state.filtered.length}</h3>
      <ul className="border">
        {
          this.state.filtered.slice(0, 100).map(this.renderResult.bind(this))
        }
      </ul>
    </div>
  }
}
