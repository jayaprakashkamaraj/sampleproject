define(["require", "exports", "../../src/internationalization", "../../src/Internationalization/number-formatter", "../../src/Internationalization/intl-base", "./date-parser.spec", "../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, internationalization_1, number_formatter_1, intl_base_1, date_parser_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var numberFormat = new number_formatter_1.NumberFormat();
    date_parser_spec_1.loadCultureFiles('', true);
    date_parser_spec_1.loadCultureFiles('ar-QA');
    date_parser_spec_1.loadCultureFiles('ja');
    date_parser_spec_1.loadCultureFiles('de');
    describe('Number formatter', function () {
        var formatter;
        var result;
        var intValue = 1324342;
        var fracValue = 2345634.342534;
        var smallValue = 12.34;
        var negValue = -1234.34756;
        var zero = 0;
        var twodigitno = 17;
        var maxFractionDigits = 6785432.65456564211235789463;
        var expectedResult = {
            'en': {
                n: {
                    0: '1,324,342',
                    1: '1,324,342.000',
                    2: '2,345,634.343',
                    3: '1,324,342.00',
                    4: '2,345,634.343',
                    5: '2,345,634.34253',
                    6: '1,324,342.0000',
                    7: '6785433',
                    8: '6,785,432.654565642',
                    9: '6,785,432.654565642',
                    10: '6,785,432.65456564200000000000',
                    11: '6,785,432.65456564200000000000',
                    12: '1,324,342.000',
                    13: '2,345,634.3425',
                    14: '1,300,000',
                    15: '2,300,000',
                    16: '1,324,340',
                    17: '2,345,630',
                    18: '17.00',
                    19: '1,324,342',
                    20: '2,345,634.343',
                    21: '00,017',
                    22: '1,324,342',
                    23: '2,345,634.342534',
                    24: '17.0',
                    25: '1,324,300',
                    26: '2,345,600',
                    27: '17.0'
                },
                p: {
                    0: '132,434,200%',
                    1: '132,434,200.000%',
                    2: '234,563,434%',
                    3: '132,434,200.00%',
                    4: '234,563,434.25%',
                    5: '234,563,434.2534%',
                    6: '132,434,200.0000%',
                    7: '678543265%',
                    8: '678,543,265.4565642%',
                    9: '678,543,265.4565642%',
                    10: '678,543,265.45656420000000000000%',
                    11: '678,543,265.45656420000000000000%',
                    12: '132,434,200.0%',
                    13: '234,563,434.25339998%',
                    14: '234,563,434.25%',
                    15: '130,000,000%',
                    16: '230,000,000%',
                    17: '132,434,000%',
                    18: '234,563,000%',
                    19: '1,700%',
                    20: '132,434,200%',
                    21: '234,563,434%',
                    22: '01,700%',
                    23: '132,434,200.0000%',
                    24: '234,563,434.2534%',
                    25: '01,700.0000%',
                    26: '132,430,000%',
                    27: '234,560,000%',
                    28: '1,700%',
                },
                c: {
                    0: '$1,324,342.00',
                    1: '$1,324,342.000',
                    2: '$2,345,634.34',
                    3: '$1,324,342.00',
                    4: '$2,345,634.34',
                    5: '$2,345,634.34253',
                    6: '$1,324,342.0000',
                    7: '$6785432.65',
                    9: '$6,785,432.654565642',
                    10: '$6,785,432.65456564200000000000',
                    11: '$6,785,432.65456564200000000000',
                    12: '$1,324,342.000',
                    13: '$2,345,634.3425',
                    14: '$1,300,000',
                    15: '$2,300,000',
                    16: '$1,324,340',
                    17: '$2,345,630',
                    18: '$17.00',
                    19: '$1,324,342.00',
                    20: '$2,345,634.34',
                    21: '$00,017.00',
                    22: '$1,324,342.0000',
                    23: '$2,345,634.34253',
                    24: '$00,017.0000',
                    25: '$1,324,300',
                    26: '$2,345,600',
                    27: '$17.0'
                }
            },
            'ar-QA': {
                n: {
                    0: '١٬٣٢٤٬٣٤٢',
                    1: '١٬٣٢٤٬٣٤٢٫٠٠٠',
                    2: '٢٬٣٤٥٬٦٣٤٫٣٤٣',
                    3: '١٬٣٢٤٬٣٤٢٫٠٠',
                    4: '٢٬٣٤٥٬٦٣٤٫٣٤٣',
                    5: '٢٬٣٤٥٬٦٣٤٫٣٤٢٥٣',
                    6: '١٬٣٢٤٬٣٤٢٫٠٠٠٠',
                    7: '٦٧٨٥٤٣٣',
                    8: '٦٬٧٨٥٬٤٣٢٫٦٥٤٥٦٥٦٤٢',
                    9: '٦٬٧٨٥٬٤٣٢٫٦٥٤٥٦٥٦٤٢',
                    10: '٦٬٧٨٥٬٤٣٢٫٦٥٤٥٦٥٦٤٢٠٠٠٠٠٠٠٠٠٠٠',
                    11: '٦٬٧٨٥٬٤٣٢٫٦٥٤٥٦٥٦٤٢٠٠٠٠٠٠٠٠٠٠٠',
                    12: '١٬٣٢٤٬٣٤٢٫٠٠٠',
                    13: '٢٬٣٤٥٬٦٣٤٫٣٤٢٥',
                    14: '١٬٣٠٠٬٠٠٠',
                    15: '٢٬٣٠٠٬٠٠٠',
                    16: '١٬٣٢٤٬٣٤٠',
                    17: '٢٬٣٤٥٬٦٣٠',
                    18: '١٧٫٠٠',
                    19: '١٬٣٢٤٬٣٤٢',
                    20: '٢٬٣٤٥٬٦٣٤٫٣٤٣',
                    21: '٠٠٬٠١٧',
                    22: '١٬٣٢٤٬٣٤٢',
                    23: '٢٬٣٤٥٬٦٣٤٫٣٤٢٥٣٤',
                    24: '١٧٫٠',
                    25: '١٬٣٢٤٬٣٠٠',
                    26: '٢٬٣٤٥٬٦٠٠',
                    27: '١٧٫٠'
                },
                p: {
                    0: '١٣٢٬٤٣٤٬٢٠٠ %',
                    1: '١٣٢٬٤٣٤٬٢٠٠٫٠٠٠ %',
                    2: '٢٣٤٬٥٦٣٬٤٣٤ %',
                    3: '١٣٢٬٤٣٤٬٢٠٠٫٠٠ %',
                    4: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥ %',
                    5: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥٣٤ %',
                    6: '١٣٢٬٤٣٤٬٢٠٠٫٠٠٠٠ %',
                    7: '٦٧٨٥٤٣٢٦٥ %',
                    8: '٦٧٨٬٥٤٣٬٢٦٥٫٤٥٦٥٦٤‏٪',
                    9: '٦٧٨٬٥٤٣٬٢٦٥٫٤٥٦٥٦٤٢ %',
                    10: '٦٧٨٬٥٤٣٬٢٦٥٫٤٥٦٥٦٤٠٠٠٠٠٠٠٠٠٠٠٠٠٠‏٪',
                    11: '٦٧٨٬٥٤٣٬٢٦٥٫٤٥٦٥٦٤٢٠٠٠٠٠٠٠٠٠٠٠٠٠ %',
                    12: '١٣٢٬٤٣٤٬٢٠٠٫٠ %',
                    13: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥٣٣٩٩٩٨٪',
                    14: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥ %',
                    15: '١٣٠٬٠٠٠٬٠٠٠ %',
                    16: '٢٣٠٬٠٠٠٬٠٠٠ %',
                    17: '١٣٢٬٤٣٤٬٠٠٠ %',
                    18: '٢٣٤٬٥٦٣٬٠٠٠ %',
                    19: '١٬٧٠٠ %',
                    20: '١٣٢٬٤٣٤٬٢٠٠ %',
                    21: '٢٣٤٬٥٦٣٬٤٣٤ %',
                    22: '٠١٬٧٠٠ %',
                    23: '١٣٢٬٤٣٤٬٢٠٠٫٠٠٠٠ %',
                    24: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥٣٤ %',
                    25: '٠١٬٧٠٠٫٠٠٠٠ %',
                    26: '١٣٢٬٤٣٠٬٠٠٠ %',
                    27: '٢٣٤٬٥٦٠٬٠٠٠ %',
                    28: '١٬٧٠٠ %',
                },
                pj: {
                    0: '١٣٢٬٤٣٤٬٢٠٠٪',
                    1: '١٣٢٬٤٣٤٬٢٠٠٫٠٠٠٪',
                    2: '٢٣٤٬٥٦٣٬٤٣٤٪',
                    3: '١٣٢٬٤٣٤٬٢٠٠٫٠٠٪',
                    4: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥٪',
                    5: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥٣٤٪',
                    6: '١٣٢٬٤٣٤٬٢٠٠٫٠٠٠٠٪',
                    7: '٦٧٨٥٤٣٢٦٥٪',
                    8: '٦٧٨٬٥٤٣٬٢٦٥٫٤٥٦٥٦٤٢٪',
                    9: '٦٧٨٬٥٤٣٬٢٦٥٫٤٥٦٥٦٤٪',
                    10: '٦٧٨٬٥٤٣٬٢٦٥٫٤٥٦٥٦٤٢٠٠٠٠٠٠٠٠٠٠٠٠٠٪',
                    11: '٦٧٨٬٥٤٣٬٢٦٥٫٤٥٦٥٦٤٠٠٠٠٠٠٠٠٠٠٠٠٠٠٪',
                    12: '١٣٢٬٤٣٤٬٢٠٠٫٠٪',
                    13: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥٣٣٩٩٩٨٪',
                    14: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥٣٤٪',
                    15: '١٣٠٬٠٠٠٬٠٠٠٪',
                    16: '٢٣٠٬٠٠٠٬٠٠٠٪',
                    17: '١٣٢٬٤٣٤٬٠٠٠٪',
                    18: '٢٣٤٬٥٦٣٬٠٠٠٪',
                    19: '١٬٧٠٠٪',
                    20: '١٣٢٬٤٣٤٬٢٠٠٪',
                    21: '٢٣٤٬٥٦٣٬٤٣٤٪',
                    22: '٠١٬٧٠٠٪',
                    23: '١٣٢٬٤٣٤٬٢٠٠٫٠٠٠٠٪',
                    24: '٢٣٤٬٥٦٣٬٤٣٤٫٢٥٣٤٪',
                    25: '٠١٬٧٠٠٫٠٠٠٠٪',
                    26: '١٣٢٬٤٣٠٬٠٠٠٪',
                    27: '٢٣٤٬٥٦٠٬٠٠٠٪',
                    28: '١٬٧٠٠٪',
                },
                c: {
                    0: '١٬٣٢٤٬٣٤٢٫٠٠ ر.ق.‏',
                    1: '١٬٣٢٤٬٣٤٢٫٠٠٠ ر.ق.‏',
                    2: '٢٬٣٤٥٬٦٣٤٫٣٤ ر.ق.‏',
                    3: '١٬٣٢٤٬٣٤٢٫٠٠ ر.ق.‏',
                    4: '٢٬٣٤٥٬٦٣٤٫٣٤ ر.ق.‏',
                    5: '٢٬٣٤٥٬٦٣٤٫٣٤٢٥٣ ر.ق.‏',
                    6: '١٬٣٢٤٬٣٤٢٫٠٠٠٠ ر.ق.‏',
                    7: '٦٧٨٥٤٣٢٫٦٥ ر.ق.‏',
                    9: '٦٬٧٨٥٬٤٣٢٫٦٥٤٥٦٥٦٤٢ ر.ق.‏',
                    10: 'ر.ق.‏ ٦٬٧٨٥٬٤٣٢٫٦٥٤٥٦٥٦٤٢٠٠٠٠٠٠٠٠٠٠٠',
                    11: '٦٬٧٨٥٬٤٣٢٫٦٥٤٥٦٥٦٤٢٠٠٠٠٠٠٠٠٠٠٠ ر.ق.‏',
                    12: '١٬٣٢٤٬٣٤٢٫٠٠٠ ر.ق.‏',
                    13: '٢٬٣٤٥٬٦٣٤٫٣٤٢٥ ر.ق.‏',
                    14: '١٬٣٠٠٬٠٠٠ ر.ق.‏',
                    15: '٢٬٣٠٠٬٠٠٠ ر.ق.‏',
                    16: '١٬٣٢٤٬٣٤٠ ر.ق.‏',
                    17: '٢٬٣٤٥٬٦٣٠ ر.ق.‏',
                    18: '١٧٫٠٠ ر.ق.‏',
                    19: '١٬٣٢٤٬٣٤٢٫٠٠ ر.ق.‏',
                    20: '٢٬٣٤٥٬٦٣٤٫٣٤ ر.ق.‏',
                    21: '٠٠٬٠١٧٫٠٠ ر.ق.‏',
                    22: '١٬٣٢٤٬٣٤٢٫٠٠٠٠ ر.ق.‏',
                    23: '٢٬٣٤٥٬٦٣٤٫٣٤٢٥٣ ر.ق.‏',
                    24: '٠٠٬٠١٧٫٠٠٠٠ ر.ق.‏',
                    25: '١٬٣٢٤٬٣٠٠ ر.ق.‏',
                    26: '٢٬٣٤٥٬٦٠٠ ر.ق.‏',
                    27: '١٧٫٠ ر.ق.‏'
                }
            }
        };
        var cusResult = {
            'en': {
                0: '2,345,634.343',
                1: '2345634.343',
                2: '2345634',
                3: '002345634.3425340',
                4: '$2345634',
                5: '$ 2345634.34',
                6: '2345634$',
                7: '2345634.343 $',
                8: '234563434.25%',
                9: '234563434.25 %',
                10: '%234563434',
                11: '% 234563434.25',
                12: '$ $ 2345634',
                13: '$ 2345634  $ ',
                14: '2345634.34 $  $  ',
                15: '2345634.34  $  ',
                16: '  $  2345634.343',
                17: ' 2345634  $%  ',
                18.1: '2345634.34',
                18.2: '1234.3',
                18.3: '0.0000000',
                19.1: '$ 2345634.34',
                19.2: '-1234.34756',
                19.3: '0.00',
                20.1: '234563434.25%',
                20.2: '$-1234.3476',
                20.3: '0.00',
                21.1: '2345634.343 $',
                21.2: '$1234.35$',
                21.3: '0',
                22.1: '%234563434.25',
                22.2: '%1234.35$',
                22.3: '0.0',
                23.1: '2,345,634',
                23.2: '$0,001,234.35',
                23.3: '0.00',
                24.1: '2,345,634.343',
                24.2: '-123434.76%',
                24.3: '0.00$',
                25.1: '$2345634.34',
                25.2: '$0.00',
                26: '12',
                27: '2345634.343',
                28: '-1,234'
            },
            'ar-QA': {
                0: '٢٬٣٤٥٬٦٣٤٫٣٤٣',
                1: '٢٣٤٥٦٣٤٫٣٤٣',
                2: '٢٣٤٥٦٣٤',
                3: '٠٠٢٣٤٥٦٣٤٫٣٤٢٥٣٤٠',
                4: 'ر.ق.‏٢٣٤٥٦٣٤',
                5: 'ر.ق.‏ ٢٣٤٥٦٣٤٫٣٤',
                6: '٢٣٤٥٦٣٤ر.ق.‏',
                7: '٢٣٤٥٦٣٤٫٣٤٣ ر.ق.‏',
                8: '٢٣٤٥٦٣٤٣٤٫٢٥٪؜',
                9: '٢٣٤٥٦٣٤٣٤٫٢٥ ٪؜',
                10: '٪؜٢٣٤٥٦٣٤٣٤',
                11: '٪؜ ٢٣٤٥٦٣٤٣٤٫٢٥',
                12: 'ر.ق.‏ $ ٢٣٤٥٦٣٤',
                13: 'ر.ق.‏ ٢٣٤٥٦٣٤  $ ',
                14: '٢٣٤٥٦٣٤٫٣٤ ر.ق.‏  $  ',
                15: '٢٣٤٥٦٣٤٫٣٤  $  ',
                16: '  $  ٢٣٤٥٦٣٤٫٣٤٣',
                17: ' ٢٣٤٥٦٣٤  $%  ',
                18.1: '٢٣٤٥٦٣٤٫٣٤',
                18.2: '١٢٣٤٫٣',
                18.3: '٠٫٠٠٠٠٠٠٠',
                19.1: 'ر.ق.‏ ٢٣٤٥٦٣٤٫٣٤',
                19.2: '-١٢٣٤٫٣٤٧٥٦',
                19.3: '٠٫٠٠',
                20.1: '٢٣٤٥٦٣٤٣٤٫٢٥٪؜',
                20.2: 'ر.ق.‏-١٢٣٤٫٣٤٧٦',
                20.3: '٠٫٠٠',
                21.1: '٢٣٤٥٦٣٤٫٣٤٣ $',
                21.2: 'ر.ق.‏١٢٣٤٫٣٥$',
                21.3: '٠',
                22.1: '٪؜٢٣٤٥٦٣٤٣٤٫٢٥',
                22.2: '%١٢٣٤٫٣٥ر.ق.‏',
                22.3: '٠٫٠',
                23.1: '٢٬٣٤٥٬٦٣٤',
                23.2: 'ر.ق.‏٠٬٠٠١٬٢٣٤٫٣٥',
                23.3: '٠٫٠٠',
                24.1: '٢٬٣٤٥٬٦٣٤٫٣٤٣',
                24.2: '-١٢٣٤٣٤٫٧٦٪؜',
                24.3: '٠٫٠٠ر.ق.‏',
                25.1: 'ر.ق.‏٢٣٤٥٦٣٤٫٣٤',
                25.2: 'ر.ق.‏٠٫٠٠',
                26: '١٢',
                27: '٢٣٤٥٦٣٤٫٣٤٣',
                28: '؜-١٬٢٣٤'
            }
        };
        var cultureList = ['en', 'ar-QA'];
        var localExpected = {};
        var skeleText = ['n', 'p', 'c', 'pj'];
        var ex = {};
        var ccode = { 'en': 'USD', 'ar-QA': 'QAR' };
        var currency;
        cultureList.forEach(function (culName) {
            var localExpected = expectedResult[culName];
            var cusLocalExpected = cusResult[culName];
            currency = ccode[culName];
            describe('Numeric type format or default formatting for culture ' + culName, function () {
                beforeAll(function () {
                    ex = localExpected[skeleText[0]];
                });
                it('format  integer value without skeleton', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'n' }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[0]);
                });
                it('format  integer value with minimum fraction digits denoted in skeleotn', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'N3' }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[1]);
                });
                it('format  fraction numbers wit skeleton', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'n' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(ex[2]);
                });
                it('using minimum Fraction Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { minimumFractionDigits: 2, format: 'n' }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[3]);
                    expect(formatter(fracValue)).toBe(ex[4]);
                });
                it('using minimum and maximum fraction digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumFractionDigits: 4, maximumFractionDigits: 5, format: 'n'
                    }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(ex[5]);
                    expect(formatter(intValue)).toBe(ex[6]);
                });
                it('Lowest possible value for maximum fraction Digits without grouping', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        maximumFractionDigits: 0, useGrouping: false, format: 'n'
                    }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[7]);
                });
                it('highest possible value for maximum fraction Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { maximumFractionDigits: 20 }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[9]);
                });
                it('highest possible value for minimumFractionDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { minimumFractionDigits: 20 }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[11]);
                });
                it('using minimum significant Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumSignificantDigits: 10, maximumSignificantDigits: 11
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[12]);
                    expect(formatter(fracValue)).toBe(ex[13]);
                });
                it('using maximum significant Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { minimumSignificantDigits: 1, maximumSignificantDigits: 2 }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[14]);
                    expect(formatter(fracValue)).toBe(ex[15]);
                });
                it('using minimum and maximumSignificantDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { minimumSignificantDigits: 4, maximumSignificantDigits: 6 }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[16]);
                    expect(formatter(fracValue)).toBe(ex[17]);
                    expect(formatter(twodigitno)).toBe(ex[18]);
                });
                it('using minimumIntegerDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { minimumIntegerDigits: 5 }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[19]);
                    expect(formatter(fracValue)).toBe(ex[20]);
                    expect(formatter(twodigitno)).toBe(ex[21]);
                });
                it('using minimumIntegerDigits and maximum and minimumFractionDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumIntegerDigits: 5, minimumFractionDigits: 4, minimumSignificantDigits: 3, maximumSignificantDigits: 15,
                        maximumFractionDigits: 5
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[22]);
                    expect(formatter(fracValue)).toBe(ex[23]);
                    expect(formatter(twodigitno)).toBe(ex[24]);
                });
                it('using minimumIntegerDigits and maximum and minimumFractionDigits and minimumSignificantDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumIntegerDigits: 5, minimumFractionDigits: 4,
                        maximumFractionDigits: 5, maximumSignificantDigits: 5,
                        minimumSignificantDigits: 3
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[25]);
                    expect(formatter(fracValue)).toBe(ex[26]);
                    expect(formatter(twodigitno)).toBe(ex[27]);
                });
            });
            describe('percentage type format for culture ' + culName, function () {
                beforeAll(function () {
                    ex = localExpected[skeleText[1]];
                });
                it('format  integer value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'P' }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[0]);
                });
                it('format  integer value with minimum fraction digits denoted in skeleotn', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'P3' }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[1]);
                });
                it('format  fraction numbers wit skeleton', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'P' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(ex[2]);
                });
                it('using minimum Fraction Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { minimumFractionDigits: 2, format: 'P' }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[3]);
                    expect(formatter(fracValue)).toBe(ex[4]);
                });
                it('using minimum and maximum fraction digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumFractionDigits: 4, maximumFractionDigits: 5, format: 'p'
                    }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(ex[5]);
                    expect(formatter(intValue)).toBe(ex[6]);
                });
                it('Lowest possible value for maximum fraction Digits without grouping', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        maximumFractionDigits: 0, useGrouping: false, format: 'p'
                    }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[7]);
                });
                it('highest possible value for maximum fraction Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { maximumFractionDigits: 20, format: 'P' }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[9]);
                });
                it('highest possible value for minimumFractionDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { minimumFractionDigits: 20, format: 'P' }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[11]);
                });
                it('using minimum significant Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumSignificantDigits: 10,
                        maximumSignificantDigits: 11, format: 'P'
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[12]);
                    expect(formatter(fracValue)).toBe(ex[14]);
                });
                it('using maximum significant Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumSignificantDigits: 1,
                        maximumSignificantDigits: 2, format: 'p'
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[15]);
                    expect(formatter(fracValue)).toBe(ex[16]);
                });
                it('using minimum and maximumSignificantDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumSignificantDigits: 4, maximumSignificantDigits: 6, format: 'p'
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[17]);
                    expect(formatter(fracValue)).toBe(ex[18]);
                    expect(formatter(twodigitno)).toBe(ex[19]);
                });
                it('using minimumIntegerDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { minimumIntegerDigits: 5, format: 'P' }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[20]);
                    expect(formatter(fracValue)).toBe(ex[21]);
                    expect(formatter(twodigitno)).toBe(ex[22]);
                });
                it('using minimumIntegerDigits and maximum and minimumFractionDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumIntegerDigits: 5, minimumFractionDigits: 4,
                        maximumFractionDigits: 5, format: 'P'
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[23]);
                    expect(formatter(fracValue)).toBe(ex[24]);
                    expect(formatter(twodigitno)).toBe(ex[25]);
                });
                it('using minimumIntegerDigits and maximum and minimumFractionDigits and minimumSignificantDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumIntegerDigits: 5, minimumFractionDigits: 4,
                        maximumFractionDigits: 5, maximumSignificantDigits: 5,
                        minimumSignificantDigits: 3, format: 'P'
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[26]);
                    expect(formatter(fracValue)).toBe(ex[27]);
                    expect(formatter(twodigitno)).toBe(ex[28]);
                });
            });
            describe('currency type format for culture ' + culName, function () {
                beforeEach(function () {
                    ex = localExpected[skeleText[2]];
                    currency = ccode[culName];
                });
                it('format  integer value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'c', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[0]);
                });
                it('format  integer value with minimum fraction digits denoted in skeleotn', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'C3', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[1]);
                });
                it('format  fraction numbers wit skeleton', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: 'c', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(ex[2]);
                });
                it('using minimum Fraction Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumFractionDigits: 2, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[3]);
                    expect(formatter(fracValue)).toBe(ex[4]);
                });
                it('using minimum and maximum fraction digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 5, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(ex[5]);
                    expect(formatter(intValue)).toBe(ex[6]);
                });
                it('Lowest possible value for maximum fraction Digits without grouping', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        useGrouping: false, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[7]);
                });
                it('highest possible value for maximum fraction Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        maximumFractionDigits: 20, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[9]);
                });
                it('highest possible value for minimumFractionDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumFractionDigits: 20, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(maxFractionDigits)).toBe(ex[11]);
                });
                it('using minimum significant Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumSignificantDigits: 10, maximumSignificantDigits: 11, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[12]);
                    expect(formatter(fracValue)).toBe(ex[13]);
                });
                it('using maximum significant Digits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumSignificantDigits: 1,
                        maximumSignificantDigits: 2, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[14]);
                    expect(formatter(fracValue)).toBe(ex[15]);
                });
                it('using minimum and maximumSignificantDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumSignificantDigits: 4,
                        maximumSignificantDigits: 6, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[16]);
                    expect(formatter(fracValue)).toBe(ex[17]);
                    expect(formatter(twodigitno)).toBe(ex[18]);
                });
                it('using minimumIntegerDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumIntegerDigits: 5,
                        format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[19]);
                    expect(formatter(fracValue)).toBe(ex[20]);
                    expect(formatter(twodigitno)).toBe(ex[21]);
                });
                it('using minimumIntegerDigits and maximum and minimumFractionDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumIntegerDigits: 5, minimumFractionDigits: 4,
                        maximumFractionDigits: 5, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[22]);
                    expect(formatter(fracValue)).toBe(ex[23]);
                    expect(formatter(twodigitno)).toBe(ex[24]);
                });
                it('using minimumIntegerDigits and maximum and minimumFractionDigits and minimumSignificantDigits', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, {
                        minimumIntegerDigits: 5, minimumFractionDigits: 4,
                        maximumFractionDigits: 5, maximumSignificantDigits: 5,
                        minimumSignificantDigits: 3, format: 'c', currency: currency
                    }, internationalization_1.cldrData);
                    expect(formatter(intValue)).toBe(ex[25]);
                    expect(formatter(fracValue)).toBe(ex[26]);
                    expect(formatter(twodigitno)).toBe(ex[27]);
                });
            });
            describe('Custom Number Formatting for culture ' + culName, function () {
                it('type decimal with grouping fraction value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '#,##0.00#' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[0]);
                });
                it('type decimal with grouping negValue', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '#,##0' }, internationalization_1.cldrData);
                    expect(formatter(negValue)).toBe(cusLocalExpected[28]);
                });
                it('type decimal  without grouping value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '###0.00#' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[1]);
                });
                it('type decimal integer format decimal value returns integer', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '##00' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[2]);
                });
                it('type decimal fraction', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '000000000.0000000' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[3]);
                });
                it('type currency integer', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$###0', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[4]);
                });
                it('type currency fraction', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$ 000.00', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[5]);
                });
                it('type currency integer at end', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '##0$', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[6]);
                });
                it('currency at end fraction', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0.00# $', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[7]);
                });
                it('percent at end integer', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '000.##%' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[8]);
                });
                it('percent at end with space', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0.## %' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[9]);
                });
                it('percent at start integer', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '%0' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[10]);
                });
                it('percent at start with space integer ', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '% 0.##' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[11]);
                });
                it('currency and string with dollar sign integer', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$ \'$\' #0', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[12]);
                });
                it('currency at start string with dollar at end', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$ #0 \' $ \'', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[13]);
                });
                it('currency at end with string of dollar at end', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0.0# $ \' $ \' ', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[14]);
                });
                it('decimal string with dollar at end', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0.0# \' $ \' ' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[15]);
                });
                it('decimal with string of dollar at start', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: ' \' $ \' 0.###' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[16]);
                });
                it('decimal integer with string of dollar and percent sign', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: ' 0 \' $% \' ' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[17]);
                });
                it('decimal with semicolon seperators for positive value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '##0.0#;0.#;0.0000000' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[18.1]);
                });
                it('decimal with semicolon seperators for negative value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '##0.0#;0.#;0.0000000' }, internationalization_1.cldrData);
                    expect(formatter(negValue)).toBe(cusLocalExpected[18.2]);
                });
                it('decimal with semicolon seperators for zero value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '##0.0#;0.#;0.0000000' }, internationalization_1.cldrData);
                    expect(formatter(zero)).toBe(cusLocalExpected[18.3]);
                });
                it('currency for positive value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$ 0.##;0.00000;0.00', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[19.1]);
                });
                it('decimal for negative value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$ 0.##;-0.00000;0.00' }, internationalization_1.cldrData);
                    expect(formatter(negValue)).toBe(cusLocalExpected[19.2]);
                });
                it('decimal for zero value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$ 0.##;0.00000;0.00' }, internationalization_1.cldrData);
                    expect(formatter(zero)).toBe(cusLocalExpected[19.3]);
                });
                it('percent for positive value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0.##%;$-0.00##;0.00' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[20.1]);
                });
                it('currency for negValue semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0.##%;$-0.00##;0.00', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(negValue)).toBe(cusLocalExpected[20.2]);
                });
                it('decimal for zero value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0.##%;$-0.00##;0.00' }, internationalization_1.cldrData);
                    expect(formatter(zero)).toBe(cusLocalExpected[20.3]);
                });
                it('decimal for positive value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '##0.0## \'$\';$0.0#\'$\';0' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[21.1]);
                });
                it('currency for negValue semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '##0.0## \'$\';$0.0#\'$\';0', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(negValue)).toBe(cusLocalExpected[21.2]);
                });
                it('decimal for zero value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '##0.0## \'$\';$0.0#\'$\';0' }, internationalization_1.cldrData);
                    expect(formatter(zero)).toBe(cusLocalExpected[21.3]);
                });
                it('percent for positive value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '%#0.00;\'%\'0.00$;0.0' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[22.1]);
                });
                it('currency for negValue semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '%#0.00;\'%\'0.00$;0.0', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(negValue)).toBe(cusLocalExpected[22.2]);
                });
                it('decimal for zero value semicolon seperators', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '%#0.00;\'%\'0.00$;0.0' }, internationalization_1.cldrData);
                    expect(formatter(zero)).toBe(cusLocalExpected[22.3]);
                });
                it('decimal for positive value with grouping', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0,00,000;$0,000,000.00;0.00' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[23.1]);
                });
                it('currency for negValue with grouping', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0,00,000;$0,000,000.00;0.00', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(negValue)).toBe(cusLocalExpected[23.2]);
                });
                it('decimal for zero value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '0,00,000;$0,000,000.00;0.00' }, internationalization_1.cldrData);
                    expect(formatter(zero)).toBe(cusLocalExpected[23.3]);
                });
                it('decimal for positive value with grouping', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '#,###,##0.000;-0.##%;0.00$' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[24.1]);
                });
                it('percent for negValue', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '#,###,##0.000;-0.##%;0.00$' }, internationalization_1.cldrData);
                    expect(formatter(negValue)).toBe(cusLocalExpected[24.2]);
                });
                it('currency for zero value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '#,###,##0.000;-0.##%;0.00$', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(zero)).toBe(cusLocalExpected[24.3]);
                });
                it('currency for positive value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$0.00;-0$', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[25.1]);
                });
                it('zero takes positive format if not specified so currency for zero value', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '$0.00;-0$', currency: currency }, internationalization_1.cldrData);
                    expect(formatter(zero)).toBe(cusLocalExpected[25.2]);
                });
                it('decimal with only #', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '###' }, internationalization_1.cldrData);
                    expect(formatter(smallValue)).toBe(cusLocalExpected[26]);
                });
                it('decimal with fraction part with min max fractions contradicting', function () {
                    formatter = number_formatter_1.NumberFormat.numberFormatter(culName, { format: '.0#0' }, internationalization_1.cldrData);
                    expect(formatter(fracValue)).toBe(cusLocalExpected[27]);
                });
            });
        });
        describe('group separator and decimal separator for custom format', function () {
            it('fraction value', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('de', { format: '#,###.##' }, internationalization_1.cldrData);
                expect(formatter(fracValue)).toBe('2.345.634,34');
            });
            it('integer value', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('de', { format: '#,###' }, internationalization_1.cldrData);
                expect(formatter(fracValue)).toBe('2.345.634');
            });
        });
        describe('Account format check', function () {
            it('format  positive integer value', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('en', { format: 'A', currency: 'USD' }, internationalization_1.cldrData);
                expect(formatter(intValue)).toBe('$1,324,342.00');
            });
            it('format  negative integer value', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('en', { format: 'A', currency: 'USD' }, internationalization_1.cldrData);
                expect(formatter(-intValue)).toBe('($1,324,342.00)');
            });
        });
        describe('currency format with single culture "en-US" and different currency codes', function () {
            it('USD', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('en-US', { format: 'c', currency: '' }, internationalization_1.cldrData);
                expect(formatter(intValue)).toBe('$1,324,342.00');
            });
            it('INR', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('en-US', { format: 'c', currency: 'INR' }, internationalization_1.cldrData);
                expect(formatter(intValue)).toBe('$1,324,342.00');
            });
            it('EUR', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('en-US', { format: 'c', currency: 'EUR' }, internationalization_1.cldrData);
                expect(formatter(intValue)).toBe('€1,324,342.00');
            });
        });
        describe('Invalid skeleton throws error', function () {
            it('', function () {
                expect(function () { number_formatter_1.NumberFormat.numberFormatter('en-US', { format: 'Z', currency: 'EUR' }, internationalization_1.cldrData); }).toThrow();
            });
        });
        describe('Empty skelton value returns default formatter', function () {
            it('', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('en-US', { format: '' }, internationalization_1.cldrData);
                expect(formatter(intValue)).toBe('1,324,342');
            });
        });
        describe('Invalid Inputs given', function () {
            it('NaN value', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('en', { format: '' }, internationalization_1.cldrData);
                expect(formatter(NaN)).toBe('NaN');
            });
            it('infinite value', function () {
                formatter = number_formatter_1.NumberFormat.numberFormatter('en', { format: '' }, internationalization_1.cldrData);
                expect(formatter(Infinity)).toBe('∞');
            });
        });
        describe('Invalid options check', function () {
            it('Mandotary maximum and minumum significant digits', function () {
                expect(function () { number_formatter_1.NumberFormat.numberFormatter('en-US', { format: 'N', minimumSignificantDigits: 3 }, internationalization_1.cldrData); }).toThrow();
            });
            it('Mandotary maximum and minumum significant value out of range', function () {
                expect(function () {
                    number_formatter_1.NumberFormat.numberFormatter('en-US', {
                        format: 'N', minimumSignificantDigits: 20,
                        maximumSignificantDigits: 15
                    }, internationalization_1.cldrData);
                }).toThrow();
            });
            it('maximum significant value out of range', function () {
                expect(function () {
                    number_formatter_1.NumberFormat.numberFormatter('en-US', {
                        format: 'N', minimumFractionDigits: -1,
                    }, internationalization_1.cldrData);
                }).toThrow();
            });
        });
        describe('Check fractiondigits sets on pattern', function () {
            it('Set fraction digits in the format sets both maximum and minimum fractions', function () {
                var result = number_formatter_1.NumberFormat.numberFormatter('en-US', { format: 'N4' }, internationalization_1.cldrData);
                expect(result(1234.65457)).toBe('1,234.6546');
                expect(result(1234.2)).toBe('1,234.2000');
            });
            it('Set fraction digits on pattern skips values given in the formatoptions', function () {
                var result = number_formatter_1.NumberFormat.numberFormatter('en-US', {
                    format: 'N2', minimumFractionDigits: 3, maximumFractionDigits: 4
                }, internationalization_1.cldrData);
                expect(result(1234.65457)).toBe('1,234.65');
                expect(result(1234.2)).toBe('1,234.20');
            });
        });
        describe('funcitons', function () {
            it('groupNumbers primary and secondary grouping values ', function () {
                var result = number_formatter_1.NumberFormat.getGroupingDetails('#,##,##0.###');
                expect(result).toEqual({ primary: 3, secondary: 2 });
            });
            it('groupNumbers primary and secondary grouping values ', function () {
                var result = number_formatter_1.NumberFormat.getGroupingDetails('ght');
                expect(result).toEqual({});
            });
            it('groupNumbers pattern with no grouping values ', function () {
                var result = number_formatter_1.NumberFormat.getGroupingDetails('####0.###');
                expect(result).toEqual({});
            });
            it('group numbers with both level seperators', function () {
                var result = number_formatter_1.NumberFormat.groupNumbers('1234567', 3, ',', '.', 2);
                expect(result).toBe('12,34,567');
            });
            it('getSymbolPattern', function () {
                var result = intl_base_1.IntlBase.getSymbolPattern('currency', 'latn', {
                    'currencyFormats-numberSystem-latn': {
                        'standard': '¤#,##0.00',
                    }
                }, true);
                expect(result).toBe('¤#,##0.00');
            });
        });
    });
});
