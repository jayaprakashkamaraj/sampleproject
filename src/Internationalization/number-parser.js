define(["require", "exports", "../util", "./parser-base", "./intl-base"], function (require, exports, util_1, parser_base_1, intl_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var formatRegex = /(^[ncpa]{1})([0-1]?[0-9]|20)?$/i;
    var parseRegex = /^([^0-9]*)(([0-9,]*[0-9]+)(\.[0-9]+)?)([Ee][+-]?[0-9]+)?([^0-9]*)$/;
    var groupRegex = /,/g;
    var latnDecimalRegex = /^[0-9]*(\.[0-9]+)?$/;
    var keys = ['minusSign', 'infinity'];
    var NumberParser = (function () {
        function NumberParser() {
        }
        NumberParser.numberParser = function (culture, option, cldr) {
            var _this = this;
            var dependable = intl_base_1.IntlBase.getDependables(cldr, culture, true);
            var parseOptions = { custom: true };
            var numOptions;
            if ((intl_base_1.IntlBase.formatRegex.test(option.format)) || !(option.format)) {
                util_1.extend(parseOptions, intl_base_1.IntlBase.getProperNumericSkeleton(option.format || 'N'));
                parseOptions.custom = false;
            }
            else {
                util_1.extend(parseOptions, intl_base_1.IntlBase.customFormat(option.format, null, null));
            }
            numOptions = parser_base_1.ParserBase.getCurrentNumericOptions(dependable.parserObject, parser_base_1.ParserBase.getNumberingSystem(cldr), true);
            parseOptions.symbolRegex = parser_base_1.ParserBase.getSymbolRegex(Object.keys(numOptions.symbolMatch));
            parseOptions.infinity = numOptions.symbolNumberSystem[keys[1]];
            var symbolpattern = intl_base_1.IntlBase.getSymbolPattern(parseOptions.type, numOptions.numberSystem, dependable.numericObject, parseOptions.isAccount);
            if (symbolpattern) {
                symbolpattern = symbolpattern.replace(/\u00A4/g, intl_base_1.IntlBase.defaultCurrency);
                var split = symbolpattern.split(';');
                parseOptions.nData = intl_base_1.IntlBase.getFormatData(split[1] || '-' + split[0], true, '');
                parseOptions.pData = intl_base_1.IntlBase.getFormatData(split[0], true, '');
            }
            return function (value) {
                return _this.getParsedNumber(value, parseOptions, numOptions);
            };
        };
        NumberParser.getParsedNumber = function (value, options, numOptions) {
            var isNegative;
            var isPercent;
            var tempValue;
            var lead;
            var end;
            var ret;
            if (value.indexOf(options.infinity) !== -1) {
                return Infinity;
            }
            else {
                value = parser_base_1.ParserBase.convertValueParts(value, options.symbolRegex, numOptions.symbolMatch);
                value = parser_base_1.ParserBase.convertValueParts(value, numOptions.numberParseRegex, numOptions.numericPair);
                if (value.indexOf('.') === 0) {
                    value = '0' + value;
                }
                var matches = value.match(parseRegex);
                if (util_1.isNullOrUndefined(matches)) {
                    return NaN;
                }
                lead = matches[1];
                tempValue = matches[2];
                var exponent = matches[5];
                end = matches[6];
                isNegative = options.custom ? ((lead === options.nData.nlead) && (end === options.nData.nend)) :
                    ((lead.indexOf(options.nData.nlead) !== -1) && (end.indexOf(options.nData.nend) !== -1));
                isPercent = isNegative ?
                    options.nData.isPercent :
                    options.pData.isPercent;
                tempValue = tempValue.replace(groupRegex, '');
                if (exponent) {
                    tempValue += exponent;
                }
                ret = +tempValue;
                if (options.type === 'percent' || isPercent) {
                    ret = ret / 100;
                }
                if (options.custom || options.fractionDigits) {
                    ret = parseFloat(ret.toFixed(options.custom ?
                        (isNegative ? options.nData.maximumFractionDigits : options.pData.maximumFractionDigits) : options.fractionDigits));
                }
                if (isNegative) {
                    ret *= -1;
                }
                return ret;
            }
        };
        return NumberParser;
    }());
    exports.NumberParser = NumberParser;
});
