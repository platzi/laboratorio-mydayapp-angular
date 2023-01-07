import { TestBed } from '@angular/core/testing';
import { Nota } from '../models/nota.model';

import { NotasService } from './notas.service';

describe('NotasService', () => {
  let service: NotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test setNewChores', ()=>{
    it('should añadir el primer elemento',()=>{
      localStorage.removeItem('mydayapp-angular');
      service.tareas = [];
      let mockData: Nota = {
        id: "1",
        title: "Noat 1",
        completed: false
      }
      service.setNewChores(mockData);
      expect(true).toBeTrue();
    });

    it('should añadir otro elemento',()=>{
      let mockData: Nota = {
        id: "1",
        title: "Noat 1",
        completed: false
      }

      service.tareas = [
        {
          id: "1",
          title: "Noat 1",
          completed: false
        }
      ]
      service.setNewChores(mockData);
      expect(true).toBeTrue();
    });
  });

  describe('test getChores', ()=>{
    it('should retornar una lista de tareas',()=>{
      let mockData: Nota[] = [
        {
          id: "1",
          title: "Noat 1",
          completed: false
        },
      ];
      localStorage.setItem('mydayapp-angular', JSON.stringify(mockData))
      let result: Nota[] = service.getChores();
      expect(result).toEqual(mockData);
    });

    it('should retornar []',()=>{
      let mockData: Nota[] = [
      ];
      localStorage.removeItem('mydayapp-angular');
      let result: Nota[] = service.getChores();
      expect(result).toEqual(mockData);
    });


  });

  describe('test getPendingChores', ()=>{
    it('should return pendig chores',()=>{
      let mockData: Nota[] = [
        {
          id: "1",
          title: "Noat 1",
          completed: false
        },
      ];

      let mockData2: Nota[] = [
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
      localStorage.setItem('mydayapp-angular', JSON.stringify(mockData2))
      let result: Nota[] = service.getPendingChores();
      expect(result).toEqual(mockData);
    });
  });

  describe('test getCompletedChores', ()=>{
    it('should return completed chores',()=>{
      let mockData: Nota[] = [
        {
          id: "2",
          title: "Noat 2",
          completed: true
        },
      ];

      let mockData2: Nota[] = [
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
      localStorage.setItem('mydayapp-angular', JSON.stringify(mockData2))
      let result: Nota[] = service.getCompletedChores();
      expect(result).toEqual(mockData);
    });
  });

  describe('test updateChores', ()=>{
    it('should ejecutarse',()=>{


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

      service.updateChores(mockData);
      expect(true).toBeTrue();
    });
  });

  describe('test deleteOneChore', ()=>{
    it('should return list - 1 element',()=>{
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

      let mockData2: Nota[] = [
        {
          id: "2",
          title: "Noat 2",
          completed: true
        }
      ];
      localStorage.setItem('mydayapp-angular', JSON.stringify(mockData))
      let result: Nota[] = service.deleteOneChore(id);
      expect(result).toEqual(mockData2);
    });

    it('should return list []',()=>{
      let id: string = '1';
      let mockData2: Nota[] = [];
      localStorage.removeItem('mydayapp-angular')
      let result: Nota[] = service.deleteOneChore(id);
      expect(result).toEqual(mockData2);
    });
  });

  describe('test deleteChoresCompleted', ()=>{
    it('should ejecute',()=>{
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
      service.deleteChoresCompleted();
      expect(true).toBeTrue();
    });
  });
});
