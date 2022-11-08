import { Action } from '@siren-js/core';
import { Entry } from './entry';
export { Entry, EntryValue } from './entry';
export declare type EntryList = Entry[];
/**
 * Converts an `Action` to an `EntryList`. This is an implementation of the
 * algorithm for
 * [constructing the entry list](https://github.com/siren-js/spec-extensions#constructing-the-entry-list),
 * as defined in our Siren specification extensions.
 */
export declare function toEntryList(action: Pick<Action, 'fields'>): EntryList;
