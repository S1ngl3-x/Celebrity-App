import { HttpService, Injectable } from '@nestjs/common';
import SwiftApiUnavailableException from './exceptions/swiftApiUnavailable.exception';

@Injectable()
export class SwiftService {
  constructor(private httpService: HttpService) {}

  async getRandomQuote(): Promise<string> {
    const response = await this.httpService.get('https://api.taylor.rest').toPromise();
    if (response?.data?.quote) return response.data.quote;
    throw new SwiftApiUnavailableException();
  }
}
