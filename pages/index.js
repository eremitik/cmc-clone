import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const {data} = props.result;

  const formatPercent = num => 
    `${new Number(num).toFixed(2)}%`

  const formatDollar = (num, maxSignificantDigits) =>
    new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'usd',
        maxSignificantDigits
      })
      .format(num);

  return (
    <div>
      <h1>CMC-Clone</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{formatPercent(coin.price_change_percentage_24h)}</td>
              <td>{formatDollar(coin.current_price, 20)}</td>
              <td>{formatDollar(coin.market_cap, 12)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}

export async function getServerSideProps(context) {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await coinGeckoClient.coins.markets({params});
  return {
    props: {
      result
    }
  };
}
