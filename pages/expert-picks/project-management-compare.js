import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
/**
 *
 * @returns Project management expert page
 */

const index = () => {
  return (
    <>
      <Head>
        <title>Compare top Project Management software in 2022</title>
        <meta
          name="description"
          content="Quickly explore a list of Project management
          software and narrow down your top choices using features, reviews and detailed
          pricing coverage."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <section className="title__box">
          <div className="expert__container">
            <h2 className="main__title">Compare Project Management Product Features</h2>
            <p className="sub__title">
              Compare Project management products features and ratings to find the right
              software according to your needs
            </p>
          </div>
        </section>

        <section className="compare__table">
          <div className="expert__container">
            <div className="table__container">
              <table>
                <tbody>

                  <tr>
                    <th>Software</th>

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
                      <a
                        href="http://clickmetertracking.com/1nwl"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>Clickup</span>
                        <div className="img">
                          <Image
                            layout="fill"
                            src="/img/clickup.png"
                            alt=""
                          />
                        </div>
                      </a>
                    </td>
                    <td>
                      <a
                        href="http://clickmetertracking.com/cj13"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>Smartsheet </span>
                        <div className="img">
                          <Image layout="fill" src="/img/smartsheet.png" alt="" />
                        </div>
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.spotsaas.com/product/asana/"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>Asana </span>
                        <div className="img">
                          <Image layout="fill" src="/img/asana.png" alt="" />
                        </div>
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.spotsaas.com/product/jira/"
                        target="_blank"
                        rel="noreferrer"
                        className="with__image"
                      >
                        <span>Jira </span>
                        <div className="img">
                          <Image layout="fill" src="/img/jira.jpeg" alt="" />
                        </div>
                      </a>
                    </td>

                  </tr>

                  <tr>
                    <th style={{ width: "130px" }}>User Rating</th>
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
                  </tr>

                  <tr>
                    <th style={{ width: "93px" }}>
                      Free Trial <br />
                      (yes/no)
                    </th>
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
                  </tr>

                  <tr>
                    <th style={{ width: "123px" }}>
                      Sprint
                      Planning
                    </th>
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
                        <div className="cross">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th style={{ width: "128px" }}>
                      Team Chat
                    </th>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th style={{ width: "120px" }}>Offline Time Tracking</th>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th style={{ width: "130px" }}>Issue Auditing</th>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="cross">X</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th style={{ width: "110px" }}>Mobile App</th>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                    <td>
                      <div className="tick__illus">
                        <div className="tick">X</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th>
                    </th>
                    <td>
                      <a
                        href="http://clickmetertracking.com/rkcd"
                        target="_blank"
                        rel="noreferrer"
                        className="visit__btn"
                      >
                        Try for free
                      </a>
                    </td>
                    <td>
                      <a
                        href="http://clickmetertracking.com/1nwl"
                        target="_blank"
                        rel="noreferrer"
                        className="visit__btn"
                      >
                        Visit Website
                      </a>
                    </td>
                    <td>
                      <a
                        href="http://clickmetertracking.com/cj13"
                        target="_blank"
                        rel="noreferrer"
                        className="visit__btn"
                      >
                        Visit Website
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.spotsaas.com/product/asana/"
                        target="_blank"
                        rel="noreferrer"
                        className="visithome__btn"
                      >
                        View on spotSaaS
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.spotsaas.com/product/jira/"
                        target="_blank"
                        rel="noreferrer"
                        className="visithome__btn"
                      >
                        View on spotSaaS
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
