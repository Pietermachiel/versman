import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';

export default class Abouts extends Component {
    render() { 
        return ( 
        <React.Fragment>
        <h1 className="page-title_giddyup">Team Versman</h1>

        <div className="container">

        <div className="au-box">
        <div className="au-box-right">
            <p>team versman</p>
            <div><strong>Wij van Versman staan op de markt en in de tuinderij. We zijn een stel mensen met hart voor de zaak. En met 'de zaak' bedoelen we ook het belang van lekker biologisch eten in het algemeen. Wat wij lekker vinden? Maak hier kennis met ons en klik ook onze <Link to="/recepten">recepten</Link> eens aan...</strong></div>
            <br/>
            <div className="au-box-flex">
            {thecrew.map((crew, id) => {
            return (
                <React.Fragment key={id}>
                { crew.selection === "right" ? 
                (
                <div className="auteurs au-box-right__outer content-item work-grid-item inview">
                    <Link to={"/about/" + crew.url }>
                        <div className="auteur-portret">
                            <img src={"/public/img/crew/crew_" + crew.url + ".jpg"} alt="" />
                        </div>
                        <h4 className="auteur-title" id="">
                            {crew.name}
                        </h4>
                    </Link>
                </div> 
                )
                : null }
                </React.Fragment>
            )
            })}
            </div> 
        </div>
        <div className="au-box-left">
        {thecrew.map((crew, id) => {
            const html = crew.exerpt;
            return (
                <React.Fragment key={id}>
                { crew.selection === "left" ? 
                (
                <div className="auteurs au-box-left__outer content-item work-grid-item inview">
                    <div className="au-box-left__inner-top">
                    <p className="directie">100% bio leverancier <span>supplier</span></p>
                    <Link to={"/about/" + crew.url }>
                        <div className="auteur-portret">
                            <img src={"/public/img/crew/crew_" + crew.url + ".jpg"} alt="" />
                        </div>
                        <h4 className="auteur-title" id="">
                            {crew.name}
                        </h4>
                    </Link>
                    </div>
                    <div className="au-box-left__inner-bottom">
                    <p>100% bio leverancier <span>supplier</span></p>
                    <h4>{crew.name}</h4>
                    {ReactHtmlParser(html)}
                    </div>
                </div>             
                )
                : null }
                </React.Fragment>
            )
        })}
        </div>
        </div>
        </div>
        </React.Fragment>
        );
    }
}
 