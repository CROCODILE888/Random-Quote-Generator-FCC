import { QuoteBoxProps } from "./types";

// The actual div where the quotes are displayed
const QuoteBox: React.FC<QuoteBoxProps> = ({ quote, handleQuote, handleFunnyQuote, isFunny, color }) => {
    return (
        <div id="quote-box">
            <h1>{isFunny ? 'Funny Quote: ' : 'Motivational Quote: '}</h1>
            <p id="text">{quote.quote}</p>
            <h2 id="author">{`~ ${quote.author}`}</h2>
            <div className="actions">

                <button
                    id="new-quote"
                    className="button"
                    style={{ backgroundColor: color, borderColor: color }}
                    onClick={handleQuote}>New quote</button>

                <button
                    id="new-funny-quote"
                    className="button"
                    style={{ backgroundColor: color, borderColor: color }}
                    onClick={handleFunnyQuote}>New funny quote</button>

                <a
                    id="tweet-quote"
                    href="https://www.linkedin.com/in/taha-lokhandwala-866794188/"
                    style={{ backgroundColor: color, borderColor: color }}
                    target="_blank">My LinkedIn</a>
            </div>
        </div>
    )
}

export default QuoteBox;