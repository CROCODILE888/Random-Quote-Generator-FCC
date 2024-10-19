import { useEffect, useState } from 'react';
import './App.css'
import { Quote } from './types';
import QuoteBox from './QuoteBox';

//Using hard coded quotes because I couldn't find funny quotes free API
const funnyQuotes = [
  {
    "author": "Abraham Lincoln",
    "quote": "No man has a good enough memory to be a successful liar."
  },
  {
    "author": "Albert Einstein",
    "quote": "When you are courting a nice girl an hour seems like a second. When you sit on a red-hot cinder a second seems like an hour. That's relativity."
  },
  {
    "author": "Alexander Woollcott",
    "quote": "Everything I like is either illegal, immoral or fattening."
  },
  {
    "author": "Alfred Hitchcock",
    "quote": "Television has brought back murder into the home - where it belongs."
  },
  {
    "author": "Alice Roosevelt Longworth",
    "quote": "If you haven't got anything nice to say about anybody, come sit next to me."
  },
  {
    "author": "Anthony Burgess",
    "quote": "Laugh and the world laughs with you, snore and you sleep alone."
  },
  {
    "author": "Arthur C. Clarke",
    "quote": "The best measure of a man's honesty isn't his income tax return. It's the zero adjust on his bathroom scale."
  },
  {
    "author": "Benjamin Franklin",
    "quote": "Wine is constant proof that God loves us and loves to see us happy."
  },
  {
    "author": "Bill Copeland",
    "quote": "After all is said and done, sit down."
  },
  {
    "author": "Bill Moyers",
    "quote": "I own and operate a ferocious ego."
  },
  {
    "author": "Bill Vaughan",
    "quote": "The tax collector must love poor people, he's creating so many of them."
  },
  {
    "author": "Bill Watterson",
    "quote": "Reality continues to ruin my life."
  },
  {
    "author": "Billy Connolly",
    "quote": "My definition of an intellectual is someone who can listen to the William Tell Overture without thinking of the Lone Ranger."
  },
  {
    "author": "Buddy Hackett",
    "quote": "As a child my family's menu consisted of two choices: take it or leave it."
  },
  {
    "author": "Casey Stengel",
    "quote": "All right everyone, line up alphabetically according to your height."
  },
  {
    "author": "Clint Eastwood",
    "quote": "They say marriages are made in Heaven. But so is thunder and lightning."
  },
  {
    "author": "Dave Barry",
    "quote": "The four building blocks of the universe are fire, water, gravel and vinyl."
  },
  {
    "author": "Don Marquis",
    "quote": "Procrastination is the art of keeping up with yesterday."
  },
  {
    "author": "Don Marquis",
    "quote": "An idea isn't responsible for the people who believe in it."
  }
];

// Colors array so we can change background color on every click
const colors = [
  "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6",
  "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
  "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A",
  "#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC",
  "#66994D", "#B366CC", "#4D8000", "#B33300", "#CC80CC",
  "#66664D", "#991AFF", "#E666FF", "#4DB3FF", "#1AB399",
  "#E666B3", "#33991A", "#CC9999", "#B3B31A", "#00E680",
  "#4D8066", "#809980", "#E6FF80", "#1AFF33", "#999933",
  "#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#9900B3",
  "#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF"
];

// Function that helps us pick a random number between the range of 0 and given maximum number
const randomIndexGenerator = (max: number) => Math.floor(Math.random() * max);

const App = () => {
  // States
  const [quotes, setQuotes] = useState<Quote[]>([]);//State to store motivational quotes from API response
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [isFunny, setIsFunny] = useState<boolean>(false);//Initially display motivational quote
  const [color, setColor] = useState<string>(colors[randomIndexGenerator(colors.length)]);//Initial random color
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to fetch quotes (motivational), from a free API
  const fetchQuotes = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('https://dummyjson.com/quotes?limit=0'); // Fetch all quotes
      const data = await response.json();
      console.log(data);
      setQuotes(data.quotes);
      setQuote(data.quotes[randomIndexGenerator(data.quotes.length)]); // Set an initial random quote
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError(true);
      setLoading(false);
    }
  };

  // Function to select a random quote from the 'quote' state that was populated from API
  const handleQuote = () => {
    setQuote(quotes[randomIndexGenerator(quotes.length)]);
    setIsFunny(false);
    setColor(colors[randomIndexGenerator(colors.length)]);
  }

  // Function to select a random funny quote from hard coded funnyQuotes array
  const handleFunnyQuote = () => {
    setQuote(funnyQuotes[randomIndexGenerator(funnyQuotes.length)]);
    setIsFunny(true);
    setColor(colors[randomIndexGenerator(colors.length)]);
  }

  // Fetch all quotes on the initial render
  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) {
    return <div className="main" style={{ backgroundColor: 'black', color: 'white' }}>Loading...</div>;
  }

  if (error) {
    return <div className="main" style={{ backgroundColor: 'black', color: 'white' }}>Error loading quotes. Please try again.</div>;
  }

  return (
    <div style={{ backgroundColor: color }}>
      <h1 id='header'><q>Taha's Random quote generator</q></h1>
      <div className="main" >
        <QuoteBox
          handleQuote={handleQuote}
          quote={quote}
          handleFunnyQuote={handleFunnyQuote}
          isFunny={isFunny}
          color={color}
        />
      </div>
    </div>
  )
}

export default App
