import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  image = "";
  profileImg;
  change:boolean = false;
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;

  infoForm: FormGroup;

  loadingSubscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor( private toastr: ToastrService, private storage: AngularFireStorage ) { }

  ngOnInit() {
    this.infoForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'facebook': new FormControl(''),
      'pinterest': new FormControl(''),
      'twitter': new FormControl(''),
      'instagram': new FormControl(''),
      'linkedin': new FormControl(''),
      'github': new FormControl(''),
      'bgColor': new FormControl('white'),
      'contColor': new FormControl('white'),
      'titleColor': new FormControl('white'),
      'txtColor': new FormControl('white'),
      'fooColor': new FormControl('white'),
      'socColor': new FormControl('white'),
      'iconColor': new FormControl('white')
    })
  }
  
  // Funcion para tomar la imagen
  clickInput(idElem){
    //console.log(idElem)
    this.toastr.success('Hello world!', 'Toastr fun!');
    let id = idElem;
    document.getElementById(id).click();
  }

  // Funcion para mostrar preview de profile
  mostrarImagen(input,id) {
    if (input.files && input.files[0]) {
     let reader = new FileReader();
     reader.onload =  (e) => {
      let img: any = document.getElementById("img_destino");
      img.setAttribute('src',reader.result);
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
    const filePath = 'profile';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // upload image to server
    task.snapshotChanges().pipe(
      finalize(() => {fileRef.getDownloadURL().subscribe(x=>{
        console.log(x)
      })} )
   ).subscribe()


  }

  sendInfo(){
    console.log(this.infoForm.value);
  }
  
}
