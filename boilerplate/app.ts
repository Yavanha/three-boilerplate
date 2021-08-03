import WebGLApp from './src/webgl';
import ready from 'domready'

import "./style/style.css"


ready(() => {

    const app = new WebGLApp();
    app.config3D()
})
