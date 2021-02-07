import { LogTypeENUM } from '../enums/logtype';

export interface LogDTO {
  log: string;
  type: LogTypeENUM;
}
