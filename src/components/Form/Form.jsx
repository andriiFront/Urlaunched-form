import React, { useState } from 'react';
import classnames from 'classnames';
import icon from '../../images/icon.svg';
import eye from '../../images/eye.svg';
import male from '../../images/male.svg';
import maleGreen from '../../images/maleGreen.svg';
import female from '../../images/female.svg';
import femaleGreen from '../../images/femaleGreen.svg';
import othermale from '../../images/othermale.svg';
import othermaleGreen from '../../images/othermaleGreen.svg';
import './Form.scss';

export const Form = () => {
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [pswrd, setPswrd] = useState('');
  const [confPswrd, setConfPswrd] = useState('');

  const [errGender, setErrGender] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPswrd, setErrPswrd] = useState(false);
  const [errConfPswrd, setErrConfPswrd] = useState(false);

  const [errCorrectEmail, setErrCorrectEmail] = useState(false);
  const [errCorrectPswrd, setErrCorrectPswrd] = useState(false);
  const [errCorrectConfPswrd, setErrCorrectConfPswrd] = useState(false);

  const [hiddenPswrd, setHiddencPswrd] = useState(false);
  const [hiddenConfPswrd, setHiddenConfPswrd] = useState(false);

  // eslint-disable-next-line
  const patternPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  // eslint-disable-next-line
  const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !gender
      || !email.match(patternEmail)
      || !pswrd
      || (pswrd.length < 6)
      || !confPswrd
      || (pswrd !== confPswrd)
    ) {
      setErrGender(!gender);
      if (email) {
        setErrCorrectEmail(!email.match(patternEmail));
      } else {
        setErrEmail(!email);
      }

      if (pswrd) {
        setErrCorrectPswrd(pswrd.length < 6);
      } else {
        setErrPswrd(!pswrd);
      }

      if (confPswrd) {
        setErrCorrectConfPswrd(pswrd !== confPswrd);
      } else {
        setErrConfPswrd(!confPswrd);
      }

      return;
    }

    const message = `
      gender: ${gender};
      email: ${email};
      password: ${pswrd}
    `;

    // eslint-disable-next-line
    alert(message);

    setGender('');
    setEmail('');
    setPswrd('');
    setConfPswrd('');
  };

  return (
    <form className="form consultation__form" method="POST" onSubmit={onSubmit}>
      <img className="form__icon" src={icon} alt="icon" />

      <h1 className="form__heading">
        Sign Up with email
      </h1>

      <div className="form__label">
        <h2 className="form__subheading">Gender</h2>
        <div
          className="form__radio-container"
          onChange={(e) => {
            setErrGender(false);
            setGender(e.target.value);
          }}
        >
          <label className={classnames(
            'form__inpt',
            'form__inpt-gender',
            { 'form__inpt-checked': gender === 'male' },
          )}
          >
            <input
              className="form__radio-inpt"
              type="radio"
              value="male"
              name="gender"
              defaultChecked={gender === 'male'}
            />
            <img
              className="form__radio-icon"
              src={gender === 'male' ? maleGreen : male}
              alt="male"
            />
            <span className="form__radio-txt">Male</span>
          </label>
          <label className={classnames(
            'form__inpt',
            'form__inpt-gender',
            { 'form__inpt-checked': gender === 'female' },
          )}
          >
            <input
              className="form__radio-inpt"
              type="radio"
              value="female"
              name="gender"
              defaultChecked={gender === 'female'}
            />
            <img
              className="form__radio-icon"
              src={gender === 'female' ? femaleGreen : female}
              alt="female"
            />
            <span className="form__radio-txt">Female</span>
          </label>
          <label className={classnames(
            'form__inpt',
            'form__inpt-gender',
            { 'form__inpt-checked': gender === 'other' },
          )}
          >
            <input
              className="form__radio-inpt"
              type="radio"
              value="other"
              name="gender"
              defaultChecked={gender === 'other'}
            />
            <img
              className="form__radio-icon"
              src={gender === 'other' ? othermaleGreen : othermale}
              alt="ohter"
            />
            <span className="form__radio-txt">Other</span>
          </label>
        </div>
        {errGender && (
          <p className="form__error-descr">
            please select your gender
          </p>
        )}
      </div>

      <label className="form__label" htmlFor="email">
        <h2 className="form__subheading">E-mail</h2>
        <input
          value={email}
          className={classnames(
            'form__inpt',
            { 'form__inpt-error': (errEmail || errCorrectEmail) },
          )}
          id="email"
          type="text"
          name="email"
          placeholder={classnames(
            { 'E-mail': (!errEmail && !errCorrectEmail) },
            { 'No e-mail': errEmail },
          )}
          onChange={(e) => {
            setErrEmail(false);
            setErrCorrectEmail(false);
            setEmail(e.target.value);
          }}
        />
        {errEmail && (
          <p className="form__error-descr">
            please enter your e-mail
          </p>
        )}
        {errCorrectEmail && (
          <p className="form__error-descr">
            invalid email format
          </p>
        )}
      </label>

      <label className="form__label" htmlFor="password">
        <h2 className="form__subheading">Create Password</h2>
        <div className={classnames(
          'form__inpt',
          { 'form__inpt-error': (errPswrd || errCorrectPswrd) },
        )}
        >
          <input
            value={pswrd}
            id="password"
            className="form__inpt-field"
            type={hiddenPswrd ? 'text' : 'password'}
            name="password"
            placeholder="password"
            onChange={(e) => {
              setErrPswrd(false);
              setErrCorrectPswrd(false);
              setPswrd(e.target.value);
            }}
          />
          <button
            className="form__psw-btn"
            type="button"
            onClick={() => setHiddencPswrd(!hiddenPswrd)}
          >
            <img
              src={eye}
              alt="show/hide password"
              className="form__psw-icon"
            />
          </button>
        </div>
        {errPswrd && (
          <p className="form__error-descr">
            please enter your password
          </p>
        )}
        {errCorrectPswrd && (
          <p className="form__error-descr">
            password must be at least six charachters long
          </p>
        )}
      </label>

      <label className="form__label" htmlFor="confirm password">
        <h2 className="form__subheading">Confirm Password</h2>
        <div className={classnames(
          'form__inpt',
          { 'form__inpt-error': (errConfPswrd || errCorrectConfPswrd) },
        )}
        >
          <input
            value={confPswrd}
            id="confirm password"
            className="form__inpt-field"
            type={hiddenConfPswrd ? 'text' : 'password'}
            name="confirm password"
            placeholder="confirm password"
            onChange={(e) => {
              setErrConfPswrd(false);
              setErrCorrectConfPswrd(false);
              setConfPswrd(e.target.value);
            }}
          />
          <button
            className="form__psw-btn"
            type="button"
            onClick={() => setHiddenConfPswrd(!hiddenConfPswrd)}
          >
            <img
              src={eye}
              alt="show/hide password"
              className="form__psw-icon"
            />
          </button>
        </div>
        {errConfPswrd && (
          <p className="form__error-descr">
            please confirm password
          </p>
        )}
        {errCorrectConfPswrd && (
          <p className="form__error-descr">
            password must match
          </p>
        )}
      </label>

      <button
        className="form__button"
        type="submit"
      >
        Sign Up
      </button>

      <p className="form__text">
        Already have an account?
        {' '}
        <a
          href="https://www.google.com/"
          className="form__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log In
        </a>
      </p>

      <p className="form__text">
        Review privacy and disclosures here
        {' '}
        <a
          href="https://www.google.com/"
          className="form__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </p>

    </form>
  );
};
