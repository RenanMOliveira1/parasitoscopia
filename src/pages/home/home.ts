import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerguntaPage } from '../pergunta/pergunta';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    categorias = [];
    goToPergunta: Function;

    constructor(public navCtrl: NavController, public http: HttpClient) {
        
        this.http.get('./assets/json/json.json').subscribe(data => {
			this.categorias= data["categorias"].map(x => {
                return {
                    imagem: x.grupos[Math.floor(Math.random() * 6) + 1].imagem,
                    nome: x.categoria
                }
            })
		})

        this.goToPergunta = function(index: Number){

            this.navCtrl.push(PerguntaPage, {
                categoria: index
            });
        }
    }

    

}
