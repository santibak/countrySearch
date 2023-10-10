import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(
    private countryService: CountriesService ){ }

    ngOnInit(): void {
      this.countries = this.countryService.catchStore.byCountries.countries;
      this.initialValue = this.countryService.catchStore.byCountries.term;
    }

  searchByCountry(term: string): void{
    this.isLoading = true;
    this.countryService.searchCountry(term)
      .subscribe( countries => {
        this.countries = countries
        this.isLoading = false;
      });
  }

}
