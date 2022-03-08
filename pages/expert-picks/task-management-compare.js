import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
/**
 *
 * @returns Crm expert page
 */

const index = () => {
  return (
    <>
      <Head>
        <title>Compare top CRM software in 2022</title>
        <meta
          name="description"
          content="Quickly explore a list of CRM
          software and narrow down your top choices using features, reviews and detailed
          pricing coverage."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <section className="title__box">
          <div className="expert__container">
            <h2 className="main__title">Compare CRM Product Features</h2>
            <p className="sub__title">
              Compare CRM products features and ratings to find the right
              software according to your needs
            </p>
          </div>
        </section>

        <section className="compare__table">
          <div className="expert__container">
            <div className="table__container">
              <table>
                <thead>
                  <tr>
                    <th>Software</th>
                    <th style={{ width: "130px" }}>User Rating</th>
                    <th style={{ width: "93px" }}>
                      Free Trial <br />
                      (yes/no)
                    </th>
                    <th style={{ width: "123px" }}>
                      Contact <br />
                      Management
                    </th>
                    <th style={{ width: "128px" }}>
                      Marketing <br />
                      Management
                    </th>
                    <th style={{ width: "120px" }}>Automation</th>
                    <th style={{ width: "130px" }}>Reporting</th>
                    <th style={{ width: "110px" }}>Mobile App</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <a
                        href="http://clickmetertracking.com/tty1"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>monday.com</span>
                        <div className="img">
                          <Image layout="fill" src="/img/monday.png" alt="" />
                        </div>
                      </a>
                    </td>
                    <td>
                      <div className="rating__box">
                        <div className="rates">
                          <div className="shadow__rate">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <div className="the__rate" style={{ width: "90%" }}>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <a
                          href="https://www.spotsaas.com/product/monday-com/reviews/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Read Review</span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="http://clickmetertracking.com/tty1"
                        target="_blank"
                        rel="noreferrer"
                        className="visit__btn"
                      >
                        Try for free
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="http://clickmetertracking.com/l4lu"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>Pipedrive</span>
                        <div className="img">
                          <Image
                            layout="fill"
                            src="/img/pipedrive.png"
                            alt=""
                          />
                        </div>
                      </a>
                    </td>
                    <td>
                      <div className="rating__box">
                        <div className="rates">
                          <div className="shadow__rate">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <div className="the__rate" style={{ width: "90%" }}>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <a
                          href="https://www.spotsaas.com/product/pipedrive/reviews/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Read Review</span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="http://clickmetertracking.com/l4lu"
                        target="_blank"
                        rel="noreferrer"
                        className="visit__btn"
                      >
                        Visit Website
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="http://clickmetertracking.com/qwzd"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>Zendesk Sell </span>
                        <div className="img">
                          <Image layout="fill" src="/img/zendesk.png" alt="" />
                        </div>
                      </a>
                    </td>
                    <td>
                      <div className="rating__box">
                        <div className="rates">
                          <div className="shadow__rate">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <div className="the__rate" style={{ width: "84%" }}>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <a
                          href="https://www.spotsaas.com/product/zendesk-sell/reviews/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Read Review</span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="http://clickmetertracking.com/qwzd"
                        target="_blank"
                        rel="noreferrer"
                        className="visit__btn"
                      >
                        Visit Website
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="http://clickmetertracking.com/kl27"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>Keap </span>
                        <div className="img">
                          <Image layout="fill" src="/img/keap.png" alt="" />
                        </div>
                      </a>
                    </td>
                    <td>
                      <div className="rating__box">
                        <div className="rates">
                          <div className="shadow__rate">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <div className="the__rate" style={{ width: "82%" }}>
                              {" "}
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <a
                          href="https://www.spotsaas.com/product/keap/reviews/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Read Review</span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="http://clickmetertracking.com/kl27"
                        target="_blank"
                        rel="noreferrer"
                        className="visit__btn"
                      >
                        Try for free
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="http://clickmetertracking.com/6hf1"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>Act! </span>
                        <div className="img">
                          <Image layout="fill" src="/img/act.webp" alt="" />
                        </div>
                      </a>
                    </td>
                    <td>
                      <div className="rating__box">
                        <div className="rates">
                          <div className="shadow__rate">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <div className="the__rate" style={{ width: "74%" }}>
                              {" "}
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                        </div>
                        <a
                          href="https://www.spotsaas.com/product/act-/reviews/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Read Review</span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">✓</div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="http://clickmetertracking.com/6hf1"
                        target="_blank"
                        rel="noreferrer"
                        className="visit__btn"
                      >
                        Visit Website
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default index;
