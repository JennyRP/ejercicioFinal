import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pais, createEmptyPais } from '../../models/pais.model';
import { PaisService } from '../../services/pais.service';
import { IdiomaService } from '../../services/idioma.service';
import { Idioma } from '../../models/idioma.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  paises: Pais[] = [];
  idiomasDisponibles: Idioma[] = [];
  paisActual: Pais = createEmptyPais();
  idiomasSeleccionados: string[] = [];
  modoEdicion = false;
  mensajeError = '';

  constructor(
    private paisService: PaisService,
    private idiomaService: IdiomaService
  ) {
    this.cargarPaises();
    this.cargarIdiomas();
  }

  cargarPaises(): void {
    this.paisService.getPaises().subscribe({
      next: (paises) => this.paises = paises,
      error: (err) => this.mostrarError('Error al cargar países: ' + err.message)
    });
  }

  cargarIdiomas(): void {
    this.idiomaService.getIdiomas().subscribe({
      next: (idiomas) => this.idiomasDisponibles = idiomas,
      error: (err) => this.mostrarError('Error al cargar idiomas: ' + err.message)
    });
  }

  async guardarPais(): Promise<void> {
    try {
      if (!this.paisActual.nombre) {
        this.mostrarError('El nombre es requerido');
        return;
      }

      // Asignar los idiomas seleccionados al país
      this.paisActual.idiomas = this.idiomasSeleccionados;

      if (this.modoEdicion && this.paisActual.id) {
        await this.paisService.actualizarPais(this.paisActual);
      } else {
        await this.paisService.agregarPais(this.paisActual);
      }

      this.resetForm();
      this.cargarPaises();
    } catch (error) {
      this.mostrarError('Error al guardar: ' + (error as Error).message);
    }
  }

  editarPais(pais: Pais): void {
    this.paisActual = { ...pais };
    this.idiomasSeleccionados = [...pais.idiomas];
    this.modoEdicion = true;
  }

  async eliminarPais(id: string): Promise<void> {
    try {
      await this.paisService.eliminarPais(id);
      this.cargarPaises();
    } catch (error) {
      this.mostrarError('Error al eliminar: ' + (error as Error).message);
    }
  }

  toggleIdiomaSeleccionado(idiomaId: string): void {
    const index = this.idiomasSeleccionados.indexOf(idiomaId);
    if (index === -1) {
      this.idiomasSeleccionados.push(idiomaId);
    } else {
      this.idiomasSeleccionados.splice(index, 1);
    }
  }

  idiomaEstaSeleccionado(idiomaId: string): boolean {
    return this.idiomasSeleccionados.includes(idiomaId);
  }

  obtenerNombreIdioma(idiomaId: string): string {
    const idioma = this.idiomasDisponibles.find(i => i.id === idiomaId);
    return idioma ? idioma.nombre : 'Desconocido';
  }

  resetForm(): void {
    this.paisActual = createEmptyPais();
    this.idiomasSeleccionados = [];
    this.modoEdicion = false;
    this.mensajeError = '';
  }

  private mostrarError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => this.mensajeError = '', 5000);
  }
}