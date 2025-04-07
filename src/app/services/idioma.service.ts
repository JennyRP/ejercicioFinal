import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc 
} from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { Idioma } from '../models/idioma.model';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  private db: Firestore = inject(Firestore);

  getIdiomas() {
    const idiomasCollection = collection(this.db, 'idiomas');
    return collectionData(idiomasCollection, { idField: 'id' }).pipe(
      first(),
      map(idiomas => {
        // Conversión explícita de tipo y validación básica
        return idiomas.map(idioma => ({
          id: idioma['id'],
          nombre: idioma['nombre'] || '',
          codigoISO: idioma['codigoISO'] || '',
          paisesHablantes: idioma['paisesHablantes'] || [],
          numeroHablantes: idioma['numeroHablantes'] || 0,
          esOficialONU: idioma['esOficialONU'] || false
        } as Idioma));
      })
    );
  }

  agregarIdioma(idioma: Idioma) {
    const idiomasCollection = collection(this.db, 'idiomas');
    return addDoc(idiomasCollection, {
      nombre: idioma.nombre,
      codigoISO: idioma.codigoISO,
      paisesHablantes: idioma.paisesHablantes,
      numeroHablantes: idioma.numeroHablantes,
      esOficialONU: idioma.esOficialONU
    });
  }

  modificarIdioma(idioma: Idioma) {
    const idiomaDocRef = doc(this.db, 'idiomas', idioma.id);
    return updateDoc(idiomaDocRef, {
      nombre: idioma.nombre,
      codigoISO: idioma.codigoISO,
      paisesHablantes: idioma.paisesHablantes,
      numeroHablantes: idioma.numeroHablantes,
      esOficialONU: idioma.esOficialONU
    });
  }

  eliminarIdioma(idioma: Idioma) {
    const idiomaDocRef = doc(this.db, 'idiomas', idioma.id);
    return deleteDoc(idiomaDocRef);
  }
}