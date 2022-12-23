import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contacts } from 'src/app/models/contacts';
import { StoriesVM } from 'src/app/models/stories';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ArticleService } from 'src/app/services/article.service';
import { ContactService } from 'src/app/services/contact.service';
import { CategoryService } from 'src/app/services/menu.service';
import { StoryService } from 'src/app/services/Story.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { CustomvalidationService } from 'src/app/shared/customvalidation.service';
import { ArticleVM } from 'src/app/ViewModels/articleVM';
import { SubCategory } from 'src/app/ViewModels/subcategory';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  slideIndex = 1;
  thatisAll=false;
  articles: Array<ArticleVM> = [];
  ImageUrl = environment.ImageUrl;
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  popularArt: Array<ArticleVM> = [];
  stories: Array<StoriesVM> = [];

  articleSub: Subscription;
  subCategorieSub: Subscription;
  PopularTagSub: Subscription;
  popularArtSub: Subscription;
  storySub: Subscription;

  contactForm: FormGroup;
  submitted = false;
  contact = new Contacts();
  constructor(private articleService: ArticleService, private contactService: ContactService,
    private subCategory: SubcategoryService, private storyService: StoryService, private alertify: AlertifyService,
    private router:Router,private fb: FormBuilder,
    private customValidator: CustomvalidationService) {
      this.contactForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        message: ['', [Validators.required]]
    });
  }

  get contactFormControl() {
    return this.contactForm.controls;
  }

  ngOnInit(): void {

    this.articleSub = this.articleService.getVisibleBasicsArticles(6).subscribe((data: any[]) => {
      console.log(data);
      this.articles = data;
    });

    this.subCategorieSub = this.subCategory.getRandomVisibleSubCategory(5).subscribe((result: SubCategory[]) => {
      this.subCategories = result
    })

    this.storySub = this.storyService.bindVisibleStory().subscribe((result: StoriesVM[]) => {
      this.stories = result
    })

    this.PopularTagSub = this.subCategory.getRandomVisibleSubCategory(10).subscribe((result: SubCategory[]) => {
      this.PopularTags = result
    });
    this.popularArtSub = this.articleService
      .getTopPopularArticles(5)
      .subscribe((data: any[]) => {
        this.popularArt = data;
      });
  }

  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
    this.subCategorieSub.unsubscribe();
    this.PopularTagSub.unsubscribe();
    this.popularArtSub.unsubscribe();
    this.storySub.unsubscribe();
  }

  addContacts(){
    this.submitted = true;
    if (this.contactForm.valid) {
    this.contact.name=this.contactForm.get('name').value;
    this.contact.email=this.contactForm.get('email').value;
    this.contact.message=this.contactForm.get('message').value;

    this.contactService.addContacts(this.contact).subscribe(data => {
      this.alertify.success("Request has been sent successfully");
      this.contactForm.reset();
      this.submitted = false;
    })
  }
  }

}
