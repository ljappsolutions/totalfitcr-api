import * as loglevel from 'loglevel';

loglevel.setLevel(process.env.IS_OFFLINE !== undefined ? loglevel.levels.DEBUG : loglevel.levels.ERROR);

const log = (...msg: any[]) => {
  loglevel.debug(msg);
}

const error = (...msg: any[]) => {
  loglevel.error(msg);
}

export const logger = {
  log,
  error,
}
