export interface Serialization {
    mediaType: string;
    body: BodyInit;
}
export declare function isSerialization(value: unknown): value is Serialization;
export default Serialization;
