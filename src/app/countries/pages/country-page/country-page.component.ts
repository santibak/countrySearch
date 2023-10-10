import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;
  public prueba: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountriesService,
    private router: Router ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countryService.searchCountryById( id ))
    )
    .subscribe( country => {
      if( !country ){
        return this.router.navigateByUrl('');
      }
      console.log(country);
      Object.keys(country.translations).forEach(element =>
        this.prueba.push(country.translations[element].common));
        console.log('Prueba: ', this.prueba);
      return this.country = country;
      }
    )}
  }
