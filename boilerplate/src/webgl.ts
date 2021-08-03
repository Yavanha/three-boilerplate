import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';
import { Screen } from './model/screen.model';
import { Sphere } from './shapes/sphere.shape';
import { ApiService } from './services/api.service';
import { Todo } from './model/todo.model';
import { Data } from './helper/data.helper';




export default class WebGLApp {
    private _scene: THREE.Scene;
    private _screen: Screen;
    private _clock: THREE.Clock;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGL1Renderer;
    private _controls: OrbitControls;
    private _elapsedTime: number;
    static RADIUS: number = 40;
    private _sphere: Sphere | undefined;

    constructor() {
        const canvas = document.querySelector('.webgl') as HTMLCanvasElement | undefined;
        this._screen = new Screen(window.innerWidth, window.innerHeight);
        this._scene = new THREE.Scene();
        this._clock = new THREE.Clock();
        this._camera = new THREE.PerspectiveCamera(75, this._screen.aspectRatio, 0.1, 2000);
        this._renderer = new THREE.WebGL1Renderer({ canvas: canvas, antialias: true });
        this._controls = new OrbitControls(this._camera, canvas)
        this._elapsedTime = 0;


    }

    public config3D(): void {
        this.configCamera()
        this.configRenderer()
        this.configControls()
        this.configEventListeners();

        this.configCube()

        //only for example 
        this.fetchDataApi()
        //end example
        this.animate()
    }

    private configCube(): void {
        this._sphere = new Sphere({
            radius: 2,
            segmentW: 50,
            segmentH: 50,
        }, "Sphere")
        this._scene.add(this._sphere);
    }




    private configCamera(): void {
        this._camera.position.set(0, 0, 5);
    }

    private configRenderer(): void {
        this._renderer.setSize(this._screen.width, this._screen.height);
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    private configEventListeners(): void {
        window.addEventListener('resize', this.resizeWindow.bind(this));
    }

    private configControls(): void {
        this._controls.enableDamping = true;
        this._controls.enablePan = false
        this._controls.rotateSpeed = 0.5;
        this._controls.dampingFactor = 0.02
    }

    //this is not the right place to do it (just an example of using the Api)
    private async fetchDataApi() {
        const todos: Data<Todo> = new Data<Todo>(Todo);
        try {
            const response = await ApiService.getAll('https://jsonplaceholder.typicode.com/todos');
            todos.datas = response.data as Array<Todo>;
            console.log(todos)
        } catch (err) {
            //do something
            console.log(err)
        }
    }

    animate(): void {
        window.requestAnimationFrame(this.animate.bind(this))
        this._elapsedTime = this._clock.getElapsedTime();
        this._controls.update();
        this._renderer.render(this._scene, this._camera);
        this._sphere?.update(this._elapsedTime);
    }


    private resizeWindow(): void {
        this._screen.resize(window.innerWidth, window.innerHeight);
        this._camera.aspect = this._screen.aspectRatio;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(this._screen.width, this._screen.height);
        this._renderer.setPixelRatio(this._screen.pixelRatio);
    }


}



