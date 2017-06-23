import { throwError, getValue, isNullOrUndefined, extend } from '../util';
import { ParserBase as parser } from './parser-base';
import { NumberFormat, FormatParts, CommonOptions } from './number-formatter';
/**
 * Date base common constants and function for date parser and formatter.
 */
export namespace IntlBase {
    // tslint:disable-next-line:max-line-length
    export const negativeDataRegex: RegExp = /^(('[^']+'|''|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
    export const customRegex: RegExp = /^(('[^']+'|''|[^*#@0,.])*)(\*.)?((([0#,]*[0,]*[0#]*)(\.[0#]*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
    export const latnParseRegex: RegExp = /0|1|2|3|4|5|6|7|8|9/g;
    const fractionRegex: RegExp = /[0-9]/g;
    export const defaultCurrency: string = '$';
    const mapper: string[] = ['infinity', 'nan', 'group', 'decimal'];
    export interface NumericSkeleton {
        type?: string;
        isAccount?: boolean;
        fractionDigits?: number;
    }
    export interface GenericFormatOptions {
        nData?: NegativeData;
        pData?: NegativeData;
        zeroData?: NegativeData;
    }
    export interface GroupSize {
        primary?: number;
        secondary?: number;
    }
    export interface NegativeData extends FormatParts {
        nlead?: string;
        nend?: string;
        groupPattern?: string;
        minimumFraction?: number;
        maximumFraction?: number;
    }
    export const formatRegex: RegExp = /(^[ncpa]{1})([0-1]?[0-9]|20)?$/i;
    const typeMapper: Object = {
        '$': 'isCurrency',
        '%': 'isPercent',
        '-': 'isNegative',
        0: 'nlead',
        1: 'nend'
    };
    export const dateParseRegex: RegExp = /([a-z])\1*|'([^']|'')+'|''|./gi;
    export const basicPatterns: string[] = ['short', 'medium', 'long', 'full'];
    export interface Dependables {
        parserObject?: Object;
        dateObject?: Object;
        numericObject?: Object;
    }
    export interface TimeZoneOptions {
        hourFormat?: string;
        gmtFormat?: string;
        gmtZeroFormat?: string;
    }
    /* tslint:disable:quotemark */
    export const defaultObject: Object = {
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
    /* tslint:enable:quotemark */
    export const monthIndex: Object = {
        3: 'abbreviated',
        4: 'wide',
        5: 'narrow',
        1: 'abbreviated'
    };
    /**
     * 
     */

    export const month: string = 'months';
    export const days: string = 'days';
    /**
     * Default numerber Object
     */

    export const patternMatcher: Object = {
        C: 'currency',
        P: 'percent',
        N: 'decimal',
        A: 'currency'
    };
    /**
     * Returns the resultant pattern based on the skeleton, dateObject and the type provided
     * @private
     * @param {string} skeleton 
     * @param {Object} dateObject 
     * @param {string} type 
     * @returns {string}
     */
    export function getResultantPattern(skeleton: string, dateObject: Object, type: string): string {
        let resPattern: string;
        let iType: string = type || 'date';
        if (basicPatterns.indexOf(skeleton) !== -1) {
            resPattern = getValue(iType + 'Formats.' + skeleton, dateObject);
            if (iType === 'dateTime') {
                let dPattern: string = getValue('dateFormats.' + skeleton, dateObject);
                let tPattern: string = getValue('timeFormats.' + skeleton, dateObject);
                resPattern = resPattern.replace('{1}', dPattern).replace('{0}', tPattern);
            }
        } else {
            resPattern = getValue('dateTimeFormats.availableFormats.' + skeleton, dateObject);
        }
        return resPattern;
    }
    /**
     * Returns the dependable object for provided cldr data and culture
     * @private
     * @param {Object} cldr 
     * @param {string} culture 
     * @param {boolean} isNumber 
     * @returns {Dependables}
     */
    export function getDependables(cldr: Object, culture: string, isNumber?: boolean): Dependables {
        let ret: Dependables = {};
        ret.parserObject = parser.getMainObject(cldr, culture) || defaultObject;
        if (isNumber) {
            ret.numericObject = getValue('numbers', ret.parserObject);
        } else {
            ret.dateObject = getValue('dates.calendars.gregorian', ret.parserObject);
        }
        return ret;
    }
    /**
     * Returns the symbol pattern for provided parameters
     * @private
     * @param {string} type 
     * @param {string} numSystem 
     * @param {Object} obj 
     * @param {boolean} isAccount 
     * @returns {string}
     */
    export function getSymbolPattern(type: string, numSystem: string, obj: Object, isAccount: boolean): string {
        return getValue(
            type + 'Formats-numberSystem-' +
            numSystem + (isAccount ? '.accounting' : '.standard'),
            obj) || (isAccount ? getValue(
                type + 'Formats-numberSystem-' +
                numSystem + '.standard',
                obj) : '');
    }
    /**
     * Returns proper numeric skeleton
     * @private
     * @param {string} skeleton 
     * @returns {NumericSkeleton}
     */
    export function getProperNumericSkeleton(skeleton: string): NumericSkeleton {
        let matches: RegExpMatchArray = skeleton.match(formatRegex);
        let ret: NumericSkeleton = {};
        let pattern: string = matches[1].toUpperCase();
        ret.isAccount = (pattern === 'A');
        ret.type = patternMatcher[pattern];
        if (skeleton.length > 1) {
            ret.fractionDigits = parseInt(matches[2], 10);
        }
        return ret;
    }
    /**
     * Returns format data for number formatting like minimum fraction, maximum fraction, etc..,
     * @private
     * @param {string} pattern 
     * @param {boolean} needFraction 
     * @param {string} cSymbol 
     * @param {boolean} fractionOnly 
     * @returns {NegativeData}
     */
    export function getFormatData(pattern: string, needFraction: boolean, cSymbol: string, fractionOnly?: boolean): NegativeData {
        let nData: NegativeData = fractionOnly ? {} : { nlead: '', nend: '' };
        let match: string[] = pattern.match(customRegex);
        if (match) {
            if (!fractionOnly) {
                nData.nlead = changeCurrencySymbol(match[1], cSymbol);
                nData.nend = changeCurrencySymbol(match[10], cSymbol);
                nData.groupPattern = match[4];
            }
            let fraction: string = match[7];
            if (fraction && needFraction) {
                let fmatch: string[] = fraction.match(fractionRegex);
                if (!isNullOrUndefined(fmatch)) {
                    nData.minimumFraction = fmatch.length;
                } else {
                    nData.minimumFraction = 0;
                }
                nData.maximumFraction = fraction.length - 1;
            }

        }
        return nData;
    }
    /**
     * Changes currency symbol
     * @private
     * @param {string} val 
     * @param {string} sym 
     * @returns {string}
     */
    function changeCurrencySymbol(val: string, sym: string): string {
        if (val) {
            return val.replace(defaultCurrency, sym);
        }
        return '';
    }
    /**
     * Returns currency symbol based on currency code
     * @private
     * @param {Object} numericObject 
     * @param {string} currencyCode 
     * @returns {string}
     */
    export function getCurrencySymbol(numericObject: Object, currencyCode: string): string {
        return getValue('currencies.' + currencyCode + '.symbol', numericObject) || '$';
    }
    /**
     * Returns formatting options for custom number format
     * @private
     * @param {string} format 
     * @param {CommonOptions} dOptions 
     * @param {Dependables} obj 
     * @returns {GenericFormatOptions}
     */
    export function customFormat(format: string, dOptions: CommonOptions, obj: Dependables): GenericFormatOptions {
        let options: GenericFormatOptions = {};
        let formatSplit: string[] = format.split(';');
        let data: string[] = ['pData', 'nData', 'zeroData'];
        for (let i: number = 0; i < formatSplit.length; i++) {
            options[data[i]] = customNumberFormat(formatSplit[i], dOptions, obj);
        }
        if (isNullOrUndefined(options.nData)) {
            options.nData = extend({}, options.pData);
            options.nData.nlead = isNullOrUndefined(dOptions) ? '-' + options.nData.nlead : dOptions.minusSymbol + options.nData.nlead;
        }
        return options;
    }
    /**
     * Returns custom formatting options
     * @private
     * @param {string} format 
     * @param {CommonOptions} dOptions 
     * @param {Object} numObject 
     * @returns {NegativeData}
     */
    function customNumberFormat(format: string, dOptions?: CommonOptions, numObject?: Object): NegativeData {
        let cOptions: NegativeData = { type: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 };
        let pattern: string[] = format.match(customRegex);
        if (isNullOrUndefined(pattern) || pattern[5] === '') {
            throwError('Given Format is not valid or Cldr data not loaded');
        }
        cOptions.nlead = pattern[1];
        cOptions.nend = pattern[10];
        let integerPart: string = pattern[6];
        cOptions.useGrouping = integerPart.indexOf(',') !== -1;
        integerPart = integerPart.replace(/,/g, '');
        let fractionPart: string = pattern[7];
        if (integerPart.indexOf('0') !== -1) {
            cOptions.minimumIntegerDigits = integerPart.length - integerPart.indexOf('0');
        }
        if (!isNullOrUndefined(fractionPart)) {
            cOptions.minimumFractionDigits = fractionPart.lastIndexOf('0');
            cOptions.maximumFractionDigits = fractionPart.lastIndexOf('#');
            if (cOptions.minimumFractionDigits === -1) {
                cOptions.minimumFractionDigits = 0;
            }
            if (cOptions.maximumFractionDigits === -1 || cOptions.maximumFractionDigits < cOptions.minimumFractionDigits) {
                cOptions.maximumFractionDigits = cOptions.minimumFractionDigits;
            }
        }
        if (!isNullOrUndefined(dOptions)) {
            extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '$', dOptions.currencySymbol));
            if (!cOptions.isCurrency) {
                extend(cOptions, isCurrencyPercent(
                    [cOptions.nlead, cOptions.nend], '%', dOptions.percentSymbol));
            }
        } else {
            extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', '%'));
        }
        if (!isNullOrUndefined(numObject)) {
            let symbolPattern: string = getSymbolPattern(
                cOptions.type, dOptions.numberMapper.numberSystem, numObject, false);
            if (cOptions.useGrouping) {
                cOptions.groupSeparator = dOptions.numberMapper.numberSymbols[mapper[2]];
                cOptions.groupData = NumberFormat.getGroupingDetails(symbolPattern.split(';')[0]);
            }
            cOptions.nlead = cOptions.nlead.replace(/\'/g, '');
            cOptions.nend = cOptions.nend.replace(/\'/g, '');
        }
        return cOptions;
    }
    /**
     * Returns formatting options for currency or percent type
     * @private
     * @param {string[]} parts 
     * @param {string} actual 
     * @param {string} symbol 
     * @returns {NegativeData}
     */
    export function isCurrencyPercent(parts: string[], actual: string, symbol: string): NegativeData {
        let options: NegativeData = { nlead: parts[0], nend: parts[1] };
        for (let i: number = 0; i < 2; i++) {
            let part: string = parts[i];
            let loc: number = part.indexOf(actual);
            if ((loc !== -1) && ((loc < part.indexOf('\'')) || (loc > part.lastIndexOf('\'')))) {
                options[typeMapper[i]] = part.substr(0, loc) + symbol + part.substr(loc + 1);
                options[typeMapper[actual]] = true;
                options.type = options.isCurrency ? 'currency' : 'percent';
                break;
            }
        }
        return options;
    }
    /**
     * Returns culture based date separator 
     * @private
     * @param {Object} dateObj 
     * @returns {string}
     */
    export function getDateSeparator(dateObj: Object): string {
        let value: string[] = (getValue('dateFormats.short', dateObj) || '').match(/[d‏M‏]([^d‏M])[d‏M‏]/i);
        return value ? value[1] : '/';
    }
}
