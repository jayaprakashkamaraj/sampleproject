define(["require", "exports", "../util", "./parser-base", "./number-formatter"], function (require, exports, util_1, parser_base_1, number_formatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IntlBase;
    (function (IntlBase) {
        IntlBase.negativeDataRegex = /^(('[^']+'|''|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
        IntlBase.customRegex = /^(('[^']+'|''|[^*#@0,.])*)(\*.)?((([0#,]*[0,]*[0#]*)(\.[0#]*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
        IntlBase.latnParseRegex = /0|1|2|3|4|5|6|7|8|9/g;
        var fractionRegex = /[0-9]/g;
        IntlBase.defaultCurrency = '$';
        var mapper = ['infinity', 'nan', 'group', 'decimal'];
        IntlBase.formatRegex = /(^[ncpa]{1})([0-1]?[0-9]|20)?$/i;
        var typeMapper = {
            '$': 'isCurrency',
            '%': 'isPercent',
            '-': 'isNegative',
            0: 'nlead',
            1: 'nend'
        };
        IntlBase.dateParseRegex = /([a-z])\1*|'([^']|'')+'|''|./gi;
        IntlBase.basicPatterns = ['short', 'medium', 'long', 'full'];
        IntlBase.defaultObject = {
            'dates': {
                'calendars': {
                    'gregorian': {
                        'months': {
                            'stand-alone': {
                                'abbreviated': {
                                    '1': 'Jan',
                                    '2': 'Feb',
                                    '3': 'Mar',
                                    '4': 'Apr',
                                    '5': 'May',
                                    '6': 'Jun',
                                    '7': 'Jul',
                                    '8': 'Aug',
                                    '9': 'Sep',
                                    '10': 'Oct',
                                    '11': 'Nov',
                                    '12': 'Dec'
                                },
                                'narrow': {
                                    '1': 'J',
                                    '2': 'F',
                                    '3': 'M',
                                    '4': 'A',
                                    '5': 'M',
                                    '6': 'J',
                                    '7': 'J',
                                    '8': 'A',
                                    '9': 'S',
                                    '10': 'O',
                                    '11': 'N',
                                    '12': 'D'
                                },
                                'wide': {
                                    '1': 'January',
                                    '2': 'February',
                                    '3': 'March',
                                    '4': 'April',
                                    '5': 'May',
                                    '6': 'June',
                                    '7': 'July',
                                    '8': 'August',
                                    '9': 'September',
                                    '10': 'October',
                                    '11': 'November',
                                    '12': 'December'
                                }
                            }
                        },
                        "days": {
                            "stand-alone": {
                                "abbreviated": {
                                    "sun": "Sun",
                                    "mon": "Mon",
                                    "tue": "Tue",
                                    "wed": "Wed",
                                    "thu": "Thu",
                                    "fri": "Fri",
                                    "sat": "Sat"
                                },
                                "narrow": {
                                    "sun": "S",
                                    "mon": "M",
                                    "tue": "T",
                                    "wed": "W",
                                    "thu": "T",
                                    "fri": "F",
                                    "sat": "S"
                                },
                                "short": {
                                    "sun": "Su",
                                    "mon": "Mo",
                                    "tue": "Tu",
                                    "wed": "We",
                                    "thu": "Th",
                                    "fri": "Fr",
                                    "sat": "Sa"
                                },
                                "wide": {
                                    "sun": "Sunday",
                                    "mon": "Monday",
                                    "tue": "Tuesday",
                                    "wed": "Wednesday",
                                    "thu": "Thursday",
                                    "fri": "Friday",
                                    "sat": "Saturday"
                                }
                            }
                        },
                        "dayPeriods": {
                            "format": {
                                "wide": {
                                    "am": "AM",
                                    "pm": "PM"
                                }
                            }
                        },
                        'eras': {
                            'eraNames': {
                                '0': 'Before Christ',
                                '0-alt-variant': 'Before Common Era',
                                '1': 'Anno Domini',
                                "1-alt-variant": "Common Era"
                            },
                            'eraAbbr': {
                                '0': 'BC',
                                '0-alt-variant': 'BCE',
                                '1': 'AD',
                                '1-alt-variant': 'CE'
                            },
                            'eraNarrow': {
                                '0': 'B',
                                '0-alt-variant': 'BCE',
                                '1': 'A',
                                '1-alt-variant': 'CE'
                            }
                        },
                        'dateFormats': {
                            'full': 'EEEE, MMMM d, y',
                            'long': 'MMMM d, y',
                            'medium': 'MMM d, y',
                            'short': 'M/d/yy'
                        },
                        'timeFormats': {
                            'full': 'h:mm:ss a zzzz',
                            'long': 'h:mm:ss a z',
                            'medium': 'h:mm:ss a',
                            'short': 'h:mm a'
                        },
                        'dateTimeFormats': {
                            'full': "{1} 'at' {0}",
                            'long': "{1} 'at' {0}",
                            'medium': '{1}, {0}',
                            'short': '{1}, {0}',
                            'availableFormats': {
                                'd': 'd',
                                'E': 'ccc',
                                'Ed': 'd E',
                                'Ehm': 'E h:mm a',
                                'EHm': 'E HH:mm',
                                'Ehms': 'E h:mm:ss a',
                                'EHms': 'E HH:mm:ss',
                                'Gy': 'y G',
                                'GyMMM': 'MMM y G',
                                'GyMMMd': 'MMM d, y G',
                                'GyMMMEd': 'E, MMM d, y G',
                                'h': 'h a',
                                'H': 'HH',
                                'hm': 'h:mm a',
                                'Hm': 'HH:mm',
                                'hms': 'h:mm:ss a',
                                'Hms': 'HH:mm:ss',
                                'hmsv': 'h:mm:ss a v',
                                'Hmsv': 'HH:mm:ss v',
                                'hmv': 'h:mm a v',
                                'Hmv': 'HH:mm v',
                                'M': 'L',
                                'Md': 'M/d',
                                'MEd': 'E, M/d',
                                'MMM': 'LLL',
                                'MMMd': 'MMM d',
                                'MMMEd': 'E, MMM d',
                                'MMMMd': 'MMMM d',
                                'ms': 'mm:ss',
                                'y': 'y',
                                'yM': 'M/y',
                                'yMd': 'M/d/y',
                                'yMEd': 'E, M/d/y',
                                'yMMM': 'MMM y',
                                'yMMMd': 'MMM d, y',
                                'yMMMEd': 'E, MMM d, y',
                                'yMMMM': 'MMMM y',
                            },
                        }
                    }
                },
                'timeZoneNames': {
                    "hourFormat": "+HH:mm;-HH:mm",
                    "gmtFormat": "GMT{0}",
                    "gmtZeroFormat": "GMT",
                }
            },
            'numbers': {
                'currencies': {
                    'USD': {
                        'displayName': 'US Dollar',
                        'symbol': '$',
                        'symbol-alt-narrow': '$'
                    },
                    'EUR': {
                        'displayName': 'Euro',
                        'symbol': '€',
                        'symbol-alt-narrow': '€'
                    },
                    'GBP': {
                        'displayName': 'British Pound',
                        'symbol-alt-narrow': '£'
                    },
                },
                'defaultNumberingSystem': 'latn',
                'minimumGroupingDigits': '1',
                'symbols-numberSystem-latn': {
                    'decimal': '.',
                    'group': ',',
                    'list': ';',
                    'percentSign': '%',
                    'plusSign': '+',
                    'minusSign': '-',
                    'exponential': 'E',
                    'superscriptingExponent': '×',
                    'perMille': '‰',
                    'infinity': '∞',
                    'nan': 'NaN',
                    'timeSeparator': ':'
                },
                'decimalFormats-numberSystem-latn': {
                    'standard': '#,##0.###',
                },
                'percentFormats-numberSystem-latn': {
                    'standard': '#,##0%'
                },
                'currencyFormats-numberSystem-latn': {
                    'standard': '¤#,##0.00',
                    'accounting': '¤#,##0.00;(¤#,##0.00)'
                }
            }
        };
        IntlBase.monthIndex = {
            3: 'abbreviated',
            4: 'wide',
            5: 'narrow',
            1: 'abbreviated'
        };
        IntlBase.month = 'months';
        IntlBase.days = 'days';
        IntlBase.patternMatcher = {
            C: 'currency',
            P: 'percent',
            N: 'decimal',
            A: 'currency'
        };
        function getResultantPattern(skeleton, dateObject, type) {
            var resPattern;
            var iType = type || 'date';
            if (IntlBase.basicPatterns.indexOf(skeleton) !== -1) {
                resPattern = util_1.getValue(iType + 'Formats.' + skeleton, dateObject);
                if (iType === 'dateTime') {
                    var dPattern = util_1.getValue('dateFormats.' + skeleton, dateObject);
                    var tPattern = util_1.getValue('timeFormats.' + skeleton, dateObject);
                    resPattern = resPattern.replace('{1}', dPattern).replace('{0}', tPattern);
                }
            }
            else {
                resPattern = util_1.getValue('dateTimeFormats.availableFormats.' + skeleton, dateObject);
            }
            return resPattern;
        }
        IntlBase.getResultantPattern = getResultantPattern;
        function getDependables(cldr, culture, isNumber) {
            var ret = {};
            ret.parserObject = parser_base_1.ParserBase.getMainObject(cldr, culture) || IntlBase.defaultObject;
            if (isNumber) {
                ret.numericObject = util_1.getValue('numbers', ret.parserObject);
            }
            else {
                ret.dateObject = util_1.getValue('dates.calendars.gregorian', ret.parserObject);
            }
            return ret;
        }
        IntlBase.getDependables = getDependables;
        function getSymbolPattern(type, numSystem, obj, isAccount) {
            return util_1.getValue(type + 'Formats-numberSystem-' +
                numSystem + (isAccount ? '.accounting' : '.standard'), obj) || (isAccount ? util_1.getValue(type + 'Formats-numberSystem-' +
                numSystem + '.standard', obj) : '');
        }
        IntlBase.getSymbolPattern = getSymbolPattern;
        function getProperNumericSkeleton(skeleton) {
            var matches = skeleton.match(IntlBase.formatRegex);
            var ret = {};
            var pattern = matches[1].toUpperCase();
            ret.isAccount = (pattern === 'A');
            ret.type = IntlBase.patternMatcher[pattern];
            if (skeleton.length > 1) {
                ret.fractionDigits = parseInt(matches[2], 10);
            }
            return ret;
        }
        IntlBase.getProperNumericSkeleton = getProperNumericSkeleton;
        function getFormatData(pattern, needFraction, cSymbol, fractionOnly) {
            var nData = fractionOnly ? {} : { nlead: '', nend: '' };
            var match = pattern.match(IntlBase.customRegex);
            if (match) {
                if (!fractionOnly) {
                    nData.nlead = changeCurrencySymbol(match[1], cSymbol);
                    nData.nend = changeCurrencySymbol(match[10], cSymbol);
                    nData.groupPattern = match[4];
                }
                var fraction = match[7];
                if (fraction && needFraction) {
                    var fmatch = fraction.match(fractionRegex);
                    if (!util_1.isNullOrUndefined(fmatch)) {
                        nData.minimumFraction = fmatch.length;
                    }
                    else {
                        nData.minimumFraction = 0;
                    }
                    nData.maximumFraction = fraction.length - 1;
                }
            }
            return nData;
        }
        IntlBase.getFormatData = getFormatData;
        function changeCurrencySymbol(val, sym) {
            if (val) {
                return val.replace(IntlBase.defaultCurrency, sym);
            }
            return '';
        }
        function getCurrencySymbol(numericObject, currencyCode) {
            return util_1.getValue('currencies.' + currencyCode + '.symbol', numericObject) || '$';
        }
        IntlBase.getCurrencySymbol = getCurrencySymbol;
        function customFormat(format, dOptions, obj) {
            var options = {};
            var formatSplit = format.split(';');
            var data = ['pData', 'nData', 'zeroData'];
            for (var i = 0; i < formatSplit.length; i++) {
                options[data[i]] = customNumberFormat(formatSplit[i], dOptions, obj);
            }
            if (util_1.isNullOrUndefined(options.nData)) {
                options.nData = util_1.extend({}, options.pData);
                options.nData.nlead = util_1.isNullOrUndefined(dOptions) ? '-' + options.nData.nlead : dOptions.minusSymbol + options.nData.nlead;
            }
            return options;
        }
        IntlBase.customFormat = customFormat;
        function customNumberFormat(format, dOptions, numObject) {
            var cOptions = { type: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 };
            var pattern = format.match(IntlBase.customRegex);
            if (util_1.isNullOrUndefined(pattern) || pattern[5] === '') {
                util_1.throwError('Given Format is not valid or Cldr data not loaded');
            }
            cOptions.nlead = pattern[1];
            cOptions.nend = pattern[10];
            var integerPart = pattern[6];
            cOptions.useGrouping = integerPart.indexOf(',') !== -1;
            integerPart = integerPart.replace(/,/g, '');
            var fractionPart = pattern[7];
            if (integerPart.indexOf('0') !== -1) {
                cOptions.minimumIntegerDigits = integerPart.length - integerPart.indexOf('0');
            }
            if (!util_1.isNullOrUndefined(fractionPart)) {
                cOptions.minimumFractionDigits = fractionPart.lastIndexOf('0');
                cOptions.maximumFractionDigits = fractionPart.lastIndexOf('#');
                if (cOptions.minimumFractionDigits === -1) {
                    cOptions.minimumFractionDigits = 0;
                }
                if (cOptions.maximumFractionDigits === -1 || cOptions.maximumFractionDigits < cOptions.minimumFractionDigits) {
                    cOptions.maximumFractionDigits = cOptions.minimumFractionDigits;
                }
            }
            if (!util_1.isNullOrUndefined(dOptions)) {
                util_1.extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '$', dOptions.currencySymbol));
                if (!cOptions.isCurrency) {
                    util_1.extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', dOptions.percentSymbol));
                }
            }
            else {
                util_1.extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', '%'));
            }
            if (!util_1.isNullOrUndefined(numObject)) {
                var symbolPattern = getSymbolPattern(cOptions.type, dOptions.numberMapper.numberSystem, numObject, false);
                if (cOptions.useGrouping) {
                    cOptions.groupSeparator = dOptions.numberMapper.numberSymbols[mapper[2]];
                    cOptions.groupData = number_formatter_1.NumberFormat.getGroupingDetails(symbolPattern.split(';')[0]);
                }
                cOptions.nlead = cOptions.nlead.replace(/\'/g, '');
                cOptions.nend = cOptions.nend.replace(/\'/g, '');
            }
            return cOptions;
        }
        function isCurrencyPercent(parts, actual, symbol) {
            var options = { nlead: parts[0], nend: parts[1] };
            for (var i = 0; i < 2; i++) {
                var part = parts[i];
                var loc = part.indexOf(actual);
                if ((loc !== -1) && ((loc < part.indexOf('\'')) || (loc > part.lastIndexOf('\'')))) {
                    options[typeMapper[i]] = part.substr(0, loc) + symbol + part.substr(loc + 1);
                    options[typeMapper[actual]] = true;
                    options.type = options.isCurrency ? 'currency' : 'percent';
                    break;
                }
            }
            return options;
        }
        IntlBase.isCurrencyPercent = isCurrencyPercent;
        function getDateSeparator(dateObj) {
            var value = (util_1.getValue('dateFormats.short', dateObj) || '').match(/[d‏M‏]([^d‏M])[d‏M‏]/i);
            return value ? value[1] : '/';
        }
        IntlBase.getDateSeparator = getDateSeparator;
    })(IntlBase = exports.IntlBase || (exports.IntlBase = {}));
});
