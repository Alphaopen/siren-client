import { EntryList } from './entry-list';
/**
 * Implementation of the algorithm to
 * [convert an entry list to a list of name-value pairs](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs),
 * from the WHATWG's HTML standard.
 */
export declare function toNameValuePairs(entryList: EntryList): [string, string][];
