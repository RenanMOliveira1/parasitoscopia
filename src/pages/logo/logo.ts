import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-logo',
  templateUrl: 'logo.html',
})
export class LogoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      setTimeout(x => {
        this.navCtrl.setRoot(HomePage);
      }, 3000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoPage');
  }

}
