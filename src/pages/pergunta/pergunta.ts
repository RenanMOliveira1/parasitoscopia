import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SobrePage } from '../sobre/sobre';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'page-pergunta',
  templateUrl: 'pergunta.html',
})
export class PerguntaPage {

	private indexPergunta = 0;
	private totalPerguntas = 0;
	private categoria = null;

	mostraRespostaCorreta = false;
	mostraBotaoProximaPergunta = false;
	perguntaAtual = { perguntas: []};

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
		// let categoriaIndex = navParams.get("categoria");

		this.indexPergunta = 0;

		this.http.get('./assets/json/json.json').subscribe(data => {
			this.categoria = data["categorias"][this.indexPergunta]
			this.perguntaAtual = this.categoria.grupos[this.indexPergunta];
			this.totalPerguntas = this.categoria.grupos.length;
			console.log(this.perguntaAtual);
		})

	}

	encerrarPerguntas() {
		this.mostraRespostaCorreta = true;
		this.mostraBotaoProximaPergunta = true;

		this.mostraBackground();
	}

	mostraProximaPergunta() {
		this.mostraRespostaCorreta = false;
		this.mostraBotaoProximaPergunta = false;
		this.indexPergunta++;
		if(this.terminouPerguntasCategoria()){
			this.navCtrl.setRoot(SobrePage);
		} else {
			this.perguntaAtual = this.categoria.grupos[this.indexPergunta]
		}
	}

	terminouPerguntasCategoria () {
		return this.totalPerguntas < this.indexPergunta + 1;
	}

	mostraBackground(){
		console.log(this.mostraRespostaCorreta);
		this.perguntaAtual.perguntas.forEach(pergunta => {
			pergunta.opcoes.forEach(opcao => {
				opcao.isCorrect = 
					(opcao.correto == opcao.marcado && this.mostraRespostaCorreta) ?
					'correto' : 'errado';
			});
		})
	}
}
