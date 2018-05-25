import './Login.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



function UserPreview(props) {
  return(
    <div>
      <div className='column'>
        <img 
          className='avatar'
          src={props.avatar}
          alt={'Avatar for' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
        <button
          className='reset'
          onClick={props.onReset.bind(null, props.className)} >
          Reset
        </button>
      </div>
    </div>
  )
}

UserPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}




export class UserInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(
      this.props.className,
      this.state.username,
      this.state.password
    );
    console.log(this.state.password);
    console.log(this.state.username);
    console.log(this.props.className);
  }


  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='customer'>
          {this.props.label}
        </label>
        <input 
          className={this.props.label}
          placeholder='github username'
          type='text'
          autoComplete='off'
          name='username'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input 
          className={this.props.label}
          placeholder='user password'
          type='password'
          autoComplete='off'
          name='password'
          value= {this.state.password}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={this.state.username === "" || this.state.password === ""}>
          Submit
        </button>
      </form>
    )
  }
}

UserInput.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

UserInput.defaultProps = {
  label: 'Username',
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moverName: '',
      customerName: '',
      moverPassword: '',
      customerPassword: '',
      moverImage: null,
      customerImage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(className, username, password) {
    this.setState(function() {
      const newState = {};
      newState[className + 'Name'] = username;
      newState[className + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      newState[className + 'Password'] = password;
      return newState;
    });
    
  }

  handleReset(className) {
    this.setState(function() {
      const newState = {};
      newState[className + 'Name'] = '';
      newState[className + 'Image'] = null;
      newState[className + 'Password'] = '';
      return newState;
    })
  }

  render() {
    const match = this.props.match;
    const moverName = this.state.moverName;
    const customerName = this.state.customerName;
    const moverImage = this.state.moverImage;
    const customerImage = this.state.customerImage;
    const moverPassword = this.state.moverPassword;
    const customerPassword = this.state.cutomerPassword;
    return(
      <div>
        <div className='row'>
          {!moverName && !moverPassword &&
            <UserInput 
              className='mover'
              label='Mover'
              password={this.state.moverPassword}
              onSubmit={this.handleSubmit}
          />}

          {moverImage !== null &&
            <UserPreview
              avatar={moverImage}
              username={moverName}
              onReset={this.handleReset}
              className='mover'
            />
          }

          {!customerName && !customerPassword &&
            <UserInput 
              className='customer'
              label='Customer'
              password={this.state.customerPassword}
              onSubmit={this.handleSubmit}
            />
          }

          {customerImage !== null &&
            <UserPreview
              avatar={customerImage}
              username={customerName}
              onReset={this.handleReset}
              className='customer'
            />
          }
        </div>

        {moverImage && customerImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: `?moverName=` + moverName + `&customerName=` + customerName 
            }}>
              Move
          </Link>}
      </div>
    ) 
  }
}


export default Login;