import { compile as render } from './template';
export function compile(templateString, helper) {
    return engineObj.compile(templateString, helper);
}
export function setTemplateEngine(classObj) {
    engineObj.compile = classObj.compile;
}
var Engine = (function () {
    function Engine() {
    }
    Engine.prototype.compile = function (templateString, helper) {
        return render(templateString, helper);
    };
    return Engine;
}());
var engineObj = { compile: new Engine().compile };
