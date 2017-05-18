define(["require", "exports", "../../src/Internationalization/date-parser", "../../src/Internationalization/parser-base", "../../src/internationalization", "../../src/Internationalization/date-formatter", "../../src/util", "../../src/ajax", "../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, date_parser_1, parser_base_1, internationalization_1, date_formatter_1, util_1, ajax_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getTimeZone(date) {
        date = date || new Date();
        var timeZone = date.getTimezoneOffset();
        return timeZone / 60;
    }
    exports.getTimeZone = getTimeZone;
    function processlongTime(d) {
        var offset = d.getTimezoneOffset();
        if (offset !== 0) {
            var val = offset % 60;
            if (val !== 0) {
                d.setMinutes(d.getMinutes() + val);
            }
        }
        return d;
    }
    function getDateString(culture, option, d) {
        var val = date_formatter_1.DateFormat.dateFormat(culture, option, internationalization_1.cldrData)(d);
        return val;
    }
    exports.dupCulObject = {
        main: {
            'dummy': {
                'dates': {
                    'calendars': {
                        'gregorian': {
                            'timeFormats': {
                                'full': 'zzzzz',
                            },
                            'dateTimeFormats': {
                                'availableFormats': {
                                    G: 'y GGGG',
                                    GG: 'y GGGGG'
                                }
                            },
                            'eras': {
                                'eraNames': {
                                    '0': 'Before Christ',
                                    '0-alt-variant': 'Before Common Era',
                                    '1': 'Anno Domini',
                                    '1-alt-variant': 'Common Era'
                                }, 'eraNarrow': {
                                    '0': 'B',
                                    '0-alt-variant': 'BCE',
                                    '1': 'A',
                                    '1-alt-variant': 'CE'
                                }
                            }
                        }
                    },
                    'timeZoneNames': {
                        'hourFormat': '+HH:mm;-HH:mm',
                        'gmtFormat': 'GMT{0}',
                        'gmtZeroFormat': 'GMT',
                    },
                },
                'numbers': {
                    'defaultNumberingSystem': 'latn'
                }
            }
        }
    };
    function getTimeZoneString() {
        var val = getTimeZone();
        if (!util_1.isNullOrUndefined(val)) {
            var ret = val > 0 ? '-' : '+';
            val = Math.abs(val);
            var mval = val % 1 * 60;
            var hval = Math.floor(val);
            return 'GMT' + ret + addzero(hval) + ':' + addzero(mval);
        }
        else {
            return 'GMT';
        }
    }
    function addzero(val) {
        var ret = val + '';
        if (ret.length < 2) {
            return '0' + val;
        }
        return ret;
    }
    function getParsedDate(culture, option, d) {
        var fString = getDateString(culture, option, d);
        var val = date_parser_1.DateParser.dateParser(culture, option, internationalization_1.cldrData)(fString);
        return val;
    }
    function isDateTimeMacthed(date1, date2) {
        return date1.toUTCString() === date2.toUTCString();
    }
    function dateMatched(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    }
    exports.dateMatched = dateMatched;
    function loadCultureFiles(name, base) {
        var files = !base ?
            ['ca-gregorian.json', 'numbers.json', 'timeZoneNames.json', 'currencies.json'] : ['numberingSystems.json'];
        var _loop_1 = function (prop) {
            var val;
            var ajax = void 0;
            if (base) {
                ajax = new ajax_1.Ajax('base/spec/Internationalization/cldr/supplemental/' + prop, 'GET', false);
            }
            else {
                ajax = new ajax_1.Ajax('base/spec/Internationalization/cldr/main/' + name + '/' + prop, 'GET', false);
            }
            ajax.onSuccess = function (value) {
                val = value;
            };
            ajax.send();
            internationalization_1.loadCldr(JSON.parse(val));
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var prop = files_1[_i];
            _loop_1(prop);
        }
    }
    exports.loadCultureFiles = loadCultureFiles;
    loadCultureFiles('', true);
    loadCultureFiles('ar-QA');
    loadCultureFiles('ja');
    function monthDayMatch(date1, date2) {
        return date1.toLocaleDateString() === date2.toLocaleDateString();
    }
    exports.monthDayMatch = monthDayMatch;
    var parseCultures = ['en', 'ar-QA', 'ja'];
    var parserInst = new date_parser_1.DateParser();
    var baseInst = new parser_base_1.ParserBase();
    describe('DateParser', function () {
        var parseDate = new Date();
        beforeAll(function () {
            internationalization_1.loadCldr(exports.dupCulObject);
        });
        var _loop_2 = function (cul) {
            describe('dateTime Format for culture - ' + cul, function () {
                beforeEach(function () {
                    parseDate = new Date();
                });
                it('full type', function () {
                    var result = getParsedDate(cul, { skeleton: 'full', type: 'dateTime' }, parseDate);
                    expect(isDateTimeMacthed(parseDate, result)).toBeTruthy();
                });
                it('long type', function () {
                    var result = getParsedDate(cul, { skeleton: 'long', type: 'dateTime' }, parseDate);
                    result = processlongTime(result);
                    expect(isDateTimeMacthed(parseDate, result)).toBeTruthy();
                });
                it('medium type', function () {
                    var result = getParsedDate(cul, { skeleton: 'medium', type: 'dateTime' }, parseDate);
                    expect(isDateTimeMacthed(parseDate, result)).toBeTruthy();
                });
                it('medium type', function () {
                    var result = getParsedDate(cul, { skeleton: 'medium', type: 'dateTime' }, parseDate);
                    expect(isDateTimeMacthed(parseDate, result)).toBeTruthy();
                });
                it('short type', function () {
                    var result = getParsedDate(cul, { skeleton: 'short', type: 'dateTime' }, parseDate);
                    result.setSeconds(parseDate.getSeconds());
                    expect(isDateTimeMacthed(parseDate, result)).toBeTruthy();
                });
            });
            describe('date Format for culture - ' + cul, function () {
                beforeEach(function () {
                    parseDate = new Date();
                });
                it('full type', function () {
                    var result = getParsedDate(cul, { skeleton: 'full', type: 'date' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('long type', function () {
                    var result = getParsedDate(cul, { skeleton: 'long', type: 'date' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('medium type', function () {
                    var result = getParsedDate(cul, { skeleton: 'medium', type: 'date' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('short type', function () {
                    var result = getParsedDate(cul, { skeleton: 'short', type: 'date' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
            });
            describe('time Format for culture - ' + cul, function () {
                beforeEach(function () {
                    parseDate = new Date();
                });
                it('full type', function () {
                    var result = getParsedDate(cul, { skeleton: 'full', type: 'time' }, parseDate);
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
                it('long type', function () {
                    var result = getParsedDate(cul, { skeleton: 'long', type: 'time' }, parseDate);
                    result = processlongTime(result);
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
                it('medium type', function () {
                    var result = getParsedDate(cul, { skeleton: 'medium', type: 'time' }, parseDate);
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
                it('short type', function () {
                    var result = getParsedDate(cul, { skeleton: 'short', type: 'time' }, parseDate);
                    result.setSeconds(parseDate.getSeconds());
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
            });
            describe('Custom Format for culture - ' + cul, function () {
                beforeEach(function () {
                    parseDate = new Date();
                });
                it('custom date format "M/d/y"', function () {
                    var result = getParsedDate(cul, { format: 'M/d/y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMM dd,y"', function () {
                    var result = getParsedDate(cul, { format: 'MMM dd,y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMMM dd"', function () {
                    var result = getParsedDate(cul, { format: 'MMMM dd' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "dd MMM y"', function () {
                    var result = getParsedDate(cul, { format: 'dd MMM y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "dd MMMM"', function () {
                    var result = getParsedDate(cul, { format: 'dd MMMM' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "dd/MM/y"', function () {
                    var result = getParsedDate(cul, { format: 'dd/MM/y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMM dd"', function () {
                    var result = getParsedDate(cul, { format: 'MMM dd' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMMM y GG"', function () {
                    var result = getParsedDate(cul, { format: 'MMMM y GG' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "d/M/y"', function () {
                    var result = getParsedDate(cul, { format: 'd/M/y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMM-y"', function () {
                    var result = getParsedDate(cul, { format: 'MMM-y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "dd-MMMM"', function () {
                    var result = getParsedDate(cul, { format: 'dd-MMMM' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMM d/y"', function () {
                    var result = getParsedDate(cul, { format: 'MMM d/y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "d-MMM-y GG"', function () {
                    var result = getParsedDate(cul, { format: 'd-MMM-y GG' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMMM d,y GG"', function () {
                    var result = getParsedDate(cul, { format: 'MMMM d,y GG' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "E d-M-y"', function () {
                    var result = getParsedDate(cul, { format: 'E d-M-y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "E MMM d/y GG"', function () {
                    var result = getParsedDate(cul, { format: 'E MMM d/y GG' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "EEEE d MM y"', function () {
                    var result = getParsedDate(cul, { format: 'EEEE d MM y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMMM d,y EEEE"', function () {
                    var result = getParsedDate(cul, { format: 'MMMM d,y EEEE' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "EEEE d-MMM-y"', function () {
                    var result = getParsedDate(cul, { format: 'EEEE d-MMM-y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMMM,y"', function () {
                    var result = getParsedDate(cul, { format: 'MMMM,y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "MMMM d"', function () {
                    var result = getParsedDate(cul, { format: 'MMMM d' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom date format "d MMM y"', function () {
                    var result = getParsedDate(cul, { format: 'd MMM y' }, parseDate);
                    expect(dateMatched(parseDate, result)).toBeTruthy();
                });
                it('custom time format "H : mm"', function () {
                    var result = getParsedDate(cul, { format: 'H : mm' }, parseDate);
                    result.setSeconds(parseDate.getSeconds());
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
                it('custom time format "H:mm:ss"', function () {
                    var result = getParsedDate(cul, { format: 'H:mm:ss' }, parseDate);
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
                it('custom time format "h:mm:ss a"', function () {
                    var result = getParsedDate(cul, { format: 'h:mm:ss a' }, parseDate);
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
            });
            describe('Addional format-' + cul, function () {
                var timeParse = new Date();
                beforeAll(function () {
                    timeParse.setHours(10);
                    timeParse.setMinutes(10);
                    timeParse.setSeconds(10);
                });
                beforeEach(function () {
                    parseDate = new Date();
                });
                it('skelton "d"', function () {
                    var result = getParsedDate(cul, { skeleton: 'd' }, parseDate);
                    expect(result.getDate()).toBe(parseDate.getDate());
                });
                it('skeleton "Ed"', function () {
                    var result = getParsedDate(cul, { skeleton: 'Ed' }, parseDate);
                    expect(result.getDate()).toBe(parseDate.getDate());
                });
                it('skeleton "Ehm"', function () {
                    var result = getParsedDate(cul, { skeleton: 'Ehm' }, timeParse);
                    result.setSeconds(10);
                    expect(timeParse.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "Ehms"', function () {
                    var result = getParsedDate(cul, { skeleton: 'Ehms' }, timeParse);
                    expect(timeParse.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "h"', function () {
                    var result = getParsedDate(cul, { skeleton: 'h' }, timeParse);
                    result.setMinutes(10);
                    result.setSeconds(10);
                    expect(timeParse.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "hms"', function () {
                    var result = getParsedDate(cul, { skeleton: 'hms' }, parseDate);
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "hm"', function () {
                    var hour12Date = new Date();
                    hour12Date.setHours(0, 20, 33);
                    var result = getParsedDate(cul, { skeleton: 'hm' }, hour12Date);
                    result.setSeconds(33);
                    expect(hour12Date.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "EHms"', function () {
                    var d = new Date();
                    var result = getParsedDate(cul, { skeleton: 'EHms' }, timeParse);
                    expect(timeParse.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "H"', function () {
                    var result = getParsedDate(cul, { skeleton: 'H' }, timeParse);
                    expect(result.getHours()).toBe(timeParse.getHours());
                });
                it('skeleton "Hm"', function () {
                    var result = getParsedDate(cul, { skeleton: 'Hm' }, timeParse);
                    result.setSeconds(10);
                    expect(timeParse.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "Hms"', function () {
                    var result = getParsedDate(cul, { skeleton: 'Hms' }, timeParse);
                    expect(timeParse.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "M"', function () {
                    var result = getParsedDate(cul, { skeleton: 'M' }, parseDate);
                    expect(parseDate.getMonth()).toBe(result.getMonth());
                });
                it('skeleton "Md"', function () {
                    var result = getParsedDate(cul, { skeleton: 'Md' }, parseDate);
                    expect(monthDayMatch(parseDate, result)).toBeTruthy();
                });
                it('skeleton "MEd"', function () {
                    var result = getParsedDate(cul, { skeleton: 'MEd' }, parseDate);
                    expect(monthDayMatch(parseDate, result)).toBeTruthy();
                });
                it('skeleton "MMM"', function () {
                    var result = getParsedDate(cul, { skeleton: 'MMM' }, parseDate);
                    expect(result.getMonth()).toBe(parseDate.getMonth());
                });
                it('skeleton "MMMd"', function () {
                    var result = getParsedDate(cul, { skeleton: 'MMMEd' }, parseDate);
                    expect(monthDayMatch(parseDate, result)).toBeTruthy();
                });
                it('skeleton "MEd"', function () {
                    var result = getParsedDate(cul, { skeleton: 'MMMMd' }, parseDate);
                    expect(monthDayMatch(parseDate, result)).toBeTruthy();
                });
                it('skeleton "ms"', function () {
                    var result = getParsedDate(cul, { skeleton: 'ms' }, parseDate);
                    result.setHours(parseDate.getHours());
                    expect(parseDate.toTimeString()).toBe(result.toTimeString());
                });
                it('skeleton "y"', function () {
                    var result = getParsedDate(cul, { skeleton: 'y' }, parseDate);
                    expect(result.getFullYear()).toBe(parseDate.getFullYear());
                });
                it('skeleton "yM"', function () {
                    var result = getParsedDate(cul, { skeleton: 'yM' }, parseDate);
                    result.setDate(parseDate.getDate());
                    expect(monthDayMatch(result, parseDate));
                });
                it('skeleton "yMd"', function () {
                    var result = getParsedDate(cul, { skeleton: 'yMd' }, parseDate);
                    expect(monthDayMatch(result, parseDate));
                });
                it('skeleton "yMEd"', function () {
                    var result = getParsedDate(cul, { skeleton: 'yMd' }, parseDate);
                    expect(monthDayMatch(result, parseDate));
                });
                it('skeleton "yMMM"', function () {
                    var result = getParsedDate(cul, { skeleton: 'yMMM' }, parseDate);
                    result.setDate(parseDate.getDate());
                    expect(monthDayMatch(result, parseDate));
                });
                it('skeleton "yMMMd"', function () {
                    var result = getParsedDate(cul, { skeleton: 'yMMMd' }, parseDate);
                    expect(monthDayMatch(result, parseDate));
                });
                it('skeleton "yMMMEd"', function () {
                    var result = getParsedDate(cul, { skeleton: 'yMMMEd' }, parseDate);
                    expect(monthDayMatch(result, parseDate));
                });
                it('skeleton "yMMMM"', function () {
                    var result = getParsedDate(cul, { skeleton: 'yMMMM' }, parseDate);
                    result.setDate(parseDate.getDate());
                    expect(monthDayMatch(result, parseDate));
                });
            });
        };
        for (var _i = 0, parseCultures_1 = parseCultures; _i < parseCultures_1.length; _i++) {
            var cul = parseCultures_1[_i];
            _loop_2(cul);
        }
        describe('date value set properly while date value is greater than 28', function () {
            var maxDate = new Date('1/30/2016');
            var maxDate2 = new Date('3/31/2017');
            it('max date value1', function () {
                var result = getParsedDate('en-US', { skeleton: 'full', type: 'dateTime' }, maxDate);
                expect(result.getDate()).toBe(maxDate.getDate());
                expect(result.getMonth()).toBe(maxDate.getMonth());
            });
            it('max date value2', function () {
                var result = getParsedDate('en-US', { skeleton: 'full', type: 'dateTime' }, maxDate2);
                expect(result.getDate()).toBe(maxDate2.getDate());
                expect(result.getMonth()).toBe(maxDate2.getMonth());
            });
        });
        describe('era format type check for "en"', function () {
            var eraDate;
            beforeEach(function () {
                eraDate = new Date('1/1/2015');
            });
            it('Gy', function () {
                var parser = date_parser_1.DateParser.dateParser('en', { skeleton: 'Gy' }, internationalization_1.cldrData);
                var result = parser('2015 AD');
                expect(result.getFullYear()).toBe(2015);
            });
            it('GyMMM', function () {
                var parser = date_parser_1.DateParser.dateParser('en', { skeleton: 'GyMMM' }, internationalization_1.cldrData);
                var result = parser('Jan 2015 AD');
                result.setDate(1);
                result.setHours(0, 0, 0, 0);
                expect(monthDayMatch(result, new Date('1/1/2015'))).toBeTruthy();
            });
            it('GyMMMd', function () {
                var parser = date_parser_1.DateParser.dateParser('en', { skeleton: 'GyMMMd' }, internationalization_1.cldrData);
                var result = parser('Jan 1, 2015 AD');
                result.setHours(0, 0, 0, 0);
                expect(monthDayMatch(result, eraDate)).toBeTruthy();
            });
            it('GyMMMED', function () {
                var parser = date_parser_1.DateParser.dateParser('en', { skeleton: 'GyMMMEd' }, internationalization_1.cldrData);
                var result = parser('Fri, Jan 1, 2015 AD');
                result.setHours(0, 0, 0, 0);
                expect(monthDayMatch(result, eraDate)).toBeTruthy();
            });
        });
        describe('dateTime Format with gmt ', function () {
            it('', function () {
                var str = getTimeZoneString();
                var parser = date_parser_1.DateParser.dateParser('en', { type: 'dateTime', skeleton: 'full' }, internationalization_1.cldrData);
                var result = parser('Saturday, November 12, 2016, 1:05:00 PM ' + str);
                expect(dateMatched(result, new Date('11/12/2016 13:05'))).toBeTruthy();
            });
            it('datetime with custom timeZone positive value', function () {
                var parser = date_parser_1.DateParser.dateParser('en', { type: 'dateTime', skeleton: 'full' }, internationalization_1.cldrData);
                var expected = new Date('11/12/2016 1:05:00 PM GMT+06:30');
                var result = parser('Saturday, November 12, 2016, 1:05:00 PM GMT+06:30');
                expect(dateMatched(expected, result)).toBeTruthy();
            });
            it('datetime with custom timeZone negative value', function () {
                var parser = date_parser_1.DateParser.dateParser('en', { type: 'dateTime', skeleton: 'full' }, internationalization_1.cldrData);
                var expected = new Date('11/12/2016 1:05:00 PM GMT-03:30');
                var result = parser('Saturday, November 12, 2016, 1:05:00 PM GMT-03:30');
                expect(dateMatched(expected, result)).toBeTruthy();
            });
            it('timezone with hour only format', function () {
                var parser = date_parser_1.DateParser.dateParser('dummy', { type: 'time', skeleton: 'full' }, internationalization_1.cldrData);
                parser('GMT+07');
            });
        });
        describe('DateParser with multiple months check works properly', function () {
            var _loop_3 = function (i) {
                it('parser for month ' + (i + 1), function () {
                    var date = new Date(2016, i, 2);
                    var result = getParsedDate('en-US', { skeleton: 'full', type: 'dateTime' }, date);
                    expect(result.toUTCString()).toBe(date.toUTCString());
                });
            };
            for (var i = 0; i <= 11; i++) {
                _loop_3(i);
            }
        });
        describe('era validation check', function () {
            it('eraNames ', function () {
                var parser = date_parser_1.DateParser.dateParser('dummy', { skeleton: 'G' }, internationalization_1.cldrData);
                expect(parser('2015 Anno Domini').getFullYear()).toBe(2015);
            });
            it('eraNarrow', function () {
                var parser = date_parser_1.DateParser.dateParser('dummy', { skeleton: 'GG' }, internationalization_1.cldrData);
                expect(parser('2012 A').getFullYear()).toBe(2012);
            });
        });
        describe('Invalid pattern throws error', function () {
            it('properly', function () {
                expect(function () { date_parser_1.DateParser.dateParser('en', { skeleton: 'invalid' }, internationalization_1.cldrData); }).toThrow();
            });
        });
        describe('Invalid parse value returns null', function () {
            it('', function () {
                var result = date_parser_1.DateParser.dateParser('en', { skeleton: 'H' }, internationalization_1.cldrData)('12 PM');
                expect(result).toBeNull();
            });
        });
        describe('functions', function () {
            var tvalue = 0;
            var tObject = {
                getTimezoneOffset: function () { return -330; },
                setMinutes: function (val) { tvalue = val; },
                getMinutes: function () { return 20; }
            };
            it('getZoneValue for positive value', function () {
                var res = date_parser_1.DateParser.getZoneValue(false, '2', '3', {
                    numberParseRegex: /0|1|2|3|4|5|6|7|8|9/g, numericPair: { 2: 2, 3: 3 }
                });
                expect(res).toBe(3);
            });
            it('getZoneValue for invalid number value', function () {
                var res = date_parser_1.DateParser.getZoneValue(false, '2', '3', {
                    numberParseRegex: /0|1|2|3|4|5|6|7|8|9/g, numericPair: { 2: 'a', 3: 'b' }
                });
                expect(res).toBeNull();
            });
            it('parserBase get Numbering system ', function () {
                expect(parser_base_1.ParserBase.getNumberingSystem({})).toBe(parser_base_1.ParserBase.numberingSystems);
            });
            it('parserBase get Numbering system with no digits', function () {
                var result = parser_base_1.ParserBase.getCurrentNumericOptions({
                    numbers: { 'defaultNumberingSystem': 'latn' }
                }, { latn: {} });
                expect(result.symbolNumberSystem).toBe(undefined);
                expect(result.numericPair).toBe(undefined);
                expect(result.numberParseRegex).toBe(undefined);
            });
            it('parserBase get Numbering system with no defaultnumbering system', function () {
                var result = parser_base_1.ParserBase.getCurrentNumericOptions({}, {});
                expect(result.symbolNumberSystem).toBe(undefined);
                expect(result.numericPair).toBe(undefined);
                expect(result.numberParseRegex).toBe(undefined);
            });
            describe('timezone processing ', function () {
                it('while timezone values are equal', function () {
                    var ret = date_parser_1.DateParser.getDateObject({ timeZone: -330 }, tObject);
                    expect(tvalue).toBe(0);
                });
                it('while timezone values are equal', function () {
                    var ret = date_parser_1.DateParser.getDateObject({ timeZone: -300 }, tObject);
                    expect(tvalue).toBe(50);
                });
            });
            describe('Invalid date and month processing', function () {
                it('Invalid month returns invalid date object with maximum value', function () {
                    var result = date_parser_1.DateParser.dateParser('en', { skeleton: 'short', type: 'date' }, internationalization_1.cldrData)('14/13/17');
                    expect(result.toString()).toBe('Invalid Date');
                });
                it('Invalid month returns invalid date object with min  value', function () {
                    var result = date_parser_1.DateParser.dateParser('en', { skeleton: 'short', type: 'date' }, internationalization_1.cldrData)('0/13/17');
                    expect(result.toString()).toBe('Invalid Date');
                });
                it('Invalid day returns invalid date object max value ', function () {
                    var result = date_parser_1.DateParser.dateParser('en', { skeleton: 'short', type: 'date' }, internationalization_1.cldrData)('1/33/17');
                    expect(result.toString()).toBe('Invalid Date');
                });
                it('Invalid day returns invalid date object min value', function () {
                    var result = date_parser_1.DateParser.dateParser('en', { skeleton: 'short', type: 'date' }, internationalization_1.cldrData)('1/0/17');
                    expect(result.toString()).toBe('Invalid Date');
                });
            });
            it('internalDateParser timzone processing hour an month format', function () {
                var ret = date_parser_1.DateParser.internalDateParse('Saturday, November 12, 2016, 1:05:00 PM GMT+05:30', {
                    designator: { PM: 'pm' },
                    evalposition: {
                        day: { isNumber: true, pos: 6 },
                        designator: { pos: 19 },
                        hour: { isNumber: true, pos: 13 },
                        minute: { isNumber: true, pos: 15 },
                        month: { pos: 4 },
                        second: { isNumber: true, pos: 17 },
                        timeZone: { hourOnly: false, pos: 21 },
                        year: { isNumber: true, pos: 9 },
                    },
                    month: {
                        November: "11"
                    },
                    parserRegex: /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(.)?(.)?(January|February|March|April|May|June|July|August|September|October|November|December)(.)?([0-9][0-9]?)(.)?(.)?([0-9]+)(.)?(at)?(.)?([0-9][0-9]?)(.)?([0-9][0-9])(.)?([0-9][0-9])(.)?(AM|PM)(.)?(GMT\+(([0-9])([0-9])):(([0-9])([0-9]))|GMT-(([0-9])([0-9])):(([0-9])([0-9]))|GMT)?$/,
                    timeZone: {
                        gmtFormat: "GMT{0}",
                        gmtZeroFormat: "GMT",
                        hourFormat: "+HH:mm;-HH:mm"
                    }
                }, { "numericPair": { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9 }, "numberParseRegex": /0|1|2|3|4|5|6|7|8|9/g, "numericRegex": "[0-9]" });
                expect(ret.timeZone).toBe(-330);
            });
            it('internalDateParser timzone processing hour only', function () {
                var ret = date_parser_1.DateParser.internalDateParse("November 4, 2016 at 2:30:22 PM GMT+5", {
                    designator: { PM: 'pm' },
                    evalposition: {
                        "month": { "pos": 1 },
                        "day": { "isNumber": true, "pos": 3 },
                        "year": { "isNumber": true, "pos": 6 },
                        "hour": { "isNumber": true, "pos": 10 },
                        "minute": { "isNumber": true, "pos": 12 },
                        "second": { "isNumber": true, "pos": 14 },
                        "designator": { "pos": 16 },
                        "timeZone": { "pos": 18, "hourOnly": true }
                    },
                    month: {
                        November: "11"
                    },
                    parserRegex: /^(January|February|March|April|May|June|July|August|September|October|November|December)(.)?([0-9][0-9]?)(.)?(.)?([0-9]+)(.)?(at)?(.)?([0-9][0-9]?)(.)?([0-9][0-9])(.)?([0-9][0-9])(.)?(AM|PM)(.)?(GMT\+(([0-9])([0-9])?)|GMT-(([0-9])([0-9])?)|GMT)?$/,
                    timeZone: {
                        gmtFormat: "GMT{0}",
                        gmtZeroFormat: "GMT",
                        hourFormat: "+HH:mm;-HH:mm"
                    }
                }, {
                    "numericPair": { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9 }, "numberParseRegex": /0|1|2|3|4|5|6|7|8|9/g, "numericRegex": "[0-9]"
                });
                expect(ret.timeZone).toBe(-300);
            });
        });
    });
});
