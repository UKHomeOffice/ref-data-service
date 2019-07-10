import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import Banner from 'Banner';

const ItemDeleted = (props) => {
  return (
    <div className='govuk-width-container'>
      <Banner/>
      <Link className='govuk-back-link' to={`/entities/${props.match.params.name}/items/${props.match.params.id}`}>Back</Link>
      <main className='govuk-main-wrapper ' id='main-content' role='main'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-xl'>Are you sure?<span></span></h1>
            <p>This will send a deletion request to the data owner that manages this data item. Once the request is approved, the data item will no longer exist.</p>
            <div className='govuk-form-group'>
              <fieldset className='govuk-fieldset' aria-describedby='change-hint' role='group'>
                <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
                  <h1 className='govuk-heading-m'>Delete effective from</h1>
                </legend>
                <span id='change-hint' className='govuk-hint'>For example, 12 11 2019</span>
                <div className='govuk-date-input' id='change-issued'>
                  <div className='govuk-date-input__item'>
                    <div className='govuk-form-group'>
                      <label className='govuk-label govuk-date-input__label' htmlFor='change-day'>Day</label>
                      <input className='govuk-input govuk-date-input__input govuk-input--width-2' id='change-day' name='change-day' type='number' pattern='[0-9]*'/>
                    </div>
                  </div>
                  <div className='govuk-date-input__item'>
                    <div className='govuk-form-group'>
                      <label className='govuk-label govuk-date-input__label' htmlFor='change-month'>Month</label>
                      <input className='govuk-input govuk-date-input__input govuk-input--width-2' id='change-month' name='change-month' type='number' pattern='[0-9]*'/>
                    </div>
                  </div>
                  <div className='govuk-date-input__item'>
                    <div className='govuk-form-group'>
                      <label className='govuk-label govuk-date-input__label' htmlFor='change-year'>Year</label>
                      <input className='govuk-input govuk-date-input__input govuk-input--width-4' id='change-year' name='change-year' type='number' pattern='[0-9]*'/>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <a href='#' role='button' draggable='false' className='govuk-button govuk-button--warning'>Confirm deletion</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ItemDeleted;
