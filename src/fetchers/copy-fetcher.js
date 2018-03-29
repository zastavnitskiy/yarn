/* @flow */

import type {FetchedOverride} from '../types.js';
import BaseFetcher from './base-fetcher.js';
import * as fs from '../util/fs.js';

export default class CopyFetcher extends BaseFetcher {
  async _fetch(): Promise<FetchedOverride> {
    await fs.copy(this.reference, this.dest, this.reporter);
  
    /* 
    Question one: once we have a copy of the file tree, we have 2 options,

      Option one: 
        read files field from package.json
        delete all the files that do not match regexp
        
      Option two:
        run pack command for this directory

      Each has downsides – with first one, we will be missing out on other 
      task that publish may perform.

      For the second one, we may have issues, with repos that are not intended for publising. Maybe.
      
    Question two?
      Should we also do this for other fetchers? Which?

    */
    
    return {
      hash: this.hash || '',
      resolved: null,
    };
  }
}
