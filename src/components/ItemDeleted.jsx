import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import Banner from 'Banner';

export default class ItemDeleted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: props.match.params
    };
  }

  render() {
    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to={`/entities/${this.state.params.name}/items/${this.state.params.id}`}>Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Are you sure?<span></span></h1>
              <p>This will send a deletion request to the data owner that manages this data item. Once the request is approved, the data item will no longer exist.</p>
              <div class="govuk-form-group">
                <fieldset class="govuk-fieldset" aria-describedby="change-hint" role="group">
                  <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
                    <h1 class="govuk-heading-m">Delete effective from</h1>
                  </legend>
                  <span id="change-hint" class="govuk-hint">For example, 12 11 2019</span>
                  <div class="govuk-date-input" id="change-issued">
                    <div class="govuk-date-input__item">
                      <div class="govuk-form-group">
                        <label class="govuk-label govuk-date-input__label" for="change-day">Day</label>
                        <input class="govuk-input govuk-date-input__input govuk-input--width-2" id="change-day" name="change-day" type="number" pattern="[0-9]*"/>
                      </div>
                    </div>
                    <div class="govuk-date-input__item">
                      <div class="govuk-form-group">
                        <label class="govuk-label govuk-date-input__label" for="change-month">Month</label>
                        <input class="govuk-input govuk-date-input__input govuk-input--width-2" id="change-month" name="change-month" type="number" pattern="[0-9]*"/>
                      </div>
                    </div>
                    <div class="govuk-date-input__item">
                      <div class="govuk-form-group">
                        <label class="govuk-label govuk-date-input__label" for="change-year">Year</label>
                        <input class="govuk-input govuk-date-input__input govuk-input--width-4" id="change-year" name="change-year" type="number" pattern="[0-9]*"/>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <a href="#" role="button" draggable="false" className="govuk-button govuk-button--warning">Confirm deletion</a>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
