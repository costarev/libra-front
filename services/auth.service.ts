import {AuthResponseDto} from './../dtos/auth-response.interface';
import {AuthRequest} from './../models/auth-request.interface';
import {ApiService} from './api.service';

export class AuthService {
  static useAuth(login: string, password: string): Promise<AuthResponseDto> {
    return ApiService.post<AuthRequest, AuthResponseDto>('/api/login', {}, {login, password});
  }
}
