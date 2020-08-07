$( document ).ready(function() {
    console.log( "countries ready!" );

    function slugify(text) {
        return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\.+/g, '')
        .replace(/\'+/g, '');
    }
    
    var url  = "https://versman-api.herokuapp.com/api/products";
    var xhr  = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = function() {
      
        var assortiment = JSON.parse(xhr.responseText);
        console.log("assortiment");
        console.log(assortiment);

        const countriesArray = [];
        assortiment.map(hit => {
          const x = hit.country.name;
          if ( hit.sale === true ) 
          countriesArray.indexOf(x) === -1 ? countriesArray.push(x) : null;
        });

        console.log("countriesArray");
        console.log(countriesArray);

        countriesArray.map(country => {

            var thecountry = slugify(country);	

            var productArray = [];
            assortiment.map(hit => {
                var acountry = slugify(hit.country.name);
                const y = hit.sort.name;
                if ( hit.sale === true ) {
                   thecountry === acountry ? productArray.indexOf(y) === -1 ? productArray.push(y) : null : null;
                };
            })

            var productsSorted = productArray.sort();
            console.log("productsSorted");
            console.log(productsSorted);

            var showProducts = '<div class="products-box">';
            productsSorted.forEach(function(product) {
                // console.log(product);
                var theproduct = slugify(product);
                showProducts += '<li class="list-item"><button class="bg100_' + thecountry + '"></button><a href="/producten/' + theproduct + '" class="color_' + thecountry + '">' + product + '</a></li>';
            })
            showProducts += '</div>'

            // console.log(showProducts);

            // $("#id_" + thecountry).mouseover(function(event) {
            //     event.preventDefault();
            //     document.getElementById('products-nl').innerHTML = showProducts;
            //     var uit = country !== "Direct van de boer" ? "uit" : "";
            //     dichtbij =  uit + country;
            //     document.getElementById('dichtbij').innerHTML = dichtbij;
            //     }).mouseout(function() {
            //         document.getElementById('products-nl').innerHTML = "";
            //         document.getElementById('dichtbij').innerHTML = "en van zo dichtbij mogelijk";
            //     }); 


            var toggleDataTip = 1;
            $("#id_" + thecountry).click(function(event) {
                event.preventDefault(); 
                    if ( toggleDataTip == 1 ) {
                    document.getElementById('products-nl').innerHTML = showProducts;
                    dichtbij = "uit " + country;
                    document.getElementById('dichtbij').innerHTML = dichtbij;
                        toggleDataTip = 0;
                    } else {
                    document.getElementById('products-nl').innerHTML = "";
                        toggleDataTip = 1;
                    }
                });

        })

  }
  
  xhr.send();
     
  });
