import { DateFormatOptions } from '../internationalization';
import { IntlBase as base } from './intl-base';
import { ParserBase as parser, NumericOptions } from './parser-base';
import { isUndefined, throwError, getValue, isNullOrUndefined } from '../util';
const number: string = 'numbers';
const defNoSystem: string = 'defaultNumberingSystem';
const noSystem: string = 'numberingSystem';
const standalone: string = 'stand-alone';
const curWeekDay: string = 'curWeekDay';
const latnRegex: RegExp = /^[0-9]*$/;
const abbreviateRegex: RegExp = /\/MMMMM|MMMM|MMM|a|LLL|EEEEE|EEEE|E|ccc/;

const timeSetter: Object = {
    minute: 'setMinutes',
    hour: 'setHours',
    second: 'setSeconds',
    day: 'setDate',
    month: 'setMonth'
};
/**
 * Interface for date parsing options
 */
interface ParseOptions {
    month?: Object;
    weekday?: string[];
    pattern?: string;
    designator?: Object;
    timeZone?: base.TimeZoneOptions;
    era?: Object;
    hour12?: boolean;
    parserRegex?: RegExp;
    evalposition?: { [key: string]: ValuePosition };
}

/**
 * Interface for the date options
 */
interface DateParts {
    month?: number;
    day?: number;
    year?: number;
    hour?: number;
    minute?: number;
    second?: number;
    designator?: string;
    timeZone?: number;
    hour12?: boolean;
}
const month: string = 'months';
const datePartMatcher: Object = {
    'M': 'month',
    'd': 'day',
    'E': 'weekday',
    'c': 'weekday',
    'y': 'year',
    'm': 'minute',
    'h': 'hour',
    'H': 'hour',
    's': 'second',
    'L': 'month',
    'a': 'designator',
    'z': 'timeZone',
    'Z': 'timeZone',
    'G': 'era'
};
/**
 * Interface for value position
 */
interface ValuePosition {
    isNumber: boolean;
    pos: number;
    hourOnly?: boolean;
}
/**
 * Date Parser.
 */

export class DateParser {
    /**
     * Returns the parser function for given skeleton.
     * @param {string} -  Specifies the culture name to be which formatting.
     * @param {DateFormatOptions} - Specific the format in which string date  will be parsed.
     * @param {cldr} - Specifies the global cldr data collection.
     *  @return Function.  
     */
    public static dateParser(culture: string, option: DateFormatOptions, cldr: Object): Function {
        let dependable: base.Dependables = base.getDependables(cldr, culture);
        let numOptions: NumericOptions = parser.getCurrentNumericOptions(dependable.parserObject, parser.getNumberingSystem(cldr));
        let parseOptions: ParseOptions = {};
        let resPattern: string = option.format || base.getResultantPattern(option.skeleton, dependable.dateObject, option.type);
        let regexString: string = '';
        let hourOnly: boolean;
        if (isUndefined(resPattern)) {
            throwError('Format options or type given must be invalid');
        } else {
            parseOptions = { pattern: resPattern, evalposition: {} };
            let patternMatch: string[] = resPattern.match(base.dateParseRegex) || [];
            let length: number = patternMatch.length;
            let nRegx: string = numOptions.numericRegex;
            for (let i: number = 0; i < length; i++) {
                let str: string = patternMatch[i];
                let len: number = str.length;
                let char: string = (str[0] === 'K') ? 'h' : str[0];
                let isNumber: boolean;
                let canUpdate: boolean;
                let charKey: string = datePartMatcher[char];
                let optional: string = (len === 2) ? '' : '?';
                switch (char) {
                    case 'E':
                    case 'c':
                        let weekObject: Object = parser.reverseObject(dependable.dateObject[base.days][standalone][base.monthIndex[len]]);
                        regexString += '(' + Object.keys(weekObject).join('|') + ')';
                        break;
                    case 'M':
                    case 'L':
                    case 'd':
                    case 'm':
                    case 's':
                    case 'h':
                    case 'H':
                        canUpdate = true;
                        if ((char === 'M' || char === 'L') && len > 2) {
                            parseOptions[charKey] = parser.reverseObject(dependable.dateObject[month][standalone][base.monthIndex[len]]);
                            regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + ')';
                        } else {
                            isNumber = true;
                            regexString += '(' + nRegx + nRegx + optional + ')';
                        }
                        if (char === 'h') {
                            parseOptions.hour12 = true;
                        }
                        break;
                    case 'y':
                        canUpdate = isNumber = true;
                        if (len === 2) {
                            regexString += '(' + nRegx + nRegx + ')';
                        } else {
                            regexString += '(' + nRegx + '+)';
                        }
                        break;
                    case 'a':
                        canUpdate = true;
                        parseOptions[charKey] = parser.reverseObject(getValue('dayPeriods.format.wide', dependable.dateObject));
                        regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + ')';
                        break;
                    case 'G':
                        canUpdate = true;
                        let eText: string = (len <= 3) ? 'eraAbbr' : (len === 4) ? 'eraNames' : 'eraNarrow';
                        parseOptions[charKey] = parser.reverseObject(getValue('eras.' + eText, dependable.dateObject));
                        regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + '?)';
                        break;
                    case 'z':
                        let tval: number = new Date().getTimezoneOffset();
                        canUpdate = (tval !== 0);
                        parseOptions[charKey] = getValue('dates.timeZoneNames', dependable.parserObject);
                        let tzone: base.TimeZoneOptions = parseOptions[charKey];
                        hourOnly = (len < 4);
                        let hpattern: string = hourOnly ? '+H;-H' : tzone.hourFormat;
                        regexString += '(' + this.parseTimeZoneRegx(hpattern, tzone, nRegx) + ')?';
                        break;
                    case '\'':
                        let iString: string = str.replace(/\'/g, '');
                        regexString += '(' + iString + ')?';
                        break;
                    default:
                        regexString += '(.)?';
                        break;
                }
                if (canUpdate) {
                    parseOptions.evalposition[charKey] = { isNumber: isNumber, pos: i + 1, hourOnly: hourOnly };
                }
                if (i === length - 1 && !isNullOrUndefined(regexString)) {
                    parseOptions.parserRegex = new RegExp('^' + regexString + '$');
                }
            }
        }
        return (value: string): Date => {
            let parsedDateParts: DateParts = this.internalDateParse(value, parseOptions, numOptions);
            if (isNullOrUndefined(parsedDateParts) || !Object.keys(parsedDateParts).length) {
                return null;
            }
            return this.getDateObject(parsedDateParts);
        };
    }

    /**
     * Returns date object for provided date options
     * @param {DateParts} options 
     * @param {Date} value 
     * @returns {Date}
     */
    private static getDateObject(options: DateParts, value?: Date): Date {
        let res: Date = value || new Date();
        let tKeys: string[] = ['hour', 'minute', 'second', 'month', 'day'];
        let y: number = options.year;
        let desig: string = options.designator;
        let tzone: number = options.timeZone;
        if (!isUndefined(y)) {
            let len: number = (y + '').length;
            if (len === 2) {
                let century: number = Math.floor(res.getFullYear() / 100) * 100;
                y += century;
            }
            res.setFullYear(y);
        }
        for (let key of tKeys) {
            let tValue: number = options[key];
            if (!isUndefined(tValue)) {
                if (key === 'month') {
                    tValue -= 1;
                    if (tValue < 0 || tValue > 11) {
                        return new Date('invalid');
                    }
                    let pDate: number = res.getDate();
                    res.setDate(1);
                    res[timeSetter[key]](tValue);
                    let lDate: number =  new Date(res.getFullYear(), tValue + 1, 0).getDate();
                    res.setDate(pDate < lDate ? pDate : lDate );
                } else {
                    if (key === 'day' && (tValue < 1 || tValue > 31)) {
                        return new Date('invalid');
                    }
                    res[timeSetter[key]](tValue);
                }
            }
        }
        if (!isUndefined(desig)) {
            let hour: number = res.getHours();
            if (desig === 'pm') {
                res.setHours(hour + (hour === 12 ? 0 : 12));
            } else if (hour === 12) {
                res.setHours(0);
            }
        }
        if (!isUndefined(tzone)) {
            let tzValue: number = tzone - res.getTimezoneOffset();
            if (tzValue !== 0) {
                res.setMinutes(res.getMinutes() + tzValue);
            }
        }
        return res;
    }
    /**
     * Returns date parsing options for provided value along with parse and numeric options
     * @param {string} value 
     * @param {ParseOptions} parseOptions 
     * @param {NumericOptions} num 
     * @returns {DateParts}
     */
    private static internalDateParse(value: string, parseOptions: ParseOptions, num: NumericOptions): DateParts {
        let matches: string[] = value.match(parseOptions.parserRegex);
        let retOptions: DateParts = { 'hour': 0, 'minute': 0, 'second': 0};
        let nRegx: string = num.numericRegex;
        if (isNullOrUndefined(matches)) {
            return null;
        } else {
            let props: string[] = Object.keys(parseOptions.evalposition);
            for (let prop of props) {
                let curObject: ValuePosition = parseOptions.evalposition[prop];
                let matchString: string = matches[curObject.pos];
                if (curObject.isNumber) {
                    retOptions[prop] = this.internalNumberParser(matchString, num);
                } else {
                    if (prop === 'timeZone' && !isUndefined(matchString)) {
                        let pos: number = curObject.pos;
                        let val: number;
                        let tmatch: string = matches[pos + 1];
                        let flag: boolean = !isUndefined(tmatch);
                        if (curObject.hourOnly) {
                            val = this.getZoneValue(flag, tmatch, matches[pos + 4], num) * 60;
                        } else {
                            val = this.getZoneValue(flag, tmatch, matches[pos + 7], num) * 60;
                            val += this.getZoneValue(flag, matches[pos + 4], matches[pos + 10], num);

                        }
                        if (!isNullOrUndefined(val)) {
                            retOptions[prop] = val;
                        }
                    } else {
                        retOptions[prop] = parseOptions[prop][matchString];
                    }
                }
            }
            if (parseOptions.hour12) {
                retOptions.hour12 = true;
            }
        }
        return retOptions;
    }
    /**
     * Returns parsed number for provided Numeric string and Numeric Options
     * @param {string} value 
     * @param {NumericOptions} option 
     * @returns {number}
     */
    private static internalNumberParser(value: string, option: NumericOptions): number {
        value = parser.convertValueParts(value, option.numberParseRegex, option.numericPair);
        if (latnRegex.test(value)) {
            return +value;
        }
        return null;
    }
    /**
     * Returns parsed time zone RegExp for provided hour format and time zone 
     * @param {string} hourFormat 
     * @param {base.TimeZoneOptions} tZone 
     * @param {string} nRegex 
     * @returns {string}
     */
    private static parseTimeZoneRegx(hourFormat: string, tZone: base.TimeZoneOptions, nRegex: string): string {
        let pattern: string = tZone.gmtFormat;
        let ret: string;
        let result: string;
        let cRegex: string = '(' + nRegex + ')' + '(' + nRegex + ')';
        let splitStr: string[];

        ret = hourFormat.replace('+', '\\+');
        if (hourFormat.indexOf('HH') !== -1) {
            ret = ret.replace(/HH|mm/g, '(' + cRegex + ')');
        } else {
            ret = ret.replace(/H|m/g, '(' + cRegex + '?)');
        }
        splitStr = (ret.split(';').map((str: string): string => {
            return pattern.replace('{0}', str);
        }));
        ret = splitStr.join('|') + '|' + tZone.gmtZeroFormat;
        return ret;
    }
    /**
     * Returns zone based value.
     * @param {boolean} flag 
     * @param {string} val1 
     * @param {string} val2 
     * @param {NumericOptions} num 
     * @returns {number}
     */
    private static getZoneValue(flag: boolean, val1: string, val2: string, num: NumericOptions): number {
        let value: number = this.internalNumberParser(flag ? val1 : val2, num);
        if (flag) {
            return -value;
        }
        return value;
    }
}

