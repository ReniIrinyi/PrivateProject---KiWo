import { Component } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-share-links',
    templateUrl: './share-links.component.html',
    styleUrls: ['./share-links.component.scss'],
    standalone: false
})
export class ShareLinksComponent {
  faAt = faAt;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
}
