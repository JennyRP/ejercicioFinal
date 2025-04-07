// src/app/pages/idiomas/idiomas.component.ts
import { Component } from '@angular/core';
import { Idioma } from '../../models/idioma.model';
import { IdiomaService } from '../../services/idioma.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-idiomas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './idiomas.component.html',
  styleUrl: './idiomas.component.css'
})
export class IdiomasComponent {
  idiomas: any;
  idioma: Idioma = new Idioma();
  paises: any[] = []; // Para selección de países hablantes

  constructor(
    private idiomaService: IdiomaService,
    private paisService: PaisService
  ) {
    this.getIdiomas();
    this.getPaises();
  }

  async getIdiomas(): Promise<void> {
    this.idiomas = await firstValueFrom(this.idiomaService.getIdiomas());
  }

  async getPaises(): Promise<void> {
    this.paises = await firstValueFrom(this.paisService.getPaises());
  }

  insertarIdioma(): void {
    this.idiomaService.agregarIdioma(this.idioma);
    this.getIdiomas();
    this.idioma = new Idioma();
  }

  selectIdioma(idiomaSeleccionado: Idioma): void {
    this.idioma = { ...idiomaSeleccionado };
  }

  updateIdioma(): void {
    this.idiomaService.modificarIdioma(this.idioma);
    this.idioma = new Idioma();
    this.getIdiomas();
  }

  deleteIdioma(): void {
    this.idiomaService.eliminarIdioma(this.idioma);
    this.idioma = new Idioma();
    this.getIdiomas();
  }
}