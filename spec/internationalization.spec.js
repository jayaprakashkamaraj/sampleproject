define(["require", "exports", "../src/internationalization", "./Internationalization/date-parser.spec", "../src/Internationalization/intl-base"], function (require, exports, internationalization_1, date_parser_spec_1, intl_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Internationalization', function () {
        beforeAll(function () {
            internationalization_1.setCulture('en-US');
        });
        describe('Date Fromatting without local culture set', function () {
            var dateIntl = new internationalization_1.Internationalization();
            var date = new Date('11/17/2016');
            it('datefromatting using the getdateFormat', function () {
                var dateformatter = dateIntl.getDateFormat({ skeleton: 'long', type: 'date' });
                expect(dateformatter(date)).toBe('November 17, 2016');
            });
            it('datefromatting using the formatDate', function () {
                var result = dateIntl.formatDate(date, { skeleton: 'Gy' });
                expect(result).toBe('2016 AD');
            });
            it('datefromatting using the formatDate with no options', function () {
                var result = dateIntl.formatDate(date);
                expect(result).toBe('11/17/16');
            });
            it('dateformatter by changing culture using "setCulture" methos', function () {
                internationalization_1.setCulture('ja');
                var result = dateIntl.formatDate(date, { skeleton: 'yMMMEd' });
                expect(result).toBe('2016年11月17日(木)');
            });
            afterAll(function () {
                internationalization_1.setCulture('en-US');
            });
        });
        describe('Number Fromatting with local culture set', function () {
            var numIntl = new internationalization_1.Internationalization('ja');
            it('numberformatter using the getNumberFormatter and currency code set in option', function () {
                var numberformatter = numIntl.getNumberFormat({ format: 'C2', currency: 'JPY' });
                expect(numberformatter(123134)).toBe('￥123,134.00');
            });
            it('numberformatter using the getNumberFormatter and using global default currency code', function () {
                var numberformatter = numIntl.getNumberFormat({ format: 'C2' });
                expect(numberformatter(123134)).toBe('$123,134.00');
            });
            it('numberfromatting using the formatNumber', function () {
                var result = numIntl.formatNumber(2341123.23, { format: 'p2' });
                expect(result).toBe('234,112,323.00%');
            });
            it('numberfromatting using the formatNumber with no options', function () {
                var result = numIntl.formatNumber(2341123.234);
                expect(result).toBe('2,341,123.234');
            });
            it('Number formatter with rtl language set locale for instance', function () {
                numIntl.culture = 'ar-QA';
                var result = numIntl.formatNumber(2345634.342534, { format: 'n' });
                expect(result).toBe('٢٬٣٤٥٬٦٣٤٫٣٤٣');
            });
            it('Number formatter by changing culture using "setCulture" method and currency using the "setCurrencyCode"', function () {
                numIntl.culture = undefined;
                internationalization_1.setCulture('en');
                internationalization_1.setCurrencyCode('EUR');
                var result = numIntl.formatNumber(23412312.2212123, {
                    format: 'C', maximumFractionDigits: 5, minimumFractionDigits: 2
                });
                expect(result).toBe('€23,412,312.22121');
            });
            afterAll(function () {
                internationalization_1.setCulture('en-US');
                internationalization_1.setCurrencyCode('USD');
            });
        });
        describe('Date Parser', function () {
            var dParseIntl = new internationalization_1.Internationalization();
            var parseDate = new Date();
            it('using getDateparser function', function () {
                var parser = dParseIntl.getDateParser({ skeleton: 'yMMMM' });
                var result = parser(dParseIntl.formatDate(parseDate, { skeleton: 'yMMMM' }));
                result.setDate(parseDate.getDate());
                expect(date_parser_spec_1.monthDayMatch(result, parseDate)).toBeTruthy;
            });
            it('using parse date and default value', function () {
                var ip = dParseIntl.formatDate(parseDate, { type: 'date', skeleton: 'short' });
                var result = dParseIntl.parseDate(ip);
                expect(date_parser_spec_1.monthDayMatch(result, parseDate));
            });
        });
        describe('Number  Parser', function () {
            var nParseIntl = new internationalization_1.Internationalization();
            var parseDate = new Date();
            it('using getNumberParser function', function () {
                var parser = nParseIntl.getNumberParser({ format: 'P' });
                var result = parser(nParseIntl.formatNumber(12345.23, { format: 'p2' }));
                expect(result).toBe(12345.23);
            });
            it('using parse number function', function () {
                var result = nParseIntl.parseNumber(nParseIntl.formatNumber(12345.23, { format: 'N', minimumFractionDigits: 5 }));
                expect(result).toBe(12345.23);
            });
        });
        describe('getNumericObject', function () {
            it('checkNumericObject for invalid culture returns default culture', function () {
                expect(internationalization_1.getNumericObject('fe')).toEqual({
                    decimal: '.', exponential: 'E', group: ',', infinity: '∞', list: ';', maximumFraction: 3, minimumFraction: 0,
                    minusSign: '-', nan: 'NaN', perMille: '‰', percentSign: '%', plusSign: '+', superscriptingExponent: '×',
                    timeSeparator: ':', dateSeparator: '/'
                });
            });
            it('checkNumericObject for "ar-QA" culture', function () {
                expect(internationalization_1.getNumericObject('ar-QA')).toEqual({
                    decimal: '٫', group: '٬', list: '؛', percentSign: '٪؜', plusSign: '؜+', minusSign: '؜-',
                    exponential: 'اس', superscriptingExponent: '×', perMille: '؉', infinity: '∞',
                    nan: 'ليس رقم', timeSeparator: ':', minimumFraction: 0, maximumFraction: 3, dateSeparator: '/'
                });
            });
        });
        describe('getDateSeparator check', function () {
            it('empty dateObject', function () {
                expect(intl_base_1.IntlBase.getDateSeparator({})).toBe('/');
            });
            it('undefined parameter', function () {
                expect(intl_base_1.IntlBase.getDateSeparator(undefined)).toBe('/');
            });
        });
        describe('getDefaultDateObject returns default dateObject properly', function () {
            it('', function () {
                expect(JSON.stringify(internationalization_1.getDefaultDateObject())).toBe(JSON.stringify({
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
                }));
            });
        });
    });
});
