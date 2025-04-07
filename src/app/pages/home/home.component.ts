import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Pais, createEmptyPais } from '../../models/pais.model';
import { PaisService } from '../../services/pais.service';
import { IdiomaService } from '../../services/idioma.service';
import { Idioma } from '../../models/idioma.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paises: Pais[] = [];
  idiomasDisponibles: Idioma[] = [];
  paisForm: FormGroup; // Usamos FormGroup
  idiomasSeleccionados: string[] = [];
  modoEdicion = false;
  mensajeError = '';

  constructor(
    private paisService: PaisService,
    private idiomaService: IdiomaService,
    private fb: FormBuilder // Inyectamos FormBuilder
  ) {
    this.paisForm = this.fb.group({ // Inicializamos el formulario
      id: [''],
      nombre: ['', Validators.required],
      capital: [''],
      continente: [''],
      moneda: [''],
      poblacion: [''],
      clima: [''],
      esPaisMiembroONU: [false]
    });
  }

  ngOnInit(): void {
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
    if (this.paisForm.valid) {
      const paisData = this.paisForm.value;
      paisData.idiomas = this.idiomasSeleccionados; // Asignamos idiomas seleccionados

      try {
        if (this.modoEdicion && paisData.id) {
          await this.paisService.actualizarPais(paisData);
        } else {
          await this.paisService.agregarPais(paisData);
        }
        this.resetForm();
        this.cargarPaises();
      } catch (error) {
        this.mostrarError('Error al guardar: ' + (error as Error).message);
      }
    } else {
      this.mostrarError('Por favor, completa el nombre del país.');
    }
  }

  editarPais(pais: Pais): void {
    this.modoEdicion = true;
    this.paisForm.patchValue(pais);
    this.idiomasSeleccionados = pais.idiomas ? [...pais.idiomas] : [];
  }

  async eliminarPais(id: string): Promise<void> {
    if (confirm('¿Estás seguro de que deseas eliminar este país?')) {
      try {
        await this.paisService.eliminarPais(id);
        this.cargarPaises();
        this.resetForm();
      } catch (error) {
        this.mostrarError('Error al eliminar: ' + (error as Error).message);
      }
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
    this.modoEdicion = false;
    this.paisForm.reset();
    this.idiomasSeleccionados = [];
    this.mensajeError = '';
  }

  private mostrarError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => this.mensajeError = '', 5000);
  }
}