
// Represents how the tokens can be switched.
// It may seem a simple on off state, but I then realised that if you toggle
// a token off by a pattern but want one of the tokens back on again
export enum TokenState {
  NO_CHANGE = 1,  // this token has not been added or removed by the filters
  PATTERN_OFF,    // this token is off/removed by a pattern matching option
  OFF,            // this token is off by individual selection
  ON              // this token has been turned back on after being pattern removed
}

export class tokenList
{
  constructor (filename: string)
  {
    const extentionDot = filename.lastIndexOf(".");
    const extention = filename.substring(extentionDot, filename.length);
  }
}