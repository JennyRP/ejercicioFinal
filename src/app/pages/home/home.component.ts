import { Component } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { PaisService } from '../../services/pais.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  paises: any;
  pais: Pais = new Pais();

  constructor(private paisService: PaisService) {
    this.getPaises();
  }

  async getPaises(): Promise<void> {
    this.paises = await firstValueFrom(this.paisService.getPaises());
  }

  insertarPais(): void {
    this.paisService.agregarPais(this.pais);
    this.getPaises();
    this.pais = new Pais();
  }

  selectPais(paisSeleccionado: Pais): void {
    this.pais = { ...paisSeleccionado };
  }

  updatePais(): void {
    this.paisService.modificarPais(this.pais);
    this.pais = new Pais();
    this.getPaises();
  }

  deletePais(): void {
    this.paisService.eliminarPais(this.pais);
    this.pais = new Pais();
    this.getPaises();
  }
}
