import { ServiceUnavailableException } from '@nestjs/common';

class TrumpApiUnavailableException extends ServiceUnavailableException {
  constructor() {
    super(`Donald Trump API is unavailable`);
  }
}

export default TrumpApiUnavailableException;
