import React from 'react';
import { AboutPageAsync } from './pages/AboutPage.async';
import { DashboardPageAsync } from './pages/DashboardPage/DashboardPage.async';
import { EditPageUniversityAsync } from './pages/EditPageUniversity/EditPageUniversity.async';
import { MainPageAsync } from './pages/MainPage.async';
import { ProjectsPageAsync } from './pages/ProjectsPage.async';
import { SevicesPageAsync } from './pages/SevicesPage.async';

export enum PathRouting {
  ABOUT_ROUTER = '/about',
  DASHBOARD_ROUTER = '/dashboard',
  HOME_ROUTER = '/home',
  PROJECTS_ROUTER = '/projects',
  SEVICES_ROUTER = '/sevices',
  EDIT_PAGE_UNIVERSITY = '/edituniversity',
}

interface Rout {
  path: PathRouting;
  Component: React.FC;
  title?: string;
}

export const publicRoutes: Rout[] = [
  { path: PathRouting.HOME_ROUTER, Component: MainPageAsync, title: 'Home' },
  { path: PathRouting.ABOUT_ROUTER, Component: AboutPageAsync, title: 'About' },
];

export const privateRoutes: Rout[] = [
  { path: PathRouting.HOME_ROUTER, Component: MainPageAsync, title: 'Home' },
  { path: PathRouting.ABOUT_ROUTER, Component: AboutPageAsync, title: 'About' },
  { path: PathRouting.SEVICES_ROUTER, Component: SevicesPageAsync, title: 'Sevices' },
  { path: PathRouting.PROJECTS_ROUTER, Component: ProjectsPageAsync, title: 'Projects' },
  { path: PathRouting.DASHBOARD_ROUTER, Component: DashboardPageAsync, title: 'Dashboard' },
  { path: PathRouting.EDIT_PAGE_UNIVERSITY, Component: EditPageUniversityAsync },
];
