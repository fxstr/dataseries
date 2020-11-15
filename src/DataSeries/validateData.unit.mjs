import test from 'ava';
import validateData from './validateData.mjs';

test('validates array', (t) => {
    t.deepEqual(validateData([]), []);
    t.throws(() => validateData('notAnArray'), { message: /you used "notAnArray" instead/ });
});

test('validates entries', (t) => {
    t.deepEqual(validateData([new Map([['a', 'b']])]), [new Map([['a', 'b']])]);
    t.throws(() => validateData(['notAMap', 'notEither']), {
        message: /are not Maps: "notAMap", "notEither"/,
    });
});
