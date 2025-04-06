import { Injectable, inject } from '@angular/core';
import { Pais } from '../models/pais.model';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private db: Firestore = inject(Firestore);

  constructor() {}

  // Obtener todos los países
  getPaises() {
    const paisesCollection = collection(this.db, 'paises');
    return collectionData(paisesCollection, { idField: 'id' })
      .pipe(first());
  }

  // Agregar un nuevo país
  agregarPais(pais: Pais) {
    const paisesCollection = collection(this.db, 'paises');
    const paisData = {
      nombre: pais.nombre,
      descripcion: pais.descripcion,
      capital: pais.capital,
      continente: pais.continente,
      moneda: pais.moneda,
      poblacion: pais.poblacion,
      clima: pais.clima,
      esPaisMiembroONU: pais.esPaisMiembroONU
    };
    addDoc(paisesCollection, paisData);
  }

  // Modificar un país existente
  modificarPais(pais: Pais) {
    const paisDocRef = doc(this.db, 'paises', pais.id);
    updateDoc(paisDocRef, {
      nombre: pais.nombre,
      descripcion: pais.descripcion,
      capital: pais.capital,
      continente: pais.continente,
      moneda: pais.moneda,
      poblacion: pais.poblacion,
      clima: pais.clima,
      esPaisMiembroONU: pais.esPaisMiembroONU
    });
  }

  // Eliminar un país
  eliminarPais(pais: Pais) {
    const paisDocRef = doc(this.db, 'paises', pais.id);
    deleteDoc(paisDocRef);
  }
}
