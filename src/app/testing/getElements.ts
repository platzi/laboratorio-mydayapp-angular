import { ComponentFixture } from "@angular/core/testing"
import { By } from "@angular/platform-browser"

export const getById = <T>(fixture: ComponentFixture<T>, elementId: string) => {
  return fixture.debugElement.query(By.css(`[data-testid="${elementId}"]`));
}

export const getAllById = <T>(fixture: ComponentFixture<T>, elementsId: string) => {
  return fixture.debugElement.queryAll(By.css(`[data-testid="${elementsId}"]`));
}
