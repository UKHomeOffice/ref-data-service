import React from 'react';
import {Link} from 'react-router-dom';

// local imports
import Banner from 'Banner';

export default class Home extends React.Component {
  render() {
    return (
      <div className="govuk-width-container">
        <Banner/>
        <main id="main-content" className="govuk-main-wrapper " role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Reference Data Governance Tool</h1>
              <p className="govuk-body">
                This service allows you to search for and manage reference datasets that are owned by Border Force.
              </p>
              <Link className="govuk-button" role="button" draggable="false" to="/search">Search</Link>
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0"/>
                </div>
              </div>
              <h1 className="govuk-heading-l">My Requests</h1>
              <span></span>
              <p className="govuk-body">Manage your recent dataset requests below.</p>
              <div className="govuk-tabs" data-module="tabs">
                <ul className="govuk-tabs__list" role="tablist">
                  <li className="govuk-tabs__list-item" role="presentation">
                    <Link className="govuk-tabs__tab govuk-tabs__tab--selected"
                          to="#requests-open"
                          id="tab_requests-open"
                          role="tab"
                          aria-controls="requests-open"
                          tabIndex="0"
                          aria-selected="true">
                        Open (3)
                    </Link>
                  </li>
                  <li className="govuk-tabs__list-item" role="presentation">
                    <Link id="tab_requests-accepted"
                          className="govuk-tabs__tab"
                          role="tab"
                          aria-controls="gars-submitted"
                          tabIndex="-1"
                          aria-selected="false"
                          to="#requests-accepted">
                      Accepted (246)
                    </Link>
                  </li>
                  <li className="govuk-tabs__list-item" role="presentation">
                    <Link id="tab_requests-rejected"
                          className="govuk-tabs__tab"
                          role="tab"
                          aria-controls="gars-cancelled"
                          tabIndex="-1"
                          aria-selected="false"
                          to="#requests-rejected">
                      Rejected (1)
                    </Link>
                  </li>
                </ul>
                <section id="requests-open" className="govuk-tabs__panel" role="tabpanel" aria-labelledby="tab_requests-open">
                  <table className="govuk-table">
                    <thead className="govuk-table__head">
                      <tr className="govuk-table__row">
                        <th className="govuk-table__header" scope="col">Reference</th>
                        <th className="govuk-table__header" scope="col">Request Date</th>
                        <th className="govuk-table__header" scope="col">Dataset</th>
                        <th className="govuk-table__header" scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody className="govuk-table__body">
                      <tr className="govuk-table__row">
                        <td className="govuk-table__cell"><Link to="#0">123456789</Link></td>
                        <td className="govuk-table__cell">10/03/19</td>
                        <td className="govuk-table__cell">IATLink to CodLinks</td>
                        <td className="govuk-table__cell">Submitted to IAO</td>
                      </tr>
                      <tr className="govuk-table__row">
                        <td className="govuk-table__cell"><Link to="#0">123456789</Link></td>
                        <td className="govuk-table__cell">10/03/19</td>
                        <td className="govuk-table__cell">Office location information</td>
                        <td className="govuk-table__cell">IAO Review</td>
                      </tr>
                      <tr className="govuk-table__row">
                        <td className="govuk-table__cell"><Link to="#0">123456789</Link></td>
                        <td className="govuk-table__cell">10/03/19</td>
                        <td className="govuk-table__cell">Officer Ranks</td>
                        <td className="govuk-table__cell">Awaiting response</td>
                      </tr>
                    </tbody>
                  </table>
                  <nav role="navigation" aria-label="Pagination">
                    <div className="pagination__summary">Showing 101 – 111 of 246 results</div>
                    <ul className="pagination">
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Previous page"><span aria-hidden="true" role="presentation">«</span> Previous</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Page 1">1</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link current" to="#0" aria-current="true" aria-label="Page 2, current page">2</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Page 3">3</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Next page">Next <span aria-hidden="true" role="presentation">»</span></Link>
                      </li>
                    </ul>
                  </nav>
                </section>
                <section className="govuk-tabs__panel govuk-tabs__panel--hidden" id="requests-accepted" role="tabpanel" aria-labelledby="tab_requests-accepted">
                  <table className="govuk-table">
                    <thead className="govuk-table__head">
                      <tr className="govuk-table__row">
                        <th className="govuk-table__header" scope="col">Reference</th>
                        <th className="govuk-table__header" scope="col">Request Date</th>
                        <th className="govuk-table__header" scope="col">Dataset</th>
                        <th className="govuk-table__header" scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody className="govuk-table__body">
                      <tr className="govuk-table__row">
                        <td className="govuk-table__cell"><Link to="#0">123456789</Link></td>
                        <td className="govuk-table__cell">10/03/19</td>
                        <td className="govuk-table__cell">IATA Port Codes</td>
                        <td className="govuk-table__cell">Submitted to IAO</td>
                      </tr>
                    </tbody>
                  </table>
                  <nav role="navigation" aria-label="Pagination">
                    <div className="pagination__summary">Showing 101 – 111 of 246 results</div>
                    <ul className="pagination">
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Previous page"><span aria-hidden="true" role="presentation">«</span> Previous</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Page 1">1</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link current" to="#0" aria-current="true" aria-label="Page 2, current page">2</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Page 3">3</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Next page">Next <span aria-hidden="true" role="presentation">»</span></Link>
                      </li>
                    </ul>
                  </nav>
                </section>
                <section className="govuk-tabs__panel govuk-tabs__panel--hidden" id="requests-rejected" role="tabpanel" aria-labelledby="tab_requests-rejected">
                  <table className="govuk-table">
                    <thead className="govuk-table__head">
                      <tr className="govuk-table__row">
                        <th className="govuk-table__header" scope="col">Reference</th>
                        <th className="govuk-table__header" scope="col">Request Date</th>
                        <th className="govuk-table__header" scope="col">Dataset</th>
                        <th className="govuk-table__header" scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody className="govuk-table__body">
                      <tr className="govuk-table__row">
                        <td className="govuk-table__cell"><Link to="#0">123456789</Link></td>
                        <td className="govuk-table__cell">10/03/19</td>
                        <td className="govuk-table__cell">IATA Port Codes</td>
                        <td className="govuk-table__cell">Submitted to IAO</td>
                      </tr>
                    </tbody>
                  </table>
                  <nav role="navigation" aria-label="Pagination">
                    <div className="pagination__summary">Showing 101 – 111 of 246 results</div>
                    <ul className="pagination">
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Previous page"><span aria-hidden="true" role="presentation">«</span> Previous</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Page 1">1</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link ctont" to="#0" aria-current="true" aria-label="Page 2, current page">2</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Page 3">3</Link>
                      </li>
                      <li className="pagination__item">
                        <Link className="pagination__link" to="#0" aria-label="Next page">Next <span aria-hidden="true" role="presentation">»</span></Link>
                      </li>
                    </ul>
                  </nav>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

