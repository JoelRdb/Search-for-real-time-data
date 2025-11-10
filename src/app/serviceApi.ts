import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Product } from "./Models/product";

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5NkJGQzg0MTBDNTZERUVBMDQxNDE0QjUwQTczNkQ3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkLWxvY2FsLmVzaG9wcGluZy5jb206NDQzNDQiLCJuYmYiOjE3NjA2OTcxMDcsImlhdCI6MTc2MDY5NzEwNywiZXhwIjoxNzYwNzAwNzA3LCJhdWQiOlsiQmFza2V0IiwiZWNvbW1lcmNlQW5ndWxhciIsIkVDb21tZXJjZUdhdGV3YXkiLCJodHRwczovL2lkLWxvY2FsLmVzaG9wcGluZy5jb206NDQzNDQvcmVzb3VyY2VzIl0sInNjb3BlIjpbImJhc2tldGFwaSIsImVjb21tZXJjZWdhdGV3YXkiXSwiY2xpZW50X2lkIjoiRUNvbW1lcmNlR2F0ZXdheUNsaWVudCIsImp0aSI6IkMzNkM0RTlBNDZBNTJEM0IxMjNDNDQxNDFFMDZFQUVEIn0.UWg3BXl6ltGzAuyHNPDo5kkVK6hdJTZBQcYQEIPdHUvBcuwNeCuZWqJ7vN3suNQNFwaqvSWC4AJ7k_7bDdlxAYgbdOntxsFEGHynUkCmypGzc__687Vyw9oRrAqbTPERJmOP89x0JF9dWqA1a27ub_iC1Syg8MACVb-JhaqfUux7ZJVjNUQCBs1l32o-xD0WoMexsKsnmEK8yuLa8LibKd7hsU0JaoC7MsytNaIkKppp88T_wkJrRrR1xIP9VRgH9W1vZJXGCrBwdN8BSZ93Jxc-ARfcJGSScUmVdo7k_UIX8ZGcA-sv5qjvnWiS9zRATEGDSLhFAUMpIG_tQZcZdQ';
const headers = new HttpHeaders({
    'Authorization' : `Bearer ${token}` // Backtick 
});


@Injectable({
    providedIn: 'root'
})
export class ServiceApi {
    constructor(private serviceHttp: HttpClient) {

    }

    getAllProducts() : Observable<Product[]>{
       return this.serviceHttp.get<any>("https://id-local.eshopping.com:44344/Catalog/GetAllProducts", {headers})
            .pipe(
                tap(response => console.log(response)),
                map(response => response.data) // on utilise data car le backend qui fournit nos données ne nous renvoie pas directement un tableau de données mais un objet qui contient le tableau de données
            );
    }
}