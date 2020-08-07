import React, { Component } from "react";
import Mapbox from "./Mapbox";
// import Slick from '../Test/Slick';
import statements from "../common/data/statements.json";
import { today } from "../common/common";
import Offer from "../Offer/Offer";

export default class Home extends Component {
  state = {
    name: "Versman IOO%BIO"
  };

  componentDidMount() {
    document.title = this.state.name;
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className="page-chapeau">Versman biologische groenten en fruit</div> */}
        <div className="container">
          <div className="container-header">
            <div className="corner-img">
              <img src="../public/img/products/product_tuinbonen.jpg" alt="" />
            </div>

            <h3>
              <span>{today()}</span>Wij van Versman hebben hart voor lekker
              biologisch eten van de beste kwaliteit. We halen het van zo
              dichtbij mogelijk en bezorgen al dat lekkers persoonlijk bij u
              thuis!{" "}
            </h3>
          </div>
        </div>

        <Offer />

        <div className="container">
          <div className="statements_box">
            <ul>
              {statements.map((hit, id) => {
                return (
                  <div key={id} className="statements">
                    <li>
                      <p className="statements_number">{hit.number}</p>
                      <div className="statements_statement">
                        <h3>{hit.statement}</h3>
                        <div className="statements_conclusion">
                          <p>{hit.conclusion}</p>
                        </div>
                      </div>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
