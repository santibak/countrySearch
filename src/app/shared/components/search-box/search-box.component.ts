import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value =>{
      this.onDebounce.emit( value )
    } );
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe;
  }

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  emitSearch(searchTerm: string): void{
    if( !searchTerm ) return;
    this.onValue.emit( searchTerm );
  }

    onKeyPress(searchTerm: string): void{
      this.debouncer.next( searchTerm);

    }
}
