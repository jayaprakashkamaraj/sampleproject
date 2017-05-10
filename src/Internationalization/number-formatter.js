define(["require", "exports", "../util", "../internationalization", "./intl-base", "./parser-base"], function (require, exports, util_1, internationalization_1, intl_base_1, parser_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var errorText = {
        'ms': 'minimumSignificantDigits',
        'ls': 'maximumSignificantDigits',
        'mf': 'minimumFractionDigits',
        'lf': 'maximumFractionDigits',
    };
    var integerError = 'minimumIntegerDigits';
    var percentSign = 'percentSign';
    var minusSign = 'minusSign';
    var spaceRegex = /\s/;
    var mapper = ['infinity', 'nan', 'group', 'decimal'];
    var infinity = 'infinity';
    var nan = 'nan';
    var NumberFormat = (function () {
        function NumberFormat() {
        }
        NumberFormat.numberFormatter = function (culture, option, cldr) {
            var _this = this;
            var fOptions = util_1.extend({}, option);
            var cOptions = {};
            var dOptions = {};
            var symbolPattern;
            var dependable = intl_base_1.IntlBase.getDependables(cldr, culture, true);
            dOptions.numberMapper = parser_base_1.ParserBase.getNumberMapper(dependable.parserObject, parser_base_1.ParserBase.getNumberingSystem(cldr), true);
            dOptions.currencySymbol = intl_base_1.IntlBase.getCurrencySymbol(dependable.numericObject, fOptions.currency || internationalization_1.defaultCurrencyCode);
            dOptions.percentSymbol = dOptions.numberMapper.numberSymbols[percentSign];
            dOptions.minusSymbol = dOptions.numberMapper.numberSymbols[minusSign];
            var symbols = dOptions.numberMapper.numberSymbols;
            if ((option.format) && !(intl_base_1.IntlBase.formatRegex.test(option.format))) {
                cOptions = intl_base_1.IntlBase.customFormat(option.format, dOptions, dependable.numericObject);
            }
            else {
                util_1.extend(fOptions, intl_base_1.IntlBase.getProperNumericSkeleton(option.format || 'N'));
                fOptions.isCurrency = fOptions.type === 'currency';
                fOptions.isPercent = fOptions.type === 'percent';
                symbolPattern = intl_base_1.IntlBase.getSymbolPattern(fOptions.type, dOptions.numberMapper.numberSystem, dependable.numericObject, fOptions.isAccount);
                fOptions.groupOne = this.checkValueRange(fOptions.maximumSignificantDigits, fOptions.minimumSignificantDigits, true);
                this.checkValueRange(fOptions.maximumFractionDigits, fOptions.minimumFractionDigits, false, true);
                if (!util_1.isUndefined(fOptions.fractionDigits)) {
                    fOptions.minimumFractionDigits = fOptions.maximumFractionDigits = fOptions.fractionDigits;
                }
                if (util_1.isUndefined(fOptions.useGrouping)) {
                    fOptions.useGrouping = true;
                }
                if (fOptions.isCurrency) {
                    symbolPattern = symbolPattern.replace(/\u00A4/g, intl_base_1.IntlBase.defaultCurrency);
                }
                var split = symbolPattern.split(';');
                cOptions.nData = intl_base_1.IntlBase.getFormatData(split[1] || '-' + split[0], true, dOptions.currencySymbol);
                cOptions.pData = intl_base_1.IntlBase.getFormatData(split[0], false, dOptions.currencySymbol);
                if (fOptions.useGrouping) {
                    fOptions.groupSeparator = symbols[mapper[2]];
                    fOptions.groupData = this.getGroupingDetails(split[0]);
                }
                var minFrac = util_1.isUndefined(fOptions.minimumFractionDigits);
                if (minFrac) {
                    fOptions.minimumFractionDigits = cOptions.nData.minimumFraction;
                }
                if (util_1.isUndefined(fOptions.maximumFractionDigits)) {
                    var mval = cOptions.nData.maximumFraction;
                    fOptions.maximumFractionDigits = util_1.isUndefined(mval) && fOptions.isPercent ? 0 : mval;
                }
                var mfrac = fOptions.minimumFractionDigits;
                var lfrac = fOptions.maximumFractionDigits;
                if (!util_1.isUndefined(mfrac) && !util_1.isUndefined(lfrac)) {
                    if (mfrac > lfrac) {
                        fOptions.maximumFractionDigits = mfrac;
                    }
                }
            }
            util_1.extend(cOptions.nData, fOptions);
            util_1.extend(cOptions.pData, fOptions);
            return function (value) {
                if (isNaN(value)) {
                    return symbols[mapper[1]];
                }
                else if (!isFinite(value)) {
                    return symbols[mapper[0]];
                }
                return _this.intNumberFormatter(value, cOptions, dOptions);
            };
        };
        NumberFormat.getGroupingDetails = function (pattern) {
            var ret = {};
            var match = pattern.match(intl_base_1.IntlBase.negativeDataRegex);
            if (match && match[4]) {
                var pattern_1 = match[4];
                var p = pattern_1.lastIndexOf(',');
                if (p !== -1) {
                    var temp = pattern_1.split('.')[0];
                    ret.primary = (temp.length - p) - 1;
                    var s = pattern_1.lastIndexOf(',', p - 1);
                    if (s !== -1) {
                        ret.secondary = p - 1 - s;
                    }
                }
            }
            return ret;
        };
        NumberFormat.checkValueRange = function (val1, val2, checkbothExist, isFraction) {
            var decide = isFraction ? 'f' : 's';
            var dint = 0;
            var str1 = errorText['l' + decide];
            var str2 = errorText['m' + decide];
            if (!util_1.isUndefined(val1)) {
                this.checkRange(val1, str1, isFraction);
                dint++;
            }
            if (!util_1.isUndefined(val2)) {
                this.checkRange(val2, str2, isFraction);
                dint++;
            }
            if (dint === 2) {
                if (val1 < val2) {
                    util_1.throwError(str2 + 'specified must be less than the' + str1);
                }
                else {
                    return true;
                }
            }
            else if (checkbothExist && dint === 1) {
                util_1.throwError('Both' + str2 + 'and' + str2 + 'must be present');
            }
            return false;
        };
        NumberFormat.checkRange = function (val, text, isFraction) {
            var range = isFraction ? [0, 20] : [1, 21];
            if (val < range[0] || val > range[1]) {
                util_1.throwError(text + 'value must be within the range' + range[0] + 'to' + range[1]);
            }
        };
        NumberFormat.intNumberFormatter = function (value, fOptions, dOptions) {
            var curData;
            if (value < 0) {
                value = value * -1;
                curData = fOptions.nData;
            }
            else if (value === 0) {
                curData = fOptions.zeroData || fOptions.pData;
            }
            else {
                curData = fOptions.pData;
            }
            var fValue = '';
            if (curData.isPercent) {
                value = value * 100;
            }
            if (curData.groupOne) {
                fValue = this.processSignificantDigits(value, curData.minimumSignificantDigits, curData.maximumSignificantDigits);
            }
            else {
                fValue = this.processFraction(value, curData.minimumFractionDigits, curData.maximumFractionDigits);
                if (curData.minimumIntegerDigits) {
                    fValue = this.processMinimumIntegers(fValue, curData.minimumIntegerDigits);
                }
            }
            fValue = fValue.replace('.', dOptions.numberMapper.numberSymbols[mapper[3]]);
            if (curData.useGrouping) {
                fValue = this.groupNumbers(fValue, curData.groupData.primary, curData.groupSeparator || ',', dOptions.numberMapper.numberSymbols[mapper[3]] || '.', curData.groupData.secondary);
            }
            fValue = parser_base_1.ParserBase.convertValueParts(fValue, intl_base_1.IntlBase.latnParseRegex, dOptions.numberMapper.mapper);
            return curData.nlead + fValue + curData.nend;
        };
        NumberFormat.processSignificantDigits = function (value, min, max) {
            var temp = value + '';
            var tn;
            var length = temp.length;
            if (length < min) {
                return value.toPrecision(min);
            }
            else {
                temp = value.toPrecision(max);
                tn = +temp;
                return tn + '';
            }
        };
        NumberFormat.groupNumbers = function (val, level1, sep, decimalSymbol, level2) {
            var flag = !util_1.isNullOrUndefined(level2) && level2 !== 0;
            var split = val.split(decimalSymbol);
            var prefix = split[0];
            var length = prefix.length;
            var str = '';
            while (length > level1) {
                str = prefix.slice(length - level1, length) + (str.length ?
                    (sep + str) : '');
                length -= level1;
                if (flag) {
                    level1 = level2;
                    flag = false;
                }
            }
            split[0] = prefix.slice(0, length) + (str.length ? sep : '') + str;
            return split.join(decimalSymbol);
        };
        NumberFormat.processFraction = function (value, min, max) {
            var temp = (value + '').split('.')[1];
            var length = temp ? temp.length : 0;
            if (min && length < min) {
                var ret = '';
                if (length === 0) {
                    ret = value.toFixed(min);
                }
                else {
                    ret += value;
                    for (var j = 0; j < min - length; j++) {
                        ret += '0';
                    }
                    return ret;
                }
                return value.toFixed(min);
            }
            else if (!util_1.isNullOrUndefined(max) && (length > max || max === 0)) {
                return value.toFixed(max);
            }
            return value + '';
        };
        NumberFormat.processMinimumIntegers = function (value, min) {
            var temp = value.split('.');
            var lead = temp[0];
            var len = lead.length;
            if (len < min) {
                for (var i = 0; i < min - len; i++) {
                    lead = '0' + lead;
                }
                temp[0] = lead;
            }
            return temp.join('.');
        };
        return NumberFormat;
    }());
    exports.NumberFormat = NumberFormat;
});
