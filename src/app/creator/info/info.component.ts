import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfoService } from '../info.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { InfoModel } from '../models/info.model';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit,OnDestroy {

  image = "";
  profileImg;
  change: boolean = false;
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;

  infoForm: FormGroup;

  loadingSubscription: Subscription = new Subscription();
  loading: boolean = false;

  info: InfoModel;

  urlImg: string = "";

  constructor(private toastr: ToastrService, private storage: AngularFireStorage,
    private infoService: InfoService, private store: Store<AppState>,
    private authService: AuthService) {
    this.infoForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'age': new FormControl(10, Validators.min(10)),
      'phone': new FormControl('', Validators.required),
      'facebook': new FormControl(''),
      'pinterest': new FormControl(''),
      'twitter': new FormControl(''),
      'instagram': new FormControl(''),
      'linkedin': new FormControl(''),
      'github': new FormControl(''),
      'bgColor': new FormControl(''),
      'contColor': new FormControl(''),
      'titleColor': new FormControl(''),
      'txtColor': new FormControl(''),
      'fooColor': new FormControl(''),
      'socColor': new FormControl(''),
      'iconColor': new FormControl('')
    })
  }

  ngOnInit() {

    this.store.select('info').subscribe(data => {
      this.info = data.info;
      if (this.info != null) {
        this.infoForm.setValue({
          'name': this.info.name,
          'title': this.info.title,
          'email': this.info.email,
          'country': this.info.country,
          'city': this.info.city,
          'age': this.info.age,
          'phone': this.info.phone,
          'facebook': this.info.facebook,
          'pinterest': this.info.pinterest,
          'twitter': this.info.twitter,
          'instagram': this.info.instagram,
          'linkedin': this.info.linkedin,
          'github': this.info.github,
          'bgColor': this.info.bgColor,
          'contColor': this.info.contColor,
          'titleColor': this.info.titleColor,
          'txtColor': this.info.txtColor,
          'fooColor': this.info.fooColor,
          'socColor': this.info.socColor,
          'iconColor': this.info.iconColor
        })
        this.urlImg = this.info.image;
        if(this.urlImg != "") this.change= true;
      }
    });

    this.loadingSubscription = this.store.select('ui').subscribe(data => {
      this.loading = data.isLoading;
    })

  }

  // Funcion para tomar la imagen
  clickInput(idElem) {
    //console.log(idElem)
    let id = idElem;
    document.getElementById(id).click();
  }

  // Funcion para mostrar preview de profile
  mostrarImagen(input, id) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let img: any = document.getElementById("img_destino");
        img.setAttribute('src', reader.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  };

  // Funcion que detecta el input file
  cambio($event, img) {
    // Tomar la imagen
    let file = $event.target.files[0];
    this.change = true;
    this.mostrarImagen($event.target, img);
    let user = this.authService.getUSer();
    const filePath = `${ user.uid }-Profile`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // upload image to server
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(x => {
          this.urlImg = x;
          this.sendInfo();
          this.toastr.success('The image was upload succesfully!', 'Done');

        })
      })
    ).subscribe();
  }

  sendInfo() {
    const INFO = new InfoModel({...this.infoForm.value, image:this.urlImg})
    this.infoService.updateInfo(INFO).then(data=>{
      this.toastr.success('Your information was update succefully', 'Done');
    }).catch(err=>{
      this.toastr.error('Something was wrong', 'try later');
      console.log(err)
    })
  }


  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }
  

}
