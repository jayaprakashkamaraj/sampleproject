define(["require", "exports", "./util", "./internationalization"], function (require, exports, util_1, internationalization_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var L10n = (function () {
        function L10n(controlName, localeStrings, locale) {
            this.controlName = controlName;
            this.localeStrings = localeStrings;
            this.setLocale(locale || internationalization_1.defaultCulture);
        }
        L10n.prototype.setLocale = function (locale) {
            var intLocale = this.intGetControlConstant(L10n.locale, locale);
            if (!intLocale) {
                if (locale !== 'en-US') {
                    util_1.throwError('The specified locale or controlname not found in the locale object');
                }
                else {
                    this.currentLocale = this.localeStrings;
                }
            }
            else {
                this.currentLocale = intLocale;
            }
        };
        L10n.load = function (localeObject) {
            this.locale = util_1.extend(this.locale, localeObject, {}, true);
        };
        L10n.prototype.getConstant = function (prop) {
            return this.currentLocale[prop] || this.localeStrings[prop] || '';
        };
        L10n.prototype.intGetControlConstant = function (curObject, locale) {
            if (curObject[locale]) {
                return curObject[locale][this.controlName];
            }
            return null;
        };
        return L10n;
    }());
    L10n.locale = {};
    exports.L10n = L10n;
});
