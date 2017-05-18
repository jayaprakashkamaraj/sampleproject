define(["require", "exports", "../../src/Internationalization/date-formatter", "../../src/Internationalization/date-parser", "./date-parser.spec", "../../src/internationalization", "../../src/Internationalization/parser-base"], function (require, exports, date_formatter_1, date_parser_1, date_parser_spec_1, internationalization_1, parser_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    date_parser_spec_1.loadCultureFiles('', true);
    date_parser_spec_1.loadCultureFiles('ar-QA');
    date_parser_spec_1.loadCultureFiles('ja');
    date_parser_spec_1.loadCultureFiles('da');
    internationalization_1.loadCldr(date_parser_spec_1.dupCulObject, {});
    var parseCultures = ['en', 'ar-QA', 'ja'];
    function getTimeZoneString(date, ishour) {
        var off = date.getTimezoneOffset();
        if (off !== 0) {
            return date_formatter_1.DateFormat.getTimeZoneValue(date.getTimezoneOffset(), ishour ? '+H;-H' : '+HH:mm;-HH:mm');
        }
        else {
            return '';
        }
    }
    var expectOut = {
        'en': {
            s: '11/4/16, 2:30 PM',
            m: 'Nov 4, 2016, 2:30:22 PM',
            l: 'November 4, 2016 at 2:30:22 PM',
            f: 'Friday, November 4, 2016 at 2:30:22 PM',
        },
        'ar-QA': {
            s: '٤‏/١١‏/٢٠١٦ ٢:٣٠ م',
            m: '٠٤‏/١١‏/٢٠١٦ ٢:٣٠:٢٢ م',
        },
        'ja': {
            s: '2016/11/04 14:30',
            m: '2016/11/04 14:30:22'
        }
    };
    var strRep = ['s', 'm', 'l', 'f',];
    var expOut = {
        'en': {
            0: '11/4/2016',
            1: 'Nov 04,2016',
            2: 'November 04',
            3: '04 Nov 2016',
            4: '04 November',
            5: '04/11/2016',
            6: 'Nov 04',
            7: 'November 2016 AD',
            8: '4/11/2016',
            9: 'Nov-2016',
            10: '04-November',
            11: 'Nov 4/2016',
            12: '4-Nov-2016 AD',
            13: 'November 4,2016 AD',
            14: 'Fri 4-11-2016',
            15: 'Fri Nov 4/2016 AD',
            16: 'Friday 4 11 2016',
            17: 'November 4,2016 Friday',
            18: 'Friday 4-Nov-2016',
            19: 'November,2016',
            20: 'November 4',
            21: '4 Nov 2016',
            22: '2 : 30',
            23: '2:30:22',
            24: '2:30:22 PM'
        },
        'ar-QA': {
            0: '١١/٤/٢٠١٦',
            1: 'نوفمبر ٠٤,٢٠١٦',
            2: 'نوفمبر ٠٤',
            3: '٠٤ نوفمبر ٢٠١٦',
            4: '٠٤ نوفمبر',
            5: '٠٤/١١/٢٠١٦',
            6: 'نوفمبر ٠٤',
            7: 'نوفمبر ٢٠١٦ م',
            8: '٤/١١/٢٠١٦',
            9: 'نوفمبر-٢٠١٦',
            10: '٠٤-نوفمبر',
            11: 'نوفمبر ٤/٢٠١٦',
            12: '٤-نوفمبر-٢٠١٦ م',
            13: 'نوفمبر ٤,٢٠١٦ م',
            14: 'الجمعة ٤-١١-٢٠١٦',
            15: 'الجمعة نوفمبر ٤/٢٠١٦ م',
            16: 'الجمعة ٤ ١١ ٢٠١٦',
            17: 'نوفمبر ٤,٢٠١٦ الجمعة',
            18: 'الجمعة ٤-نوفمبر-٢٠١٦',
            19: 'نوفمبر,٢٠١٦',
            20: 'نوفمبر ٤',
            21: '٤ نوفمبر ٢٠١٦',
            22: '٢ : ٣٠',
            23: '٢:٣٠:٢٢',
            24: '٢:٣٠:٢٢ م'
        },
        'ja': {
            0: '11/4/2016',
            1: '11月 04,2016',
            2: '11月 04',
            3: '04 11月 2016',
            4: '04 11月',
            5: '04/11/2016',
            6: '11月 04',
            7: '11月 2016 西暦',
            8: '4/11/2016',
            9: '11月-2016',
            10: '04-11月',
            11: '11月 4/2016',
            12: '4-11月-2016 西暦',
            13: '11月 4,2016 西暦',
            14: '金 4-11-2016',
            15: '金 11月 4/2016 西暦',
            16: '金曜日 4 11 2016',
            17: '11月 4,2016 金曜日',
            18: '金曜日 4-11月-2016',
            19: '11月,2016',
            20: '11月 4',
            21: '4 11月 2016',
            22: '2 : 30',
            23: '2:30:22',
            24: '2:30:22 午後'
        }
    };
    describe('dateformat', function () {
        var formatInstance = new date_formatter_1.DateFormat();
        var formatter;
        var result;
        var date = new Date('11/4/2016 14:30:22');
        describe('Date Type formatting', function () {
            it('short date format converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { type: 'date', skeleton: 'short' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('11/4/16');
            });
            it('Medium date format converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { type: 'date', skeleton: 'medium' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Nov 4, 2016');
            });
            it('Long date format converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { type: 'date', skeleton: 'long' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('November 4, 2016');
            });
            it('Full date format converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { type: 'date', skeleton: 'full' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Friday, November 4, 2016');
            });
            it('short date Format with no type specified ', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { skeleton: 'short' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('11/4/16');
            });
        });
        describe('Time Type formatting', function () {
            it('short time format converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { type: 'time', skeleton: 'short' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2:30 PM');
            });
            it('Medium time format converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { type: 'time', skeleton: 'medium' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2:30:22 PM');
            });
            it('Long time format converts properly with UTC', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { type: 'time', skeleton: 'long' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2:30:22 PM GMT' + getTimeZoneString(date, true));
            });
            it('Full time format converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-Us', { type: 'time', skeleton: 'full' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2:30:22 PM GMT' + getTimeZoneString(date));
            });
        });
        describe('check if empty string converts to single quotes in custom format ', function () {
            it('empty string at end', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en', { format: 'h : mm \'\' ' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2 : 30 \' ');
            });
            it('empty string at front', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en', { format: ' \'\' h : mm' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe(' \' 2 : 30');
            });
            it('empty string at middle', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en', { format: 'h \'\' mm' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2 \' 30');
            });
            it('string', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en', { format: '\'Time: \'h:mm' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Time: 2:30');
            });
        });
        describe('check culture specific time seperator works properly', function () {
            it('for culture "da"', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('da', { format: 'h : mm' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2 . 30');
            });
        });
        parseCultures.forEach(function (culName) {
            var locRes = expOut[culName];
            describe('Custom date time formatting', function () {
                it('custom date format "M/d/y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'M/d/y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[0]);
                });
                it('custom date format "MMM dd,y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMM dd,y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[1]);
                });
                it('custom date format "MMMM dd" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMMM dd' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[2]);
                });
                it('custom date format "dd MMM y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'dd MMM y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[3]);
                });
                it('custom date format "dd MMMM" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'dd MMMM' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[4]);
                });
                it('custom date format "dd/MM/y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'dd/MM/y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[5]);
                });
                it('custom date format "MMM dd" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMM dd' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[6]);
                });
                it('custom date format "MMMM y GG" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMMM y GG' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[7]);
                });
                it('custom date format "d/M/y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'd/M/y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[8]);
                });
                it('custom date format "MMM-y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMM-y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[9]);
                });
                it('custom date format "dd-MMMM" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'dd-MMMM' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[10]);
                });
                it('custom date format "MMM d/y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMM d/y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[11]);
                });
                it('custom date format "d-MMM-y GG" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'd-MMM-y GG' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[12]);
                });
                it('custom date format "MMMM d,y GG" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMMM d,y GG' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[13]);
                });
                it('custom date format "E d-M-y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'E d-M-y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[14]);
                });
                it('custom date format "E MMM d/y GG" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'E MMM d/y GG' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[15]);
                });
                it('custom date format "EEEE d MM y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'EEEE d MM y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[16]);
                });
                it('custom date format "MMMM d,y EEEE" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMMM d,y EEEE' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[17]);
                });
                it('custom date format "EEEE d-MMM-y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'EEEE d-MMM-y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[18]);
                });
                it('custom date format "MMMM,y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMMM,y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[19]);
                });
                it('custom date format "MMMM d" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'MMMM d' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[20]);
                });
                it('custom date format "d MMM y" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'd MMM y' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[21]);
                });
                it('custom time format "h : mm" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'h : mm' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[22]);
                });
                it('custom time format "h:mm:ss" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'h:mm:ss' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[23]);
                });
                it('custom time format "h:mm:ss a" converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: 'h:mm:ss a' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(locRes[24]);
                });
                it('custom time format "qop" returns same', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { format: "qop" }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe('qop');
                });
            });
        });
        parseCultures.forEach(function (culName) {
            var localRes = expectOut[culName];
            describe('Date Time Type formatting for ' + culName, function () {
                it('short Date time format converts properly', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { type: 'dateTime', skeleton: 'short' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(localRes[strRep[0]]);
                });
                it('Medium Date time format for ' + culName, function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { type: 'dateTime', skeleton: 'medium' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe(localRes[strRep[1]]);
                });
                it('Long Datetime format for ' + culName, function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { type: 'dateTime', skeleton: 'long' }, internationalization_1.cldrData);
                    var reDate = date_parser_1.DateParser.dateParser(culName, { type: 'dateTime', skeleton: 'long' }, internationalization_1.cldrData)(formatter(date));
                    expect(date_parser_spec_1.dateMatched(reDate, date)).toBe(true);
                });
                it('Full Datetime format for ' + culName, function () {
                    formatter = date_formatter_1.DateFormat.dateFormat(culName, { type: 'dateTime', skeleton: 'full' }, internationalization_1.cldrData);
                    var reDate = date_parser_1.DateParser.dateParser(culName, { type: 'dateTime', skeleton: 'full' }, internationalization_1.cldrData)(formatter(date));
                    expect(date_parser_spec_1.dateMatched(reDate, date)).toBe(true);
                });
            });
        });
        describe('era validation check', function () {
            it('eraNames ', function () {
                var formater = date_formatter_1.DateFormat.dateFormat('dummy', { skeleton: 'G' }, internationalization_1.cldrData);
                expect(formater(date)).toBe('2016 Anno Domini');
            });
            it('eraNarrow', function () {
                var formater = date_formatter_1.DateFormat.dateFormat('dummy', { skeleton: 'GG' }, internationalization_1.cldrData);
                expect(formater(date)).toBe('2016 A');
            });
        });
        describe('Addiitonal skeletons', function () {
            var date1 = new Date('1/14/2000 4:3:2');
            describe('checks day of month', function () {
                describe(' skeleton "d" numeric type', function () {
                    beforeAll(function () {
                        formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'd' }, internationalization_1.cldrData);
                    });
                    it('using single digit day', function () {
                        expect(formatter(date)).toBe('4');
                    });
                    it('using two digit day', function () {
                        expect(formatter(date1)).toBe('14');
                    });
                });
            });
            describe('checks month of year', function () {
                describe(' skeleton "M" numeric type', function () {
                    beforeAll(function () {
                        formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'M' }, internationalization_1.cldrData);
                    });
                    it('using single digit day', function () {
                        expect(formatter(date1)).toBe('1');
                    });
                    it('using two digit day', function () {
                        expect(formatter(date)).toBe('11');
                    });
                });
                it('skeleton "MMM"   short form ', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'MMM' }, internationalization_1.cldrData);
                    expect(formatter(date)).toBe('Nov');
                    expect(formatter(date1)).toBe('Jan');
                });
            });
            describe('checks weekday of week', function () {
                it('skelton "E" short form', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'E' }, internationalization_1.cldrData);
                    result = formatter(date);
                    expect(result).toBe('Fri');
                });
            });
            describe('checks year', function () {
                it('skeleton "y" numeric type', function () {
                    formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'y' }, internationalization_1.cldrData);
                    expect(formatter(date)).toBe('2016');
                    expect(formatter(date1)).toBe('2000');
                    expect(formatter(new Date('1/4/20150'))).toBe('20150');
                });
            });
            it('Pattern "EHm" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'EHm' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri 14:30');
            });
            it('Pattern "EHms" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'EHms' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri 14:30:22');
            });
            it('Pattern "Ed" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'Ed' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('4 Fri');
            });
            it('Pattern "H" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'H' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('14');
            });
            it('Pattern "h" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'h' }, internationalization_1.cldrData);
                result = formatter(new Date('11/4/2016 10:30:22'));
                expect(result).toBe('10 AM');
            });
            it('Pattern "Hms" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'Hms' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('14:30:22');
            });
            it('Pattern "Hm" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'Hm' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('14:30');
            });
            it('Pattern "hm" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'hm' }, internationalization_1.cldrData);
                result = formatter(new Date('11/4/2016 12:30:22'));
                expect(result).toBe('12:30 PM');
            });
            it('Pattern "hms" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'hms' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2:30:22 PM');
            });
            it('Pattern "ms" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'ms' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('30:22');
            });
            it('Pattern "MEd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'MEd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri, 11/4');
            });
            it('Pattern "MMEd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'MMMEd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri, Nov 4');
            });
            it('Pattern "Md" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'Md' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('11/4');
            });
            it('Pattern "yM" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yM' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('11/2016');
            });
            it('Pattern "yMEd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yMEd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri, 11/4/2016');
            });
            it('Pattern "yMMM" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yMMM' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Nov 2016');
            });
            it('Pattern "yMMMEd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yMMMEd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri, Nov 4, 2016');
            });
            it('Pattern "yMMMd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yMMMd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Nov 4, 2016');
            });
            it('Pattern "yMd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yMd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('11/4/2016');
            });
            it('Pattern "Ehms" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'Ehms' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri 2:30:22 PM');
            });
            it('Pattern "y" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'y' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2016');
            });
            it('Pattern "yMMM" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yMMM' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Nov 2016');
            });
            it('Pattern "yMMMEd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yMMMEd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri, Nov 4, 2016');
            });
            it('Pattern "yMMMd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'yMMMd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Nov 4, 2016');
            });
            it('Pattern "Gy" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'Gy' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('2016 AD');
            });
            it('Pattern "GyMMM" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'GyMMM' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Nov 2016 AD');
            });
            it('Pattern "GyMMMd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'GyMMMd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Nov 4, 2016 AD');
            });
            it('Pattern "GyMMMEd" converts properly', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'GyMMMEd' }, internationalization_1.cldrData);
                result = formatter(date);
                expect(result).toBe('Fri, Nov 4, 2016 AD');
            });
        });
        describe('Invalid inputs', function () {
            it('invalid date returns null value', function () {
                formatter = date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'GyMMMEd' }, internationalization_1.cldrData);
                expect(formatter(new Date('test'))).toBeNull();
            });
            it('invalid pattern', function () {
                expect(function () { date_formatter_1.DateFormat.dateFormat('en-US', { skeleton: 'ss' }, internationalization_1.cldrData); }).toThrow();
            });
        });
        describe('function', function () {
            it('getTimeZoneValue', function () {
                expect(date_formatter_1.DateFormat.getTimeZoneValue(-330, '+HH:mm;-HH:mm')).toBe('+05:30');
                expect(date_formatter_1.DateFormat.getTimeZoneValue(330, '+H;-H')).toBe('-5');
            });
            it('parserBase get Numbering system with no digits', function () {
                var result = parser_base_1.ParserBase.getNumberMapper({
                    numbers: { 'defaultNumberingSystem': 'latn' }
                }, { latn: {} });
                expect(result.symbolNumberSystem).toBe(undefined);
                expect(result.numericPair).toBe(undefined);
                expect(result.numberParseRegex).toBe(undefined);
            });
            it('parserBase get Numbering system with no defaultnumbering system', function () {
                var result = parser_base_1.ParserBase.getNumberMapper({}, {});
                expect(result.symbolNumberSystem).toBe(undefined);
                expect(result.numericPair).toBe(undefined);
                expect(result.numberParseRegex).toBe(undefined);
            });
        });
    });
});
