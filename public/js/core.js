import React from 'react';
import { render } from 'react-dom';
import Init from './components/Init';
import ScoreList from './components/ScoreList';
import Index from './components/Index';



window.onload = () => {

    render(<Index/>, document.getElementById('react-app'));

    //render(<Init/>
      //  ,document.getElementById('react-app'));


    //render(<ScoreList/>
        //,document.getElementById('score-list-component'));
};



