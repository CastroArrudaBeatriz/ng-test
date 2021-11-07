import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { cpuUsage } from "process";
import { UniqueIdService } from "../../services/unique-id/unique-id.service";
import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from "./like-widget.module";

describe(LikeWidgetComponent.name , () => {
    
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;

    beforeEach( async () => {

        await TestBed.configureTestingModule({
            imports: [LikeWidgetModule]
        }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    })

    it('Should auto-generate ID during ngOnInit when (@Input id) is missing', () => {
        fixture.detectChanges()
        expect(component.id).toBeTruthy()
    })

    it('Should not generate id when id property is present', () => {
        component.id = 'myId'
        fixture.detectChanges()
        expect(component.id).toBe('myId')
    })

    it(`${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when is callled`, done => {
       fixture.detectChanges();
       component.liked.subscribe(() => {
        expect(true).toBeTrue();
        done()
       });
       component.like();     
    })

    it(`${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) emit when is called`, () => {
        spyOn(component.liked, 'emit');
        fixture.detectChanges();
        component.like()
        expect(component.liked.emit).toHaveBeenCalled();
    })

    it(`${LikeWidgetComponent.prototype.like.name} should not to have trigger on emit event`, () => {
        spyOn(component.liked, 'emit');
        fixture.detectChanges();
        expect(component.liked.emit).not.toHaveBeenCalled();
    })
});