import { Injectable } from '@angular/core';
import {Cv} from "../Model/Cv";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private Fakecvs: Cv[] = [
    new Cv(1, "Oueslati", "Safa", "Software Engineer","   "),
    new Cv(2, "Oueslati", "Douaa","Graphic Designer", "rotating_card_profile.png"),
    new Cv(3, "Amine", "Ahmed","DevOps Engineer", "as.png"),
  ];
  private link = "https://apilb.tridevs.net/api/personnes\n"

  constructor(private http : HttpClient) {}

   getCvs() : Observable<Cv[]>{
     return this.http.get<Cv[]>(this.link);
  }

  getFakeCvs(){
    return this.Fakecvs;
  }

  getCvById(id: number) {
    return this.http.get<Cv>(this.link + `/${id}`);
  }

  deleteCv(id: number) {
    return this.http.delete(this.link + `/${id}`)
  }
}
