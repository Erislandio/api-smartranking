import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
import { CriarJogadorDTO } from './DTOs/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { IJogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadorService: JogadoresService) { }

    @Post()
    public async criarAtualizarJogador(@Body() jogador: CriarJogadorDTO) {
        return this.jogadorService.criarAtualizarJogador(jogador);
    }


    @Get()
    public async consultarJogadorPorEmail(@Query("email") email: string): Promise<IJogador | IJogador[]> {
        if (email) {
            return this.jogadorService.consultarPorEmail(email);
        } else {
            return this.jogadorService.listarJogadores();
        }
    }

    @Delete()
    public async deletarJogador(@Query("email") email: string): Promise<void> {
        return this.jogadorService.deletarJogador(email);
    }

}
