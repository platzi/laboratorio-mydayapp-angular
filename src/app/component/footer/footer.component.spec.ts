import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotasService } from 'src/app/service/notas.service';
import {of} from 'rxjs';
import { FooterComponent } from './footer.component';
import { Nota } from 'src/app/models/nota.model';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ejecute deleteChores', () => {
    component.deleteChores();
  });

  it('should ejecute loadContadorItem', () => {
    component.loadData.loadContadorItem.emit();
  });





});
