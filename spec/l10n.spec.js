define(["require", "exports", "../src/l10n", "../src/internationalization"], function (require, exports, l10n_1, internationalization_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    l10n_1.L10n.load({
        'fr-BE': {
            'button': {
                'check': 'vérifié'
            },
            'grid': {
                column: 'colonne',
                row: 'colonne'
            }
        }
    });
    describe('L10n', function () {
        var button;
        beforeAll(function () {
            internationalization_1.setCulture('fr-BE');
            button = new l10n_1.L10n('button', {
                check: 'change',
                unique: 'uniqueProperty'
            });
        });
        var result;
        it('check default object and controlname set properly', function () {
            result = button.getConstant('check');
            expect(result).toBe('vérifié');
        });
        it('Dynamically load locale change locale object works properly', function () {
            l10n_1.L10n.load({
                'en-US': {
                    'button': {
                        'check': 'checked'
                    },
                    'grid': {
                        column: 'columns',
                        row: 'rows'
                    }
                }
            });
            button.setLocale('en-US');
            result = button.getConstant('check');
            expect(result).toBe('checked');
        });
        it('check property value returned from default if property is not present in global locale', function () {
            expect(button.getConstant('unique')).toBe('uniqueProperty');
        });
        it('check new instance created will not be affected by previous instance process', function () {
            var grid = new l10n_1.L10n('grid', {
                column: 'column',
                row: 'rows'
            });
            result = grid.getConstant('column');
            expect(result).toBe('colonne');
        });
        it('check getconstant returns proper constant while calling using default object', function () {
            button.setLocale('en-US');
            result = button.getConstant('check');
            expect(result).toBe('checked');
        });
        it('check property value returned from default if property is not present in same culture in global locale', function () {
            expect(button.getConstant('unique')).toBe('uniqueProperty');
        });
        it('check default object is set while locale for control is not given in the global locale for "en-US" culture ', function () {
            var scroller = new l10n_1.L10n('scroller', {
                scrollx: 'scrollableX'
            }, 'en-US');
            expect(scroller.getConstant('scrollx')).toBe('scrollableX');
        });
        it('check control instance culture sets properly while default value of localization is changed', function () {
            l10n_1.L10n.load({
                'af': {
                    'grid': {
                        column: 'kolom',
                        row: 'ry'
                    }
                }
            });
            internationalization_1.setCulture('afd');
            expect(function () {
                new l10n_1.L10n('grid', {
                    'column': 'col',
                    'rows': 'ro'
                });
            }).toThrow();
            internationalization_1.setCulture('af');
            var grid2 = new l10n_1.L10n('grid', {
                'column': 'col',
                'rows': 'ro'
            });
            expect(grid2.getConstant('row')).toBe('ry');
        });
        it('check invalid locale name throws error', function () {
            expect(function () { button.setLocale('fd'); }).toThrow();
        });
        it('check valid locale name not to throws error', function () {
            expect(function () { button.setLocale('en-US'); }).not.toThrow();
        });
        it('check invalid property name returns empty string', function () {
            result = button.getConstant('checked');
            expect(result).toBe('');
        });
        afterAll(function () {
            internationalization_1.setCulture('en-US');
        });
    });
});
