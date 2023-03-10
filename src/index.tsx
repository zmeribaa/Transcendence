import React from 'react';
import PongGame from './App';
import ReactDOM from 'react-dom/client';
import './App.css';

// const root = ReactDOM.createRoot(
// 	document.getElementById('pong') as HTMLElement
//   );
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<div>
		<div>
			<h1>React Pong</h1>
			{/* MAKE THE REST OF TEH HEADER PART OR SOME SHITß */}
		</div>
		<div>
			<PongGame />
		</div>
	</div>
  ); 	 	
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
