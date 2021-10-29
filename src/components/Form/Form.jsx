import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

export const Form = ({ districts, jobPlaces }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');
  const [jobPlace, setJobPlace] = useState('');
  const [jobPlaceName, setJobPlaceName] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const [errName, setErrName] = useState(false);
  const [errSurname, setErrSurname] = useState(false);
  const [errPhone, setErrPhone] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errDistrict, setErrDistrict] = useState(false);
  const [errJobPlace, setErrJobPlace] = useState(false);
  const [errPrivacy, setErrPrivacy] = useState(false);

  const [errCorrectPhone, setErrCorrectPhone] = useState(false);
  const [errCorrectEmail, setErrCorrectEmail] = useState(false);
// eslint-disable-next-line
  const patternPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// eslint-disable-next-line
  const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !name
      || !surname
      || !phone
      || !phone.match(patternPhone)
      || !email.match(patternEmail)
      || !district
      || !jobPlace
      || !privacy
    ) {
      setErrName(!name);
      setErrSurname(!surname);
      phone
        ? setErrCorrectPhone(!phone.match(patternPhone))
        : setErrPhone(!phone);
      email
        ? setErrCorrectEmail(!email.match(patternEmail))
        : setErrEmail(!email);
      setErrDistrict(!district);
      setErrJobPlace(!jobPlace);
      setErrPrivacy(!privacy);

      return;
    }

    setName('');
    setSurname('');
    setPhone('');
    setEmail('');
    setDistrict('');
    setJobPlace('');
    setJobPlaceName('');
    setPrivacy(false);
  };

  return (
    <form className="form consultation__form" onSubmit={onSubmit}>

      {errName && <p className="form__error-empty">введіть ім&apos;я</p>}
      <input
        value={name}
        className="form__inpt"
        id="name"
        type="text"
        name="name"
        placeholder="Ім'я"
        onChange={(e) => {
          setErrName(false);
          setName(e.target.value);
        }}
      />

      {errSurname && <p className="form__error-empty">введіть прізвище</p>}
      <input
        value={surname}
        className="form__inpt"
        id="surname"
        type="text"
        name="surname"
        placeholder="Прізвище"
        onChange={(e) => {
          setErrSurname(false);
          setSurname(e.target.value);
        }}
      />

      {errPhone && <p className="form__error-empty">введіть телефон</p>}
      {errCorrectPhone && (
        <p className="form__error-empty">
          невірний формат номеру телефона
        </p>
      )}
      <input
        value={phone}
        className="form__inpt"
        id="phone"
        type="tel"
        name="phone"
        placeholder="Phone"
        onChange={(e) => {
          setErrPhone(false);
          setErrCorrectPhone(false);
          setPhone(e.target.value);
        }}
      />

      {errEmail && <p className="form__error-empty">введіть E-mail</p>}
      {errCorrectEmail && (
        <p className="form__error-empty">
          невірний формат електронної адреси
        </p>
      )}
      <input
        value={email}
        className="form__inpt"
        id="email"
        type="text"
        name="email"
        placeholder="E-mail"
        onChange={(e) => {
          setErrEmail(false);
          setErrCorrectEmail(false);
          setEmail(e.target.value);
        }}
      />

      {errDistrict && <p className="form__error-empty">Виберіть область</p>}
      <select
        className="form__inpt"
        value={district}
        id="district"
        name="district"
        onChange={(e) => {
          setErrDistrict(false);
          setDistrict(e.target.value);
        }}
      >
        <option value="">Виберіть область</option>
        {districts.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}

      </select>

      {errJobPlace && (
        <p className="form__error-empty">
          Виберіть місце роботи
        </p>
      )}
      <select
        className="form__inpt"
        value={jobPlace}
        id="jobPlace"
        name="jobPlace"
        onChange={(e) => {
          setErrJobPlace(false);
          setJobPlace(e.target.value);
        }}
      >
        <option value="">Назва місця роботи</option>
        {jobPlaces.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        value={jobPlaceName}
        className="form__inpt"
        id="jobPlaceName"
        type="text"
        name="jobPlaceName"
        placeholder="Назва місця роботи"
        onChange={(e) => {
          setJobPlaceName(e.target.value);
        }}
      />

      {errPrivacy && (
        <p className="form__error-empty">
          Необхідно ознайомтись та надати згоду
        </p>
      )}
      <label className="form__inpt" htmlFor="privacy">
        Згоден з умовами договору публічної оферти
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          checked={privacy}
          onChange={(e) => {
            setErrPrivacy(false);
            setPrivacy(e.target.checked);
          }}
        />
      </label>

      <button
        className="form__button"
        type="submit"
      >
        Відправити
      </button>

    </form>
  );
};

Form.propTypes = {
  districts: PropTypes.arrayOf(PropTypes.string),
  jobPlaces: PropTypes.arrayOf(PropTypes.string),
};

Form.defaultProps = {
  districts: [],
  jobPlaces: [],
};
