import React, { Component } from 'react';
//BCP: although we are not "explicit" using React, 
//behind the scenes it will be used when it is compiled
//to create the elements "React.createElement"
import classes from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from '.ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: "id1", name: "Felipinho", age: 9 },
      { id: "id2", name: "Bruninho", age: 12 },
      { id: "id3", name: "Duda", age: 28 }
    ],
    showPersons: false
  }

  deletePersonHandler = (indexPerson) => {
    //state should be immutable, so we have to manipulate a copy
    //const persons = this.state.persons.splice();
    const persons = [...this.state.persons];
    persons.splice(indexPerson, 1);
    this.setState({ persons: persons });
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const persons = [...this.state.persons];
    persons[personIndex].name = event.target.value;
    this.setState({ persons: persons });

    //### another way ###
    // const person = {
    //   ...this.state.persons[personIndex]
    // };
    // person.name = event.target.value;

    // const persons = [...this.state.persons];
    // persons[personIndex] = person;

    // this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    let btnClass = '';
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        < div >
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangeHandler(event, person.id)}
              />
            </ErrorBoundary>
          })}
        </div >
      );
      btnClass = classes.Red;
    }

    const myClasses = [];
    if (this.state.persons.length <= 2) {
      myClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      myClasses.push(classes.bold);
    }


    return (
      <div className={classes.App} >
        <h2>React App</h2>
        <p className={myClasses.join(' ')}>this is really working</p>
        <button className={btnClass}
          //onClick={() => {this.switchNameHandler('FELIPE')}}>Switch state!
          onClick={this.togglePersonsHandler}>Switch state!
        </button>
        {persons}
      </div>
    );
    //BCP: the code above gets compiled into the code bellow
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'bcp'));
  }
}

export default App;
