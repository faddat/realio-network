/* eslint-disable */
import { Token } from '../asset/token';
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'realiotech.network.asset';
const baseGenesisState = { portId: '' };
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        if (message.portId !== '') {
            writer.uint32(10).string(message.portId);
        }
        for (const v of message.tokenList) {
            Token.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.tokenList = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.tokenList.push(Token.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.tokenList = [];
        if (object.portId !== undefined && object.portId !== null) {
            message.portId = String(object.portId);
        }
        else {
            message.portId = '';
        }
        if (object.tokenList !== undefined && object.tokenList !== null) {
            for (const e of object.tokenList) {
                message.tokenList.push(Token.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        if (message.tokenList) {
            obj.tokenList = message.tokenList.map((e) => (e ? Token.toJSON(e) : undefined));
        }
        else {
            obj.tokenList = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.tokenList = [];
        if (object.portId !== undefined && object.portId !== null) {
            message.portId = object.portId;
        }
        else {
            message.portId = '';
        }
        if (object.tokenList !== undefined && object.tokenList !== null) {
            for (const e of object.tokenList) {
                message.tokenList.push(Token.fromPartial(e));
            }
        }
        return message;
    }
};
