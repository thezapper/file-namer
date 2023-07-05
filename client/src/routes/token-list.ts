import { repeatedWords } from './stores'

// Represents how the tokens can be switched.
// It may seem a simple on off state, but I then realised that if you toggle
// a token off by a pattern but want one of the tokens back on again
export enum TokenState {
  NO_CHANGE = 0,  // this token has not been added or removed by the filters
  PATTERN_OFF,    // this token is off/removed by a pattern matching option
  OFF,            // this token is off by individual selection
  ON              // this token has been turned back on after being pattern removed
}

export class tokenList
{
  _repeatedWords = repeatedWords;
  tokenVisibility: TokenState[];
  tokens: string[];
  finalName = "";
  extension = "";

  onUpdatePattern = (theNewSet:Set<string>) =>
  {
    this.tokens.forEach( (token, idx) => {
      // If a token has been added to the set
      if (theNewSet.has(token))
        this.tokenVisibility[idx] = TokenState.PATTERN_OFF;
      else
      // was a token removed?  We have to work out what it was.
      if (this.tokenVisibility[idx] === TokenState.PATTERN_OFF)
      {
        // if it was set to PATTERN_OFF but is no longer in the list...
        this.tokenVisibility[idx] = TokenState.NO_CHANGE;
      }
    })

    // console.log(this.tokenVisibility);
  }

  constructor (filename: string, delims: string)
  {
    const regex = new RegExp('[' + delims + ']');
    const extensionDot = filename.lastIndexOf(".");
    this.extension = filename.substring(extensionDot, filename.length);

    this.tokens = filename.substring(0,extensionDot).split(regex).filter(word => word.length > 0);

    this.finalName = this.tokens.join(' ') + this.extension;

    this.tokenVisibility = new Array<TokenState>(this.tokens.length);
    this.tokenVisibility.fill(TokenState.NO_CHANGE);

    this._repeatedWords.subscribe(this.onUpdatePattern);  
  }


  // when a single token in the list is selected
  loneToken = (idx: number) =>
  {
    switch (this.tokenVisibility[idx]) 
    {
      // It's never been touched.. switch off
      case TokenState.NO_CHANGE:
        this.tokenVisibility[idx] = TokenState.OFF;
        break;

      // It was turned off by individual selection.. back to default
      case TokenState.OFF:
        this.tokenVisibility[idx] = TokenState.NO_CHANGE;
        break;

      // It's been turned off by a pattern.. force back on
      case TokenState.PATTERN_OFF:
        this.tokenVisibility[idx] = TokenState.ON;
        break;

      // After being pattern off, it was lone turned back on, so now go back to pattern off 
      case TokenState.ON:
        this.tokenVisibility[idx] = TokenState.PATTERN_OFF;
        break;
    }
  
    // console.log(this.tokenVisibility);

    return this.generateBoolList();
  }
  
  generateBoolList = () =>
  {
    return this.tokenVisibility.map((val) => {
      if (val === TokenState.NO_CHANGE || val === TokenState.ON)
        return true;
      else
        return false;
    })
  }

  generateFilename = () =>
  {
    const visibleTokens = this.tokens.filter( 
      (val, i) => 
        this.tokenVisibility[i] === TokenState.NO_CHANGE ||
        this.tokenVisibility[i] === TokenState.ON);

    this.finalName = visibleTokens.join(' ') + this.extension;

    return this.finalName;
  }

  // when a token is selected for a pattern
  // patternToken = (tok: string) =>
  // {
  //   return;
  // }


}