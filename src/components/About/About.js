import  React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function About ({ match }) {

	const crew = thecrew.find(({ url }) => 
		url === match.params.url);

		const exerpt_html = crew.exerpt;
		const text_html = crew.text;
		const text_eng_html = crew.text_eng;

	// const titleLowercase = crew.title.toLowerCase();

  return (
	<div className="container">

			<div className="producten flex">
				<div className="product-lead_img">
					<img src={'/public/img/crew/crew_' + crew.url + '.jpg'} alt={crew.name}/>
				</div>
				<div className="product-lead_text">
					<h1>{crew.name}</h1>
					{ReactHtmlParser(text_html)}
					<strong>{ReactHtmlParser(text_eng_html)}</strong>
				</div>
      </div>
			
	  </div> 
    )
}