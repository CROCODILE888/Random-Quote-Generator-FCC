export interface Quote {
    author: string;
    quote: string;
}

export interface QuoteBoxProps {
    quote: Quote;
    handleQuote: ()=>void;
    handleFunnyQuote: ()=> void;
    isFunny: boolean;
    color: string;
}