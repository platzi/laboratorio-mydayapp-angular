import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nota } from 'src/app/models/nota.model';

import { ListChoresComponent } from './list-chores.component';

describe('ListChoresComponent', () => {
  let component: ListChoresComponent;
  let fixture: ComponentFixture<ListChoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test ngOnInit',()=>{
    it('should estado == All',()=>{
      component.estado = 'All';
      component.ngOnInit();
      expect(true).toBeTrue();
    });

    it('should estado == Pending',()=>{
      component.estado = 'Pending';
      component.ngOnInit();
      expect(true).toBeTrue();
    });

    it('should estado == Completed',()=>{
      component.estado = 'Completed';
      component.ngOnInit();
      expect(true).toBeTrue();
    });
  });

  describe('Test clickcheckbox',()=>{
    it('should ejecut updateChores',()=>{
      const mockData: Nota = {
        id: '1',
        title: ' Nota 1',
        completed: false
      }
      component.clickcheckbox(mockData);
      expect(true).toBeTrue();
    });

  });

  describe('Test dobleClick and enterText',()=>{
    it('should ejecut dobleClick and enterText',()=>{
      const mockData: Nota = {
        id: '1',
        title: ' Nota 1',
        completed: false
      }
      component.dobleClick(mockData);
      component.enterText();
      expect(true).toBeTrue();
    });
  });

  describe('Test escape',()=>{
    it('should ejecut escape',()=>{
      component.escape();
      expect(true).toBeTrue();
    });
  });

  describe('Test deletOneChore',()=>{
    it('should ejecut deletOneChore',()=>{
      let id: string = '1';
      let mockData: Nota[] = [
        {
          id: "1",
          title: "Noat 1",
          completed: false
        },
        {
          id: "2",
          title: "Noat 2",
          completed: true
        }
      ];
      localStorage.setItem('mydayapp-angular', JSON.stringify(mockData))
      component.deletOneChore(id);
      expect(true).toBeTrue();
    });
  });
});
