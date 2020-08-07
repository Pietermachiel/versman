dss_addLoadEvent(function() {
  // make the function return (exit) prematurely if the browser 
  // doesn't support the document object model (DOM)
  if(!document.getElementById) return;
  
  // get a reference to the form element with the ID "form1"
  var f = document.getElementById('form1');
  
  // attach an event handler function to the onsubmit event of the form. 
  // This particular function prevents the form from submitting.
  f.onsubmit = function(){ return false; }
  
  // get a reference to the element that we want to toggle the display of 
  // and then set its display to none (which hides the element). The 
  // interface for accessing the inline style attribute of the element via 
  // JavaScript is used.
  document.getElementById('demo_label').style.display = 'none';
  
  // get a reference to the radio button group
  var rads = f.elements['demo_radio'];
  
  // loop through the radio buttons in the group
  for(var i=0;i<rads.length;i++) {

    // attach an anonymous event handler to the onclick and onkeyup
    // events of the current radio button
    rads[i].onkeyup=rads[i].onclick=function(){
    
      // exit this event handler if the event is triggered on a radio 
      // button that is not selected (checked)    
      if(!this.checked) return;
      
      // get a reference to the element that we want to toggle the display of
      var el = document.getElementById('demo_label');
      
      // show the element if the clicked radio button's value is "yes",
      // otherwise hide it (or keep it hidden)
      el.style.display = (this.value=="yes")?'':'none';
    }
    
    // call the event handler function so that if one of the radio 
    // buttons happens to be selected when the page loads, the script will 
    // be setup correctly. It does happen under certain circumstances that 
    // one of the radio buttons will be selected at load time, so it is 
    // always best to code accordingly
    rads[i].onclick();
  }
});