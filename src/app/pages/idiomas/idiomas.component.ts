import { Component, OnInit } from '@angular/core';
import { Idioma } from '../../models/idioma.model';
import { IdiomaService } from '../../services/idioma.service';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa FormBuilder y FormGroup
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-idiomas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {
  idiomas: any[] = [];
  idiomaForm: FormGroup; // Declara la propiedad idiomaForm
  paises: any[] = [];

  constructor(
    private idiomaService: IdiomaService,
    private paisService: PaisService,
    private fb: FormBuilder // Inyecta FormBuilder
  ) {
    this.idiomaForm = this.fb.group({ // Inicializa idiomaForm como un FormGroup
      id: [''],
      nombre: ['', Validators.required],
      codigoISO: ['', Validators.required],
      numeroHablantes: [''],
      paisesHablantes: [''],
      esOficialONU: [false]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getIdiomas();
    await this.getPaises();
  }

  async getIdiomas(): Promise<void> {
    this.idiomas = await firstValueFrom(this.idiomaService.getIdiomas());
  }

  async getPaises(): Promise<void> {
    this.paises = await firstValueFrom(this.paisService.getPaises());
  }

  async insertarIdioma(): Promise<void> {
    if (this.idiomaForm.valid) {
      await this.idiomaService.agregarIdioma(this.idiomaForm.value);
      this.idiomaForm.reset();
      await this.getIdiomas();
    } else {
      console.log('El formulario no es válido');
    }
  }

  seleccionarIdioma(idiomaSeleccionado: Idioma): void {
    this.idiomaForm.patchValue(idiomaSeleccionado);
  }

  async actualizarIdioma(): Promise<void> {
    if (this.idiomaForm.valid && this.idiomaForm.value.id) {
      await this.idiomaService.modificarIdioma(this.idiomaForm.value);
      this.idiomaForm.reset();
      await this.getIdiomas();
    } else {
      console.log('No se puede actualizar o el formulario no es válido');
    }
  }

  async eliminarIdioma(): Promise<void> {
    const id = this.idiomaForm.get('id')?.value;
    if (id && confirm('¿Estás seguro de que deseas eliminar este idioma?')) {
      await this.idiomaService.eliminarIdioma(id);
      this.idiomaForm.reset();
      await this.getIdiomas();
    }
  }
}