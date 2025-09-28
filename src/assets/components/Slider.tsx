import React from 'react';
import { useAppContext, APP_STATE } from '../hooks/useAppContext';
import SliderNavigation from './SliderNavigation';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import './Slider.css';

const Slider: React.FC = () => {
	const { state } = useAppContext();

	return (
		<div className={`slider${((state.value === APP_STATE.ON_SLIDE) || (state.value === APP_STATE.ON_TRANSITION)) ? ' on-scale-in' : ''}`}>
			<Slide1 isActive={ state.data?.slideIndex === 1 } />
			<Slide2 isActive={ state.data?.slideIndex === 2 } />
			<SliderNavigation />
		</div>
	);
};

export default Slider;
