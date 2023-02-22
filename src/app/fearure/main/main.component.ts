import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare var $: any;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('accordion', {static: true}) accordion: ElementRef;
  readonly observable: Observable<string>;
  private subscription: Subscription | null = null;


  @ViewChild('content')
  content!: TemplateRef<ElementRef>;
  modalOpen: boolean = false;


  constructor(private router: Router, private elRef: ElementRef, private modalService:NgbModal ) {
    this.accordion = elRef;

    this.observable = new Observable(observer => {
      const interval = setInterval(() => {
        observer.next();
        observer.complete();
      }, 10000);
      return {
        unsubscribe() {
          clearInterval(interval);
        }
      }
    });
  }

  ngOnInit() {
    $(this.accordion.nativeElement).accordion({
      heightStyle: 'content'
    });

    if (this.observable) {
      this.subscription = this.observable.subscribe(() => {
        this.modalOpen = true;
      })
    }
  }

  ngAfterViewInit() {
    this.modalService.open(this.content, {});
  }

  navigateToCatalog() {
    this.modalService.dismissAll();
    this.router.navigate(['/catalog']);
    this.modalOpen = false;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
