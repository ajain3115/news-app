import styles from './NewsItem.module.css';
import { useState } from 'react';

function NewsItem({
    article = {}
}) {

    const [isOpen, setIsOpen ] = useState(false);

	const handleContainerClick = ()=>{
		setIsOpen(!isOpen)
	}

	return (
		<div className={styles.container} onClick={handleContainerClick}>
            <div className={styles.lhs}>
                {article?.source?.name}
            </div>
            <div className={styles.rhs}>
                <p className={styles.title}>{article.title} <span>{article.author}</span></p>
                <p className={styles.description}>{article.description}</p>
                <p className={styles.date}> {article.publishedAt} </p>
            </div>
            {
                isOpen? <img/>:null
            }
		</div>
	);
}

export default NewsItem;
