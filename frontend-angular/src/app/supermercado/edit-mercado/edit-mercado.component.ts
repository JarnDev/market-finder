import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supermercado } from 'src/app/interfaces/supermercado.interface';
import { Observable } from 'rxjs';
import { GetMercadoService } from 'src/app/services/api-mercado/api-mercado.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-mercado',
  templateUrl: './edit-mercado.component.html',
  styleUrls: ['./edit-mercado.component.scss']
})
export class EditMercadoComponent implements OnInit {

  mercadoId: string
  public mainImg;
  public additionalImg: any[] = [];
  public supermercadoForm: FormGroup;
  private extraControl: FormArray;
  private mainControl: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private getMercadoService: GetMercadoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.supermercadoForm = this.formBuilder.group({
      superMarketName: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      superMarketDescription: this.formBuilder.control('', Validators.compose([Validators.maxLength(300)])),
      superMarketPhone: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^\\d+$')])),
      superMarketLocation: new FormGroup({
        street: this.formBuilder.control('', Validators.compose([Validators.required])),
        number: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^\\d+$')])),
        district: this.formBuilder.control('', Validators.compose([Validators.required])),
        city: this.formBuilder.control('', Validators.compose([Validators.required])),
        state: this.formBuilder.control('', Validators.compose([Validators.required])),
        country: this.formBuilder.control('', Validators.compose([Validators.required])),
        zip: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^\\d+$')]))
      }),
      superMarketMainImage: this.formBuilder.array([]),
      superMarketAdditionalImages: this.formBuilder.array([])
    })
    this.extraControl = this.supermercadoForm.controls['superMarketAdditionalImages'] as FormArray;
    this.mainControl = this.supermercadoForm.controls['superMarketMainImage'] as FormArray

    //this.control.push(this.formBuilder.control(2))
    this.mercadoId = this.route.snapshot.params.id;
    this.getMercadoService.getMercado(this.mercadoId).subscribe(mercado => {
      this.supermercadoForm.patchValue({
        superMarketName: mercado.superMarketName,
        superMarketDescription: mercado.superMarketDescription,
        superMarketPhone: mercado.superMarketPhone,
        superMarketLocation: mercado.superMarketLocation,
      })
      this.mainImg = mercado.superMarketMainImage;
      this.additionalImg = mercado.superMarketAdditionalImages;
    })
  }

  edit() {
    this.mainControl.push(this.formBuilder.control(this.mainImg))
    for (let item in this.additionalImg) {
      this.extraControl.push(this.formBuilder.control(this.additionalImg[item]))
    }
    this.getMercadoService.editMercado(this.mercadoId, this.supermercadoForm.value)
      .pipe(finalize(() => {
        this.router.navigate(['/']);
      }))
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  onSelectFile(id, event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          if (id == 'extra') {
            this.additionalImg.push(event.target.result)
          } else {
            this.mainImg = event.target.result
          }
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImg(ref, i) {
    if (ref == "extra") {
      this.extraControl.removeAt(i)
      this.additionalImg.splice(i, 1)
    } else {
      this.mainControl.removeAt[0]
      this.mainImg = ""
    }

  }



}