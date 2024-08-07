import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterGuardService } from '../services/router-guard.service';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageArticleComponent } from './manage-article/manage-article.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      component: DashboardComponent,
      canActivate: [RouterGuardService],
      data: {
        expectedRole: ['admin', 'user']
      }
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [RouterGuardService],
      data: {
        expectedRole: ['admin', 'user']
      }
    },
    {
      path: 'users',
      component: ManageUsersComponent,
      canActivate: [RouterGuardService],
      data: {
        expectedRole: ['admin']
      }
    },
    {
      path: 'category',
      component: ManageCategoryComponent,
      canActivate: [RouterGuardService],
      data: {
        expectedRole: ['admin', 'user']
      }
    },
    {
      path: 'article',
      component: ManageArticleComponent,
      canActivate: [RouterGuardService],
      data: {
        expectedRole: ['admin', 'user']
      }
    },
    {
      path: 'help',
      component: HelpDetailsComponent,
      canActivate: [RouterGuardService],
      data: {
        expectedRole: ['admin', 'user']
      }
    },
    {
      path: '**',
      component: DashboardComponent,
      canActivate: [RouterGuardService],
      data: {
        expectedRole: ['admin', 'user']
      }
    }


  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
