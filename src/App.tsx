import React from 'react'
import { AppContextProvider } from './assets/hooks/useAppContext'
import AppWithContext from './assets/components/AppWithContext'
import './App.css'

const App: React.FC = () => {
	return (
		<AppContextProvider>
			<AppWithContext />
		</AppContextProvider>
	)
}

export default App
