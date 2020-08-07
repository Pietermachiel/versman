import assortiment from "../../../public/js/assortiment_all.json";

export const saleAssortiment = [];
assortiment.map(hit => {
  const x = hit;
  hit.sale == true ? saleAssortiment.push(x) : null ;
});

export const saleSale = [];
assortiment.map(hit => {
  const x = hit.title;
  hit.sale == true ? (saleSale.indexOf(x) === -1 ? saleSale.push(x) : null) : null ;
});

export const saleCategory = [];
assortiment.forEach(cat => {
    if ( cat.sale === true ) {
        saleCategory.indexOf(cat.category) === -1 ? saleCategory.push(cat.category) : null;
    }
});

export const saleSort = [];
assortiment.forEach(prod => {
    if ( prod.sale === true ) {
        saleSort.indexOf(prod.sort) === -1 ? saleSort.push(prod.sort) : null;
    }
});

export const saleCountries = [];
assortiment.map(hit => {
  const x = hit.country;
  saleCountries.indexOf(x) === -1 ? saleCountries.push(x) : null;
});

export const saleLocations = [];
assortiment.map(hit => {
  const x = hit.location;
  saleLocations.indexOf(x) === -1 ? saleLocations.push(x) : null;
});

