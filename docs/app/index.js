import React, { Component } from 'react';
import { render } from 'react-dom';
import Demos from './Demos';
import 'src/styles';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import './index.scss';

render(<Demos />, document.getElementById('root'));
