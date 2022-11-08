"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializers = void 0;
const type_guard_1 = require("@siren-js/core/dist/util/type-guard");
const merge_1 = require("../merge");
const entry_list_1 = require("./entry-list");
const multipart_form_data_1 = require("./multipart-form-data");
const name_value_pairs_1 = require("./name-value-pairs");
class Serializers extends Map {
    static get MULTIPART_FORM_DATA() {
        return (action) => {
            const entryList = (0, entry_list_1.toEntryList)(action);
            return (0, multipart_form_data_1.toMultipartFormData)(entryList);
        };
    }
    static get PLAIN_TEXT_FORM_DATA() {
        return (action) => {
            const entryList = (0, entry_list_1.toEntryList)(action);
            return (0, name_value_pairs_1.toNameValuePairs)(entryList).reduce((result, [name, value]) => `${result}${name}=${value}\r\n`, '');
        };
    }
    static get URL_ENCODED_FORM_DATA() {
        return (action) => {
            const entryList = (0, entry_list_1.toEntryList)(action);
            const nameValuePairs = (0, name_value_pairs_1.toNameValuePairs)(entryList);
            return new URLSearchParams(nameValuePairs);
        };
    }
    constructor(init) {
        super();
        if (init != null) {
            this.merge(init);
        }
    }
    /* istanbul ignore next: customizing parameter name */
    delete(mediaType) {
        return super.delete(mediaType);
    }
    /* istanbul ignore next: customizing parameter name */
    get(mediaType) {
        return super.get(mediaType);
    }
    /* istanbul ignore next: customizing parameter name */
    has(mediaType) {
        return super.has(mediaType);
    }
    set(mediaType, serializer) {
        if (!(0, type_guard_1.isMediaTypeString)(mediaType)) {
            throw new Error(`Invalid media type: '${mediaType}'`);
        }
        if (typeof serializer !== 'function') {
            throw new Error('Serializer must be a function');
        }
        return super.set(mediaType, serializer);
    }
    merge(that) {
        (0, merge_1.merge)(this, that, (source) => source instanceof Serializers || source instanceof Map);
    }
}
exports.Serializers = Serializers;
