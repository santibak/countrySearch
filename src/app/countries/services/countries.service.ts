import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public catchStore: CacheStore  = {
    byCapital: {term: '', countries: [] },
    byRegion: {region: '', countries: [] },
    byCountries: {term: '', countries: [] },
  }

  constructor(private http: HttpClient) { }

  searchCountryById(code: string): Observable<Country | null>{

    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    );
  }

  getCountryRequest(url: string): Observable<Country[]>{

    return this.http.get<Country[]>( url )
    .pipe(
      catchError(() => of([]))
    );
  }

  searchCapital(term: string): Observable<Country[]>{

    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountryRequest(url)
    .pipe(
      tap(countries => this.catchStore.byCapital = {term, countries})
    );
      // tap(countries => console.log('Paso por el tab', countries)),
      // map( countries => []),
      // tap(countries => console.log('Paso por el tab', countries))
  }

  searchRegion(region: Region): Observable<Country[]>{

    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountryRequest(url)
    .pipe(
      tap(countries => this.catchStore.byRegion = {region, countries})
    );
  }

  searchCountry(term: string): Observable<Country[]>{

    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountryRequest(url)
    .pipe(
      tap(countries => this.catchStore.byCountries = {term, countries})
    );
  }
}
