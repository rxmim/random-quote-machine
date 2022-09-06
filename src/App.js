import React, {useState, useEffect} from 'react';
import './App.scss';
import colorArray from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter} from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faTwitter)


let quotesDbUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json' 

function App() {
  const [Quote, setQuote] = useState("Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless")
  const [Author, setAuthor] = useState("- Jamie Paolinetti")
  const [quotesArray, setQuotesArray] = useState(null)
  const [quoteColor, setQuoteColor] = useState('#282c34')


  const fetchQuotes = async (quotesDbUrl) => {
    const response = await fetch(quotesDbUrl)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)  
    } 
  useEffect(() => {
    
   fetchQuotes(quotesDbUrl)

  }, [])

  const getRandomQuote = () => {
    
    let randomInteger = Math.floor(quotesArray.length*Math.random())
    setQuoteColor(colorArray[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
      setAuthor(quotesArray[randomInteger].author)
   
  }
 
  

  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: quoteColor}}>
       
       <div id="quote-box" style={{color:quoteColor}}>

      
        <p id="text">
          {Quote}
        </p>
        <p id="author">{Author}</p>
        <div  className='button'>
        <a  id="tweet-quote" style={{backgroundColor: quoteColor}} href={encodeURI('https://www.twitter.com/intent/tweet?text= ${Quote} -${Author}')}><FontAwesomeIcon icon={faTwitter}/></a>
        <button id="new-quote" style={{backgroundColor: quoteColor}} onClick={() =>getRandomQuote()}>generate a random quote</button>
        </div>
        
        
       </div>
       
      </header>
    </div>
  );
}

export default App;
