define(["require", "exports", "./template"], function (require, exports, template_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function compile(templateString, helper) {
        return engineObj.compile(templateString, helper);
    }
    exports.compile = compile;
    function setTemplateEngine(classObj) {
        engineObj.compile = classObj.compile;
    }
    exports.setTemplateEngine = setTemplateEngine;
    var Engine = (function () {
        function Engine() {
        }
        Engine.prototype.compile = function (templateString, helper) {
            return template_1.compile(templateString, helper);
        };
        return Engine;
    }());
    var engineObj = { compile: new Engine().compile };
});
