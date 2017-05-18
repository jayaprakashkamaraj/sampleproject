import { DateFormat } from './Internationalization/date-formatter';
import { NumberFormat } from './Internationalization/number-formatter';
import { DateParser } from './Internationalization/date-parser';
import { NumberParser } from './Internationalization/number-parser';
import { IntlBase } from './Internationalization/intl-base';
import { extend, getValue } from './util';
import { Observer } from './observer';
export var onIntlChange = new Observer();
export var rightToLeft = false;
export var cldrData = {};
export var defaultCulture = 'en-US';
export var defaultCurrencyCode = 'USD';
var mapper = ['numericObject', 'dateObject'];
var Internationalization = (function () {
    function Internationalization(cultureName) {
        if (cultureName) {
            this.culture = cultureName;
        }
    }
    Internationalization.prototype.getDateFormat = function (options) {
        return DateFormat.dateFormat(this.getCulture(), options || { type: 'date', skeleton: 'short' }, cldrData);
    };
    Internationalization.prototype.getNumberFormat = function (options) {
        if (options && !options.currency) {
            options.currency = defaultCurrencyCode;
        }
        return NumberFormat.numberFormatter(this.getCulture(), options || {}, cldrData);
    };
    Internationalization.prototype.getDateParser = function (options) {
        return DateParser.dateParser(this.getCulture(), options || { skeleton: 'short', type: 'date' }, cldrData);
    };
    Internationalization.prototype.getNumberParser = function (options) {
        return NumberParser.numberParser(this.getCulture(), options || { format: 'N' }, cldrData);
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
        return this.culture || defaultCulture;
    };
    return Internationalization;
}());
export { Internationalization };
export function setCulture(cultureName) {
    defaultCulture = cultureName;
    onIntlChange.notify('notifyExternalChange', { 'locale': defaultCulture });
}
export function setCurrencyCode(currencyCode) {
    defaultCurrencyCode = currencyCode;
}
export function loadCldr() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
        var obj = data_1[_a];
        extend(cldrData, obj, {}, true);
    }
}
export function enableRtl(status) {
    if (status === void 0) { status = true; }
    rightToLeft = status;
    onIntlChange.notify('notifyExternalChange', { enableRtl: rightToLeft });
}
export function getNumericObject(locale, type) {
    var numObject = IntlBase.getDependables(cldrData, locale, true)[mapper[0]];
    var dateObject = IntlBase.getDependables(cldrData, locale)[mapper[1]];
    var numSystem = getValue('defaultNumberingSystem', numObject);
    var symbPattern = getValue('symbols-numberSystem-' + numSystem, numObject);
    var pattern = IntlBase.getSymbolPattern(type || 'decimal', numSystem, numObject, false);
    return extend(symbPattern, IntlBase.getFormatData(pattern, true, '', true), { 'dateSeparator': IntlBase.getDateSeparator(dateObject) });
}
export function getDefaultDateObject() {
    return IntlBase.getDependables(cldrData, '', false)[mapper[1]];
}
