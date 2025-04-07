import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  arrayUnion,
  arrayRemove 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private firestore: Firestore = inject(Firestore);

  getPaises(): Observable<Pais[]> {
    const paisesRef = collection(this.firestore, 'paises');
    return collectionData(paisesRef, { idField: 'id' }) as Observable<Pais[]>;
  }

  async agregarPais(pais: Pais): Promise<string> {
    const paisesRef = collection(this.firestore, 'paises');
    const docRef = await addDoc(paisesRef, pais);
    return docRef.id;
  }

  async actualizarPais(pais: Pais): Promise<void> {
    if (!pais.id) throw new Error('ID de país no proporcionado');
    const paisRef = doc(this.firestore, 'paises', pais.id);
    await updateDoc(paisRef, { ...pais });
  }

  async eliminarPais(id: string): Promise<void> {
    const paisRef = doc(this.firestore, 'paises', id);
    await deleteDoc(paisRef);
  }

  // ... (código anterior se mantiene igual)

async agregarIdiomaAPais(paisId: string, idiomaId: string): Promise<void> {
  const paisRef = doc(this.firestore, 'paises', paisId);
  await updateDoc(paisRef, {
    idiomas: arrayUnion(idiomaId)
  });
}

async removerIdiomaDePais(paisId: string, idiomaId: string): Promise<void> {
  const paisRef = doc(this.firestore, 'paises', paisId);
  await updateDoc(paisRef, {
    idiomas: arrayRemove(idiomaId)
  });
}
}