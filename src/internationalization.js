define(["require", "exports", "./Internationalization/date-formatter", "./Internationalization/number-formatter", "./Internationalization/date-parser", "./Internationalization/number-parser", "./Internationalization/intl-base", "./util", "./observer"], function (require, exports, date_formatter_1, number_formatter_1, date_parser_1, number_parser_1, intl_base_1, util_1, observer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onIntlChange = new observer_1.Observer();
    exports.rightToLeft = false;
    exports.cldrData = {};
    exports.defaultCulture = 'en-US';
    exports.defaultCurrencyCode = 'USD';
    var mapper = ['numericObject', 'dateObject'];
    var Internationalization = (function () {
        function Internationalization(cultureName) {
            if (cultureName) {
                this.culture = cultureName;
            }
        }
        Internationalization.prototype.getDateFormat = function (options) {
            return date_formatter_1.DateFormat.dateFormat(this.getCulture(), options || { type: 'date', skeleton: 'short' }, exports.cldrData);
        };
        Internationalization.prototype.getNumberFormat = function (options) {
            if (options && !options.currency) {
                options.currency = exports.defaultCurrencyCode;
            }
            return number_formatter_1.NumberFormat.numberFormatter(this.getCulture(), options || {}, exports.cldrData);
        };
        Internationalization.prototype.getDateParser = function (options) {
            return date_parser_1.DateParser.dateParser(this.getCulture(), options || { skeleton: 'short', type: 'date' }, exports.cldrData);
        };
        Internationalization.prototype.getNumberParser = function (options) {
            return number_parser_1.NumberParser.numberParser(this.getCulture(), options || { format: 'N' }, exports.cldrData);
        };
        Internationalization.prototype.formatNumber = function (value, option) {
            return this.getNumberFormat(option)(value);
        };
        Internationalization.prototype.formatDate = function (value, option) {
            return this.getDateFormat(option)(value);
        };
        Internationalization.prototype.parseDate = function (value, option) {
            return this.getDateParser(option)(value);
        };
        Internationalization.prototype.parseNumber = function (value, option) {
            return this.getNumberParser(option)(value);
        };
        Internationalization.prototype.getCulture = function () {
            return this.culture || exports.defaultCulture;
        };
        return Internationalization;
    }());
    exports.Internationalization = Internationalization;
    function setCulture(cultureName) {
        exports.defaultCulture = cultureName;
        exports.onIntlChange.notify('notifyExternalChange', { 'locale': exports.defaultCulture });
    }
    exports.setCulture = setCulture;
    function setCurrencyCode(currencyCode) {
        exports.defaultCurrencyCode = currencyCode;
    }
    exports.setCurrencyCode = setCurrencyCode;
    function loadCldr() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var obj = data_1[_a];
            util_1.extend(exports.cldrData, obj, {}, true);
        }
    }
    exports.loadCldr = loadCldr;
    function enableRtl(status) {
        if (status === void 0) { status = true; }
        exports.rightToLeft = status;
        exports.onIntlChange.notify('notifyExternalChange', { enableRtl: exports.rightToLeft });
    }
    exports.enableRtl = enableRtl;
    function getNumericObject(locale, type) {
        var numObject = intl_base_1.IntlBase.getDependables(exports.cldrData, locale, true)[mapper[0]];
        var dateObject = intl_base_1.IntlBase.getDependables(exports.cldrData, locale)[mapper[1]];
        var numSystem = util_1.getValue('defaultNumberingSystem', numObject);
        var symbPattern = util_1.getValue('symbols-numberSystem-' + numSystem, numObject);
        var pattern = intl_base_1.IntlBase.getSymbolPattern(type || 'decimal', numSystem, numObject, false);
        return util_1.extend(symbPattern, intl_base_1.IntlBase.getFormatData(pattern, true, '', true), { 'dateSeparator': intl_base_1.IntlBase.getDateSeparator(dateObject) });
    }
    exports.getNumericObject = getNumericObject;
    function getDefaultDateObject() {
        return intl_base_1.IntlBase.getDependables(exports.cldrData, '', false)[mapper[1]];
    }
    exports.getDefaultDateObject = getDefaultDateObject;
});
