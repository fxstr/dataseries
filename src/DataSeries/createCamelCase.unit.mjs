import test from 'ava';
import createCamelCase from './createCamelCase.mjs';

test('creates camelCase', (t) => {
    t.is(createCamelCase('iAmAlready'), 'iAmAlready');
    t.is(createCamelCase('i am not but Will be'), 'iAmNotButWillBe');
    t.is(createCamelCase('First Letter Upper'), 'firstLetterUpper');
});