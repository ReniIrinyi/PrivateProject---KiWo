import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLinksComponent } from './share-links.component';

describe('ShareLinksComponent', () => {
  let component: ShareLinksComponent;
  let fixture: ComponentFixture<ShareLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareLinksComponent]
    });
    fixture = TestBed.createComponent(ShareLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
