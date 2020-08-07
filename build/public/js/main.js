console.log("javascript works!");

// show products

$( document ).ready(function() {
  console.log( "ready!" );
  
  var url  = "public/js/locations.json";
  var xhr  = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.onload = function() {

    var features = JSON.parse(xhr.responseText);
  console.log(features);

  features.forEach(function(product) {
    
    var acountry = product.country;
    function slugify(text) {
      return text.toString().toLowerCase()
    }
    var thecountry = slugify(acountry);				

    var productList = product.products.sort();
    var xproducts = '<div class="products-box">';
      productList.forEach(function(product){
        var theproduct = slugify(product);				
        xproducts += '<li class="list-item"><a href="/producten/' + theproduct + '" class="color_' + thecountry + '">' + product +'</a></li>';
      })
      xproducts += '</div>';

    // console.log(xproducts);

    var toggleDataTip = 1;
    $("#id_" + thecountry).click(function(event) {
      event.preventDefault(); 
        if ( toggleDataTip == 1 ) {
          document.getElementById('products-nl').innerHTML = xproducts;
          dichtbij = "uit " + acountry;
          document.getElementById('dichtbij').innerHTML = dichtbij;
            toggleDataTip = 0;
        } else {
        document.getElementById('products-nl').innerHTML = "";
            toggleDataTip = 1;
        }
    });
            
    // console.log(thecountry);
  })
  
}

xhr.send();


  // var toggleDataTip = 1;
  // $("#id_nederland").click(function(event) {
  //   event.preventDefault(); 
  //     if ( toggleDataTip == 1 ) {
  //       $("#toggleBio").css("color", "red");
  //       // alert("toggleBio");
  //         toggleDataTip = 0;
  //     } else {
  //     $("#toggleBio").css("color", "blue");
  //     toggleDataTip = 1;
  //     }
  // });
    
});



// // Toggle data-tip

// var toggleDataTip = 1;
// // var tipOutput = "Hello";
// $(".data-tip").on("click", function(event) {
//   event.preventDefault(); 
//     var tipTip = $(this).attr("data-tip");
//     var tipId = "#" + tipTip;
//     console.log(tipId);
//     if ( toggleDataTip == 1 ) {
//       $( tipId ).addClass("show-border");
//       // .html(tipOutput);
//         toggleDataTip = 0;
//     } else {
//       $( tipId ).removeClass("show-border");
//         toggleDataTip = 1;
//     }
// });




// oud

// $( document ).ready(function() {
  
//   var header = document.querySelector('#products-nl');

//   var url  = "public/js/locations.json";
//   var xhr  = new XMLHttpRequest()
//   xhr.open('GET', url)
//   xhr.responseType = 'json';
//   xhr.send();

//   xhr.onload = function() {
//     var theproducts = xhr.response;
//     populateHeader(theproducts);
//   }

//   function populateHeader(jsonObj) {
//     var products = jsonObj["products"];
//     products.forEach(product => {
//         var myList = document.createElement("li");
//         myList.textContent = product;
//         header.appendChild(myList);
//     })
//   }  

//   console.log( "ready!" );

//   var toggleDataTip = 1;
//   $("#id_nederland").click(function(event) {
//     event.preventDefault(); 
//       if ( toggleDataTip == 1 ) {
//         $("#toggleBio").css("color", "red");
//         // alert("toggleBio");
//           toggleDataTip = 0;
//       } else {
//       $("#toggleBio").css("color", "blue");
//       toggleDataTip = 1;
//       }
//   });
    
// });
