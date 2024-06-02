import JSON5 from 'json5'
import * as fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

export function getFilePath() {
    return fileURLToPath(import.meta.url);
}

export function getDirPath() {
    return path.dirname(getFilePath());
}

const envKey: keyof EnvMap = 'default';

export interface Env {
    [key: string]: string | number | boolean | string[] | number[] | boolean[];

    host: string;
    port: number;
    token: string;
}

export interface EnvMap {
    [key: string]: Env;

    default: Env;
    dev: Env;
}

const json5ConfigFile = path.join(getDirPath(), '../.env.json5');
const envConfig = JSON5.parse(fs.readFileSync(json5ConfigFile, 'utf8'))
const ENV: EnvMap = envConfig


export function setEnv(env: keyof Env, value: string | number | boolean | string[] | number[] | boolean[]) {
    ENV[envKey][env] = value;
    fs.writeFileSync(json5ConfigFile, JSON5.stringify(ENV, null, 4));
}

export default ENV[envKey];