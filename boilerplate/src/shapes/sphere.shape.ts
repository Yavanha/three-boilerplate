import * as THREE from "three"
import gsap from 'gsap'

//shaders
import  _VX from '../shaders/cube/vertex.glsl'
import  _FG from '../shaders/cube/fragment.glsl'


//add your parameters here you can also add specific material parameters
// you don't have to follow this way of doing (parameters)
type Parameters = {
    radius: number,
    segmentW : number,
    segmentH : number,
}

export class Sphere extends  THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial> {

    private _parmeters : Parameters;

    constructor(params: Parameters, name: string) {
        super()
        this._parmeters = params as Parameters;
        this.name = name;
        this.configGeometry()
        this.configMaterial()
    }


    private configGeometry() : void {
        this.geometry = new THREE.SphereGeometry(this._parmeters.radius, this._parmeters.segmentW, this._parmeters.segmentH);
    }

    private configMaterial() : void {
        this.material = new THREE.ShaderMaterial({
            vertexShader: _VX,
            fragmentShader : _FG,
            // wireframe : true,
            uniforms : {
                uRadius : {value: this._parmeters.radius},
                uTime : {value : 0.0}
            }
        })
    }


    public update(time : number) : void {
        this.material.uniforms.uTime.value = time;
    }





    

}