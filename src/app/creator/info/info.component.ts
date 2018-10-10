import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  image = "";
  profileImg;
  change:boolean = false;

  constructor() { }

  ngOnInit() {
  }
  
  // Funcion para tomar la imagen
  clickInput(idElem){
    //console.log(idElem)
    let id = idElem;
    document.getElementById(id).click();
  }

  // Funcion para mostrar preview de profile
  mostrarImagen(input,id) {
    if (input.files && input.files[0]) {
     let reader = new FileReader();
     reader.onload =  (e) => {
      let img: any = document.getElementById("img_destino");
      console.log(document.getElementById("img_destino"))
      img.setAttribute('src',reader.result);
      console.log(reader.result);
     }
     reader.readAsDataURL(input.files[0]);
    }
  };

 // Funcion que detecta el input file
  cambio($event, img){
    // Tomar la imagen
    let file = $event.target.files[0];
    this.change = true;
    this.mostrarImagen($event.target,img);
    this.profileImg = file;
  }
}
