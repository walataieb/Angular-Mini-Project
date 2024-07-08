import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { SalleService } from '../../services/salle-service';
import { Salle } from '../../models/salle';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-salle',
  templateUrl: './add-salle.component.html',
  styleUrls: ['./add-salle.component.css']
})
export class AddSalleComponent implements OnInit {

  nameSalle?: string;
  capacite?: Number;
  equipement?: [String];
  public salle?: Salle;
  public updsalle?: Salle;
  form_data?: FormData;

  constructor(   private ref: DynamicDialogRef,
    private salleService: SalleService,
    private config?: DynamicDialogConfig
  ) {
      if (this.config?.data) {
        this.updsalle= this.config.data.salle;
        this.nameSalle = this.config.data.nameSalle;
        this.capacite = this.updsalle?.capacite;
        this.equipement = this.updsalle?.equipement;
      }

     }

  ngOnInit(): void {
  }

  //ADD OR UPDATE THE SALLE RECORD
  save() {
    if (!this.updsalle) {
      this.salle = new Salle();
      this.salle.nameSalle = this.nameSalle;
      this.salle.capacite = this.capacite;
      this.salle.equipement = this.equipement;
      this.salleService
        .addSalle(this.salle)
        .pipe(take(1))
        .subscribe((data) => {
          console.log(data);
          this.ref.close(this.salle);
        });
    } else {
      this.updsalle.nameSalle = this.nameSalle;
      this.updsalle.capacite = this.capacite;
      this.updsalle.equipement = this.equipement;
      this.salleService
        .updateSalle(this.updsalle.nameSalle, this.updsalle)
        .pipe(take(1))
        .subscribe((data:any) => {
          console.log(this.updsalle);
          this.ref.close(data.data);
        });
    }
  }

}
