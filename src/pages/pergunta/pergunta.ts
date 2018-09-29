import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { SobrePage } from '../sobre/sobre';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'page-pergunta',
  templateUrl: 'pergunta.html',
})
export class PerguntaPage {

	@ViewChild(Content) content: Content;

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
			
			this.categoria = data["categorias"][this.indexPergunta];
			this.categoria.grupos = this.shuffle(this.categoria.grupos);
			this.perguntaAtual = this.categoria.grupos[this.indexPergunta];
			this.totalPerguntas = this.categoria.grupos.length;
			this.perguntaAtual.perguntas.forEach(x => {
				this.shuffle(x.opcoes);
			})
			//this.perguntaAtual.perguntas = this.shuffle(this.perguntaAtual.perguntas);
		})

	}

	encerrarPerguntas() {
		this.mostraRespostaCorreta = true;
		this.mostraBotaoProximaPergunta = true;

		this.content.scrollToTop(400);

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
			this.content.scrollToTop(400);
		}
	}

	terminouPerguntasCategoria () {
		return this.totalPerguntas < this.indexPergunta + 1;
	}

	mostraBackground(){
		this.perguntaAtual.perguntas.forEach(pergunta => {
			pergunta.opcoes.forEach(opcao => {

				if(pergunta.discursiva){
					opcao.resposta = opcao.resposta == null ? "" : opcao.resposta;
					opcao.isCorret = 
						(opcao.resposta.toLowerCase() == opcao.descricao.toLowerCase() &&
						this.mostraRespostaCorreta) ? 
						'correto' : 'errado';
				} else {
					opcao.marcado = (opcao.marcado == null) ? false : opcao.marcado;
					if(opcao.marcado || (opcao.correto && !opcao.marcado)){
						opcao.isCorrect = 
							(opcao.correto == opcao.marcado && this.mostraRespostaCorreta) ?
							'correto' : 'errado';
					}
				}
			});
		})
	}

	shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
	  
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
	  
		  // Pick a remaining element...
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
	  
		  // And swap it with the current element.
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}
	  
		return array;
	  }
}
