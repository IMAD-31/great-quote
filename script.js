const quotegen = document.getElementById('quote-gen')
const quoText= document.getElementById("quote")
const authorText= document.getElementById("author")
const twittebtnr= document.getElementById("twitter")
const newquotebtn= document.getElementById("new-quote")
const loder= document.getElementById('loader')
let apiQuotes=[]
function loading(){
loder.hidden=false;
quotegen.hidden=true;

}
function complete(){
if (!loder.hidden) {
    loder.hidden=true;
    quotegen.hidden=false;
    
} 


}
// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from array
    const quote = apiQuotes;
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.quoteAuthor) {
      authorText.textContent = 'Unknown';
    } else {
      authorText.textContent = quote.quoteAuthor;
    }
    // Check Quote length to determine styling
    if (quote.quoteText.length > 120) {
      quoText.classList.add('long-quote');
    } else {
      quoText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoText.textContent = quote.quoteText;
    complete();
  }
async function getQuote(){
    loading();
    const proxyUrl= 'https://whispering-tor-04671.herokuapp.com/'
const ApiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
try{
   
    const response= await fetch(proxyUrl + ApiUrl);
    apiQuotes= await response.json();
  newQuote()
    
}catch(error){
    console.log('opps',error)
    newQuote()
}
}
getQuote();

function getTweet(){

    const quote =quoText.innerText;
    const author= authorText.innerText;
    const tweet =`https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(tweet,'_blank')
}
newquotebtn.addEventListener('click',getQuote)
twittebtnr.addEventListener('click',getTweet)