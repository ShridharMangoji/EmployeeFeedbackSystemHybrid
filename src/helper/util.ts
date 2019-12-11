
import { AlertController } from 'ionic-angular';

export abstract  class PassingParameter{
    public static tabNavigation:string;
   
    
}

export class Util{
    constructor( public alertCtrl: AlertController){

    }
    showAlert(title: string, message: string) {
        const alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
        });
        alert.present();
      }
}