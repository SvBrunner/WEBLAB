import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from './entities/role.enum';

@Injectable()
export class AuthService {
  rounds = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (user == null || user.password == null)
      throw new UnauthorizedException();
    const result = await bcrypt.compare(pass, user.password);
    if (result) {
      const payload = {
        sub: user.id,
        username: user.username,
        roles: user.roles,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  register(username: string, password: string) {
    bcrypt.hash(password, this.rounds, async (err, hash) => {
      if (err) {
        throw new InternalServerErrorException('Failed hashing');
      }
      const user = new User();
      user.username = username;
      user.password = hash;
      user.roles = [Role.User];
      await this.usersService.createUser(user);
    });
  }
}
