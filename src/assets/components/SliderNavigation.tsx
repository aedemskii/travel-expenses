
import React from 'react';
import { useAppContext, APP_REDUCER_ACTION } from '../hooks/useAppContext';
import './SliderNavigation.css';

const SliderNavigation: React.FC = () => {
	const { state, dispatch } = useAppContext();

	const goToPrev = () => {
		const slideIndex = state.data?.slideIndex ? state.data.slideIndex : 1;
		const newSlideIndex = Math.min(Math.max(slideIndex - 1, 1), 2);

		if (slideIndex === newSlideIndex) {
			return;
		}

		dispatch({ type: APP_REDUCER_ACTION.GO_TO_TRANSITION });

		setTimeout(() => {
			dispatch({
				type: APP_REDUCER_ACTION.GO_TO_SLIDE,
				payload: {
					slideIndex: newSlideIndex
				},
			})
		}, 1000);
	}

	const goToNext = () => {
		const slideIndex = state.data?.slideIndex ? state.data.slideIndex : 1;
		const newSlideIndex = Math.min(Math.max(slideIndex + 1, 1), 2);

		if (slideIndex === newSlideIndex) {
			return;
		}

		dispatch({ type: APP_REDUCER_ACTION.GO_TO_TRANSITION });

		setTimeout(() => {
			dispatch({
				type: APP_REDUCER_ACTION.GO_TO_SLIDE,
				payload: {
					slideIndex: newSlideIndex
				},
			})
		}, 1000);
	}

	const goToSlide = (index: number) => {
		const slideIndex = state.data?.slideIndex ? state.data.slideIndex : 1;
		const newSlideIndex = Math.min(Math.max(index, 1), 2);

		if (slideIndex === newSlideIndex) {
			return;
		}

		dispatch({ type: APP_REDUCER_ACTION.GO_TO_TRANSITION });

		setTimeout(() => {
			dispatch({
				type: APP_REDUCER_ACTION.GO_TO_SLIDE,
				payload: {
					slideIndex: newSlideIndex
				},
			})
		}, 1000);;
	}

	const handleSlideBtnClick = (event: React.MouseEvent<HTMLLIElement>) => {
		const slideBtn = event.currentTarget as HTMLLIElement;
		slideBtn.classList.add('current');
		const index = Number(event.currentTarget.dataset.index);
		goToSlide(index);
	};

	return (
		<div className='slider__navigation'>
			<div
				onClick={goToPrev}
				className={`slider__nav-button slider__nav-button--up${state.data?.slideIndex === 1 ? ' disabled' : ''}`}
			></div>

			<ol className='slider__slide-btns-list'>
				<li
					className={`slider__slide-btn${state.data?.slideIndex === 1 ? ' current' : ''}`}
					data-index='1'
					onClick={handleSlideBtnClick}
					>
					Cloud-Szenario
				</li>
				<li
					className={`slider__slide-btn${state.data?.slideIndex === 2 ? ' current' : ''}`}
					data-index='2'
					onClick={handleSlideBtnClick}
				>
					Edge-Szenario
				</li>
			</ol>

			<div
				onClick={goToNext}
				className={`slider__nav-button slider__nav-button--up${state.data?.slideIndex === 2 ? ' disabled' : ''}`}
			></div>
		</div>
	)
}

export default SliderNavigation
