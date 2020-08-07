export function afgerond(prijs) {
    return Number.parseFloat(prijs).toFixed(2);
}

export function slugify(text) {
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\.+/g, '')
    .replace(/\'+/g, '');
}

export function uppercase(text) {
    return text.toUpperCase();
}

export function lowercase(text) {
    return text.toLowerCase();
}

export function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

export function today() {
  var objToday = new Date(),
  weekday = new Array('zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'),
  dayOfWeek = weekday[objToday.getDay()],
  // domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
  dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
  months = new Array('Januari', 'Februari', 'Maart', 'April', 'mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear(),
  curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
  curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
  curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
  curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var today = 
  // curHour + 
  // ":" + 
  // curMinute + 
  // "." + 
  // curSeconds + 
  // curMeridiem + 
  // " " + 
  dayOfWeek + 
  " " + 
  dayOfMonth + 
  " " + 
  curMonth 
  // " " + 
  // curYear;
  ;
  return today;
}

export function theweek() {
  Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
  }
  
  var today = new Date();
  var weekNumber = today.getWeek();
  
  return weekNumber; // Returns the week number as an integer
}