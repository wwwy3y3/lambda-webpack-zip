/// <reference types="node" />
import {Transform} from "stream";

export function Extract(params: {path: string}): Transform;

export function Parse(): Transform;
