import { ServiceUnavailableException } from '@nestjs/common';

class SwiftApiUnavailableException extends ServiceUnavailableException {
  constructor() {
    super(`Taylor Swift API is unavailable`);
  }
}

export default SwiftApiUnavailableException;
