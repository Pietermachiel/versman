import React, { Component } from 'react';

export default class Footer extends Component {
    render() { 
        return ( 
            <footer className="footer">
                <div className="container">
                    <div className="footer-box">
                        <p>
                            Heermanszwet 13 B
                            <br/>
                            1435 CC  Rijsenhout
                            <br/>	
                            (0297) 32 01 07
                            <br/>
                            <a href="mailto:bezorgservice@versman.nl?SUBJECT=bestelling&BODY=Hallo Versman, %0D%0A%0D%0AIk wil graag de volgende bestelling doen: %0D%0A%0D%0AMijn adres is: %0D%0A%0D%0AMijn telefoonnummer is:">
                                bezorgservice@versman.nl
                            </a> 
                            <br/><br/>
                            copyright Versman 
                            <span className="copyright">&copy;2019</span>		
                        </p>
                        <h1>Biologisch is logisch</h1>
                    </div>
                </div>
            </footer>
         );
    }
}
 
