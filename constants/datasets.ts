export interface DatasetProps {
  title: string;
  price: string;
  categories: string[];
  sold: number;
}

export const dataset_samples: DatasetProps[] = [
  {
    title: "Crypto Market Prices",
    price: "0.05 ETH",
    categories: ["Finance", "Cryptocurrency", "Market Data"],
    sold: 120,
  },
  {
    title: "Global Weather Statistics",
    price: "0.02 ETH",
    categories: ["Weather", "Climate", "Environment"],
    sold: 85,
  },
  {
    title: "Twitter Sentiment Analysis",
    price: "0.03 ETH",
    categories: ["Social Media", "Sentiment", "Text Analysis"],
    sold: 60,
  },
  {
    title: "Blockchain Transactions 2023",
    price: "0.08 ETH",
    categories: ["Blockchain", "Finance", "Transactions"],
    sold: 45,
  },
  {
    title: "Stock Market Historical Data",
    price: "0.06 ETH",
    categories: ["Finance", "Stocks", "Market Data"],
    sold: 110,
  },
  {
    title: "COVID-19 Global Cases",
    price: "0.01 ETH",
    categories: ["Health", "Pandemic", "Statistics"],
    sold: 200,
  },
  {
    title: "E-commerce Sales Data",
    price: "0.04 ETH",
    categories: ["E-commerce", "Sales", "Business"],
    sold: 75,
  },
  {
    title: "Satellite Imagery Dataset",
    price: "0.09 ETH",
    categories: ["Geospatial", "Imagery", "Remote Sensing"],
    sold: 30,
  },
  {
    title: "Movie Ratings and Reviews",
    price: "0.025 ETH",
    categories: ["Entertainment", "Movies", "Reviews"],
    sold: 95,
  },
  {
    title: "Global Population by Country",
    price: "0.015 ETH",
    categories: ["Demographics", "Population", "Statistics"],
    sold: 150,
  },
];
