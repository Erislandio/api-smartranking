import { Injectable, Logger, NotFoundException, InternalServerErrorException, HttpStatus, HttpException } from '@nestjs/common';
import { CriarJogadorDTO } from './DTOs/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel("Jogador") private readonly jogadorModule: Model<IJogador>) { }

    private readonly logger = new Logger(JogadoresService.name);

    public async criarAtualizarJogador(jogador: CriarJogadorDTO) {
        return this.criar(jogador);
    }

    public async listarJogadores(): Promise<IJogador[]> {
        return this.jogadorModule.find().exec();
    }

    public async consultarPorEmail(email: string): Promise<IJogador> {
        const jogador = await this.buscarEmail(email);

        if (!jogador) {
            throw new NotFoundException(`Jogador com o email: ${email} não foi encontrado`);
        }

        return jogador;

    }


    private async buscarEmail(userEmail: string): Promise<IJogador> {
        const jogador = await this.jogadorModule.findOne({ email: userEmail });
        return jogador;
    }

    private async atualizarJogador(user: IJogador, jogador: CriarJogadorDTO): Promise<IJogador> {

        await this.jogadorModule.findOneAndUpdate({
            email: jogador.email,
        }, {
            nome: user.nome,
        });

        const findUser = await this.buscarEmail(user.email);

        return findUser;

    }

    public async deletarJogador(userEmail: string): Promise<void> {
        const jogador = await this.buscarEmail(userEmail);

        if (!jogador) {
            throw new NotFoundException(`Jogador com o email: ${userEmail} não foi encontrado`);
        }

        this.jogadorModule.findOneAndDelete({
            email: userEmail
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            throw new InternalServerErrorException(error.message);
        });

    }

    private async criar(jogador: CriarJogadorDTO): Promise<IJogador> {
        try {
            const { email, nome, telefone } = jogador;

            const user = await this.buscarEmail(email);

            if (user) {
                return this.atualizarJogador(user, jogador);
            }

            const newUser = await this.jogadorModule.create({
                imageUrl: "",
                nome,
                posicaoRanking: "",
                ranking: "",
                email,
                telefone,
            })

            return newUser;

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
