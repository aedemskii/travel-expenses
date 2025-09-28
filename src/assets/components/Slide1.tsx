
import React, { useEffect, useRef } from 'react'
import type { SlideProps } from '../../assets/utils/types'
import MiniSlider from './MiniSlider';

const Slide1: React.FC<SlideProps> = ({ isActive }) => {
	const slideRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const isShown = useRef(false);

	useEffect(() => {
		const slideElement = slideRef.current;
		const videoElement = videoRef.current;
		if (!videoElement || !slideElement) {
			return;
		}
		if (isActive && !isShown.current) {
			setTimeout(() => {
				isShown.current = true;
				slideElement.classList.add('on-show');
				// Rewind and play the video when the slide becomes active
				videoElement.playbackRate = 0.7;
				videoElement.currentTime = 0;
				const playPromise = videoElement.play();
				if (playPromise !== undefined) {
					playPromise.catch(error => {
						// Ignore the AbortError which is thrown when a play() request
						// is interrupted by a pause() call. This is expected in a slider.
						if (error.name !== 'AbortError') {
							console.error('Video play failed:', error);
						}
					});
				}
			}, 200)
		}

		return () => {
			if (videoElement) {
				videoElement.pause();
			}
		}
	}, [isActive]);

	return (
		<div
			ref={slideRef}
			className={`slide slide--1${isShown.current ? ' on-show' : ''}${isActive ? ' is-active' : ''}`}
			data-slide='1'
			>
			<div className='slide__background'>
				<video
					ref={videoRef}
					muted
					playsInline
					className='slide__video'
				>
					<source src={`${import.meta.env.BASE_URL}/videos/slide1.mp4`} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</div>

			<div className='slide__content'>
				<div className='slide__title slide-in-on-show'>
					Cloud-Szenario
				</div>
				<div className='slide__subtitle slide-in-on-show'>
					Cloud (EU)&nbsp;— Schnellster Weg in&nbsp;den produktiven Betrieb
				</div>
				<div className='slide__text slide-in-on-show'>
					Nach dem Upload der PDFs durch Mitarbeitende werden Inhalte (Text + Layout) geparst
					und deterministische Prüfungen für Beträge, USt., Daten und&nbsp;FX mit EZB-Kursen
					ausgeführt. Saubere Fälle werden mit vollständigen Begründungen automatisch genehmigt;
					Grenzfälle landen in&nbsp;einer Prüfwarteschlange mit One-Click-Korrekturen. Ein
					richtlinienbewusster Assistent (RAG) führt durch den Prozess, zitiert das Regelwerk und
					reduziert Rückfragen. Der gesamte Betrieb erfolgt in&nbsp;EU-Azure mit Private Link, Key Vault
					und Entra ID&nbsp;SSO.
				</div>
			</div>

			<MiniSlider
				slideIndex={1}
				keyPoints={[
					'<strong>Erklärbare Auto-Genehmigung</strong>&nbsp;— Jeder PASS enthält maschinenlesbare Gründe und einen Policy-Versionsstempel.',
					'<strong>Rollout ohne Reibung</strong>&nbsp;— Entra ID SSO; kein VPN; EU-only-Dienste mit Private Endpoints.',
					'<strong>Policy-Coach, kein Richter</strong>&nbsp;— Der Assistent antwortet und zitiert Richtlinien; Genehmigungen trifft er nie.'
				]}
			/>
		</div>
	)
}

export default Slide1
