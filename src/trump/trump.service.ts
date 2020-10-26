import { HttpService, Injectable } from '@nestjs/common';
import TrumpApiUnavailableException from './exceptions/trumpApiUnavailable.exception';

@Injectable()
export class TrumpService {
  constructor(private httpService: HttpService) {}

  async getRandomQuote(): Promise<string> {
    const response = await this.httpService
      .get('https://api.whatdoestrumpthink.com/api/v1/quotes/random')
      .toPromise();
    if (response?.data?.message) return response.data.message;
    throw new TrumpApiUnavailableException();
  }
}
