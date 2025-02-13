import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPackSchema } from '../../components/pack/model/AddPackSchema';
import { PackResponseSchema } from '../../components/pack/model/PackResponseSchema';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackServiceService {

  private packsSubject = new BehaviorSubject<PackResponseSchema[]>([]);
  public packs$ = this.packsSubject.asObservable();
  packs: PackResponseSchema[] = [];
  constructor(private http: HttpClient) { }

  private readonly packUrl: string = 'http://localhost:8081/api/v1/pack'

  fetchPacks() {
    this.http.get<PackResponseSchema[]>(this.packUrl).subscribe((response) => {
      this.packsSubject.next(response);
    })
  }
  getPacks(): Observable<PackResponseSchema[]> {
    return this.packs$;
  }

  savePack(pack: AddPackSchema): Observable<PackResponseSchema> {
    return this.http.post<PackResponseSchema>(this.packUrl, pack);
  }
  loadPacks() {
    this.fetchPacks();
    this.getPacks().subscribe((response: PackResponseSchema[]) => {
      this.packs = response;
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching packs:', error);
    })
  }

  deletePacks(packId: number): Observable<void> {
    console.log(typeof (packId));
    return this.http.delete<void>(`${this.packUrl}/${packId}`);
  }

  updatePack(pack: AddPackSchema, id: number): Observable<PackResponseSchema> {
    return this.http.put<PackResponseSchema>(`${this.packUrl}/${id}`, pack);
  }
}
