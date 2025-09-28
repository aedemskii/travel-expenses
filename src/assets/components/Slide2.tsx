
import React, { useEffect, useRef } from 'react'
import type { SlideProps } from '../../assets/utils/types'
import MiniSlider from './MiniSlider';

const Slide1: React.FC<SlideProps> = ({ isActive }) => {
	const slideRef = useRef<HTMLDivElement>(null);
	const isShown = useRef(false);

	useEffect(() => {
		const slideElement = slideRef.current;
		if (!slideElement) {
			return;
		}
		if (isActive && !isShown.current) {
			isShown.current = true;
			slideElement.classList.add('on-show');
		}
	}, [isActive]);

	return (
		<div
			ref={slideRef}
			className={`slide slide--2${isShown.current ? ' on-show' : ''}${isActive ? ' is-active' : ''}`}
			data-slide='2'
			>
			<div className='slide__background'>
				<img src={`${import.meta.env.BASE_URL}/images/slide2-bg.png`} alt='' />
			</div>

			<div className='slide__content'>
				<div className='slide__title slide-in-on-show'>
					Edge-Szenario
				</div>
				<div className='slide__subtitle slide-in-on-show'>
					Edge (On-Prem)&nbsp;— Gleiche&nbsp;UX, strikte Datenbarrieren
				</div>
				<div className='slide__text slide-in-on-show'>
					Parsing, Regeln und Assistent laufen innerhalb des Gerresheimer-Netzwerks: Postgres +
					MinIO + OCR + lokales RAG. Keine Dokumente oder Prompts verlassen die
					Netzwerkgrenze; EZB-Kurse werden kontrolliert synchronisiert. Oberfläche und Ergebnisse
					entsprechen der Cloud-Version, daher ist das Training identisch. Bei Bedarf läuft der
					Assistent auf einem kleinen lokalen Modell&nbsp;— zitiert weiterhin Richtlinien und genehmigt
					weiterhin nicht.
				</div>
			</div>

			<MiniSlider
				slideIndex={2}
				keyPoints={[
					'<strong>Daten bleiben intern</strong>&nbsp;— Dateien, Prompts und Logs verbleiben in der Gerresheimer-Infrastruktur.',
					'<strong>Offline-tolerant</strong>&nbsp;— Funktioniert ohne externe LLM/OCR-Aufrufe; EZB-Kurs-Cache aktualisiert sich nach Ihrem Takt.',
					'<strong>Operative Parität</strong>&nbsp;— Gleiche Regeln, gleiche UX, gleiche Audit-Belege wie in der Cloud – nur andere Technik darunter.'
				]}
			/>
		</div>
	)
}

export default Slide1
