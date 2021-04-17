import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>, private readonly jwtService: JwtService){ }

    async validate(login: string, password: string): Promise<any>{
        const user: UserEntity = await this.repository.findOne({where: { username: ILike(login) }});
        if(!user){ return null; }

        const correct = await bcrypt.compare(password, user.hash);

        if(correct){
            const { hash: password, ...result } = user;
            return result;
        }else {
            return null;
        }
    }

    async login(user: UserEntity){
        const payload = { username: user.username, sub: user.id };
        return { ...user, access_token: this.jwtService.sign(payload) }
    }

    async hashPassword(password: string){
        const rounds = 10;
        const salt = await bcrypt.genSalt(rounds);
        return bcrypt.hash(password, salt);
    }

    async findUserById(id: number): Promise<UserEntity | undefined> {
        return this.repository.findOne({where: { id: id }})
    }
}
