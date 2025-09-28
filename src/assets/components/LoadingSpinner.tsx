
import React, { useEffect, useRef } from 'react'
import { useAppContext } from '../hooks/useAppContext'
import './LoadingSpinner.css'

const LoadingSpinner: React.FC = () => {
	const { dispatch } = useAppContext();
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const showText = () => {
			textRef.current?.classList.add('is-visible');
		};

		setTimeout(() => {
			showText();
		}, 5000);

		// window.addEventListener('load', showText);

		// return () => {
		// 	window.removeEventListener('load', showText);
		// };
	}, [dispatch])

	return (
		<div className='loading-spinner'>
			<div ref={textRef} className='loading-spinner__text'>Drücken Sie die Eingabetaste, um fortzufahren</div>
		</div>
	)
}

export default LoadingSpinner
