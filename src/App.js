import styles from './App.module.css';
import { useState } from 'react';
import NewsItem from './components/NewsItem';

function App() {

	// eec87152dcec4642a92b9404cfdc87b9
	// https://newsapi.org/v2/everything?q=bitcoin&apiKey=API_KEY
	const [searchKey, setSearchKey] = useState('');
	const [timeoutId, setTimeoutId] = useState(null);
	const [newsArticles, setNewsArticles] = useState([]);
	console.log('>>>>>>>>>styles', styles);

	const getNews = (qKey) => {
		if (!qKey) {
			setNewsArticles([])
			return;
		}
		fetch(`https://newsapi.org/v2/everything?apiKey=eec87152dcec4642a92b9404cfdc87b9&q=${qKey}`)
			.then(res => res.json())
			.then((res) => {
				console.log('>>>>>>>>>>>res', res);
				setNewsArticles(res.articles)
			})
	}

	const handleSearchChange = (e) => {
		let qKey = e?.target?.value
		setSearchKey(qKey);
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		let _timeoutId = setTimeout(() => {
			getNews(qKey);
			setTimeoutId(null);
		}, 350);
		setTimeoutId(_timeoutId);
	}

	return (
		<div className={styles.App}>
			<div className={styles.header}>
				<input type="text" onChange={handleSearchChange} value={searchKey} />
			</div>
			<div className={styles.content}>
				{
					searchKey.length > 0 ?
						newsArticles.map((article) => {
							return <NewsItem article={article} key={article.url} />
						}) : <div>Enter a search key</div>
				}
			</div>
		</div>
	);
}

export default App;
