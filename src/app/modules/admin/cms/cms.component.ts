import { Component, Input } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { CertificationComponent } from './certification/certification.component';
import { CommunityComponent } from './community/community.component';
import { ContactComponent } from './contact/contact.component';
import { EventsComponent } from './events/events.component';
import { FaqComponent } from './faq/faq.component';
import { JobsComponent } from './jobs/jobs.component';
import { PartnersComponent } from '../partners/partners.component';

@Component({
  selector: 'app-cms',
  standalone: true,
  imports: [TabsComponent, AboutComponent, BlogComponent, CertificationComponent, CommunityComponent, ContactComponent, EventsComponent, FaqComponent, JobsComponent, PartnersComponent],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export class CmsComponent {

    title: string = 'Content Management System'

    TabPages: string[] = ["About", "Blog", "Certification", "Community", "Contact", "Events", "FAQ", "Jobs", "Partners"]
    page: number = 0

    @Input() fieldId: string = 'search-merchant'

    setPage(page: any)
    {
       this.page = page
    }

}
