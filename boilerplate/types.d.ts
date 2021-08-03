//declare all your module that does not handle typing for Typescript

declare module "*.glsl" {
    const value: string;
    export default value;
}