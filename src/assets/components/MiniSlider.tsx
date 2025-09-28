import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import './MiniSlider.css';

type MiniSliderParams = {
	slideIndex: number;
	keyPoints: string[];
}

const HtmlBlock: React.FC<{ str: string }> = ({ str }: { str: string }) => {
	if (typeof str === 'string') {
		return (
			<div dangerouslySetInnerHTML={{ __html: str }} />
		);
	}
}

const MiniSlider: React.FC<MiniSliderParams> = ({ keyPoints, slideIndex }) => {
	const { state } = useAppContext();
	const miniSliderRef = useRef<HTMLDivElement>(null);
	const interval = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (state.data?.slideIndex === slideIndex) {
			const miniSliderElement = miniSliderRef.current;

			if (!miniSliderElement) {
				return;
			}

			if (interval.current) {
				miniSliderElement.classList.remove('on-0', 'on-1', 'on-2', 'on-3', 'on-4');
				miniSliderElement.classList.add('on-0');
				clearInterval(interval.current);
			}

			const slidesNumber = miniSliderElement?.querySelectorAll('.mini-slider__item').length;
			let currentSlideIndex = 0;

			const startInterval = () => {
				interval.current = setInterval(() => {
					miniSliderElement.classList.remove(`on-${currentSlideIndex}`);
					miniSliderElement.classList.add(`on-${Number(currentSlideIndex + 1) % slidesNumber}`);
					currentSlideIndex = Number(currentSlideIndex + 1) % slidesNumber;
				}, 10000);
			};

			startInterval();

			const bullets = miniSliderElement.querySelectorAll('.mini-slider__btn');
			bullets.forEach((bullet) => {
				bullet.addEventListener('click', (e) => {
					if (interval.current) {
						clearInterval(interval.current);
					}

					const element = e.target as HTMLElement;
					if (!element.getAttribute('data-index')) {
						console.warn('index was not found');
						return;
					}

					miniSliderElement.classList.remove('on-0', 'on-1', 'on-2', 'on-3', 'on-4');
					miniSliderElement.classList.add(`on-${Number(element.getAttribute('data-index'))}`);

					currentSlideIndex = Number((e.target as HTMLElement)?.getAttribute('data-index'));
				});
			});
		}
	}, [state, slideIndex]);

	return (
		<div
			className='mini-slider slide-in-on-show on-0'
			ref={miniSliderRef}
			>
			<div className='mini-slider__controller'>
				{keyPoints.map((keyPoint: string, index: number) => (
					<div key={keyPoint.slice(0, 10) + index} data-index={index} className='mini-slider__btn'></div>
				))}
			</div>
			<div className='mini-slider__content'>
				{keyPoints.map((keyPoint: string, index: number) => (
					<div key={index} data-index={index} className='mini-slider__item'>
						<HtmlBlock str={keyPoint} />
					</div>
				))}
			</div>
		</div>
	);
};

export default MiniSlider;
